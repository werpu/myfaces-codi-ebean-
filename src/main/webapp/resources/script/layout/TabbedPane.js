(function () {
    /**
     * A tabbed pane which hosts a set of content panes underneath
     *
     * The trick is that every tab has the target information present
     * if the target is not ready we ajax it in otherwise
     * we just change the styles the classical way
     */
    var _RT = myfaces._impl.core._Runtime;

    _RT.extendClass("extras.apache.ContentPane", extras.apache.ComponentBase, {


        constructor_: function(args) {
            this._callSuper("constructor_", args);
            this._onTabSelect = this._Lang.hitch(this._onTabSelect);
            this._onTabChangeRequestDone = this._Lang.hitch(this._onTabChangeRequestDone);
        },

        _postInit: function() {
            this._callSuper("_postInit", arguments);
            //this._tabContentNodes = this.rootNode.querySelectorAll("");
            this._valueHolder = this.rootNode.querySelector("tabValueHolder");
        },

        _initializeTabSelectors: function() {
            this._tabs = this.rootNode.querySelectorAll(".tabs .tab");

            this._tabs.forEach(this._Lang.hitch(this, function(elem) {
                //tab switching
                elem.addEventListener("click", this._onTabSelect(), false);
            }));
        },

        _onTabSelect: function(evt) {
            var target = new myfaces._impl._dom.Node(evt.target);
            while (!target.hasClass("tab"))
                target = target.parentNode;

            this._forTargetPane = target.getAttribute("data-mf-for");
            var target = this.rootNode.querySelector("#" + this._forTargetPane);
            if (!target) {
                jsf.ajax.request(this.rootNode, evt, {
                    execute:"@this",
                    render:this.rootNode.querySelector("tabbedPaneContent").id,
                    mf_tabswitch:true,
                    onevent: this._onTabChangeRequestDone
                });
            } else {
                this._activateTab(target);
                this._activateContent(target);
            }
        },
        /**
         * activates the tab alone all subsequent panels wont be activated
         *
         * @param target
         */
        _activateTab: function(target) {
            this.rootNode.querySelectorAll(".tabs .tab").removeClass("active");
            target.addClass("active");
        },
        _activateContent: function(target) {
            this.rootNode.querySelectorAll(".tabbedPaneContent > [data-mf-contentPane = true]").addClass("hidden");
            target.removeClass("hidden");
            target.addClass("active");
            this._valueHolder.value = target.id;
        },

        _onTabChangeRequestDone: function(evt) {
            if (evt.status == "complete") {
                if (!this._forTargetPane) return;
                var newActiveTab = this.rootNode.querySelector("li[data-mf-for=\"" + this._forTargetPane + "\"]");
                this._activateTab(newActiveTab);
                this._activateContent(this.rootNode.querySelector("#" + this._forTargetPane));

            }
        }
    })
})();