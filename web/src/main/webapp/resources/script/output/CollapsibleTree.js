(function () {
    /**
     * a pull component which pulls
     * a certain area periodically
     */
    var _RT = myfaces._impl.core._Runtime;
    var _Lang = myfaces._impl._util._Lang;
    var _AjaxQueue = extras.apache.ExtendedEventQueue;

    _RT.extendClass("extras.apache.CollapsibleTree", extras.apache.ComponentBase, {
        _Node: myfaces._impl._dom.Node,
        _expandedChilds: null,
        //temporary context for holding the event origin for a collapse expand event
        _origin: null,


        constructor_:function(args) {
            this._callSuper("constructor", args);
            this.expandCollapseHandler = _Lang.hitch(this, this.expandCollapseHandler);
            var expandedStr = args.expanded || "{}";
            this._expandedChilds = JSON.parse(expandedStr);
        },
        _postInit: function(args) {
            this._callSuper("_postInit", args);
            /*all tree elements which have subnodes will get their expand collapse listener*/
            this.rootNode.querySelectorAll("[data-mf-hassubnodes]").addEventListener("click", this.expandCollapseHandler);
            this._valueHolder = this.rootNode.querySelector(".valueHolder");
            for(var key in this._expandedChilds) {
                var node = this.rootNode.querySelector("#"+key);
                if(!node) continue;
                this.expand(node.parentNode, node);
            }
        },

        /**
         * Expands and/or collapses the current tree
         *
         * @param evt
         */
        expandCollapseHandler: function(evt) {
            this._origin = new this._Node(evt.target);
            while (this._origin.tagName.toLowerCase() != "li") {
                this._origin = this._origin.parentNode;
            }

            //check for a dynamic attribute which marks the node
            //as has remote childs
            if (this._expandedChilds[this._origin.id]) {
                //issue the ajax request
            } else {
                this._expandCollapse(this._origin);
            }
            evt.stopPropagation();
            evt.stopImmediatePropagation();
        },

        _expandCollapse: function(rootNode) {
            this._origin = null;
            var collapsePane = this._Node.querySelector(["#" , rootNode.id.replace(/\:/g, "\\:") , " > " , "ol"].join(""));
            if (!collapsePane) return;
            if (collapsePane.offsetHeight == 0) {
                this._expand(rootNode, collapsePane);
            } else {
                this._collapse(rootNode, collapsePane);
            }
        },

        _expand: function(rootNode, collapsePane) {
            var CLS_EXPANDED = "expanded";
            var finalHeight = this._Node.querySelectorAll(["#" , collapsePane.id.replace(/\:/g, "\\:") , " > li"].join("")).offsetHeight;
            var transitionEnd = function() {
                collapsePane.style({height: "auto"});
                collapsePane.removeEventListener("transitionend", transitionEnd);
            }

            collapsePane.addEventListener("transitionend", transitionEnd);
            collapsePane.style({height: finalHeight + "px"});
            collapsePane.addClass(CLS_EXPANDED);
            rootNode.addClass(CLS_EXPANDED);
            this._expandedChilds[collapsePane.id] = true;
            this.valueHolder.value = JSON.stringify(this._expandedChilds);

        },

        _collapse: function(rootNode, collapsePane) {
            var CLS_EXPANDED = "expanded";
            //we remove the auto so that our animation can trigger
            var transitionEnd = function() {
                collapsePane.removeEventListener("transitionend", transitionEnd);
            }
            collapsePane.addEventListener("transitionend", transitionEnd);
            collapsePane.style({height: (collapsePane.offsetHeight + "px") });
            collapsePane.style({height: "0px"});
            collapsePane.removeClass(CLS_EXPANDED);
            rootNode.removeClass(CLS_EXPANDED);
            delete this._expandedChilds[collapsePane.id];
            this.valueHolder.value = JSON.stringify(this._expandedChilds);
        },

        //TODO we only update the contents we need to update
        //which means, we generate from the data a dummy element in ram
        //then strip out the node we need to update within the tree
        //and then replace the original code with the stripped one and let jsf
        //handle the rest
        //primefaces seems to do this server side, by reducing the needed data
        //to display the needs, this is also a viable option, we might investigate into that one
        //but this would mean to introduce a new partial response writer which I try to avoid here
        //I guess we can live with a little bit more server traffic, and by not introducing
        //a construct which might collide with other component libs
        _onUpdate: function(args) {
            delete this._expandedChilds[this._origin.id];

        }


    })
})();