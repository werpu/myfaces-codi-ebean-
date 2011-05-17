myfaces._impl.core._Runtime.singletonExtendClass("myfaces._impl._dom._DomEngineCompliant", myfaces._impl._dom._DomEngine, {
    outerHTML: function(item, markup) {
        var evalNodes;
        //table element replacements like thead, tbody etc... have to be treated differently
        if (this._isTableElement(item)) {
            evalNodes = this._buildTableNodes(item, markup);
        } else {
            evalNodes = this._buildNodesCompliant(markup);
        }
        var evalNodeLen = evalNodes.length;

        if (evalNodeLen == 1) {
            var ret = evalNodes[0];
            item.parentNode.replaceChild(ret, item);
            return ret;
        } else {
            return this.replaceElements(item, evalNodes);
        }
    },

    setAttribute : function(node, attr, val) {
        node.setAttribute(attr, val);
    },

    getAttribute : function(node, attr) {
        return node[attr];
    },


    _removeNode: function(elem, breakEventsOpen) {
        this.detach(elem);
    },

    /**
     * for performance reasons we work with replaceElement and replaceElements here
     * after measuring performance it has shown that passing down an array instead
     * of a single node makes replaceElement twice as slow, however
     * a single node case is the 95% case
     *
     * @param item
     * @param evalNodes
     */
    replaceElement: function(item, evalNode) {
        item.parentNode.replaceChild(evalNode, item);
    },




    /**
     * non ie browsers do not have problems with embedded scripts or any other construct
     * we simply can use an innerHTML in a placeholder
     *
     * @param markup the markup to be used
     */
    _buildNodesCompliant: function(markup) {
        var dummyPlaceHolder = this.getDummyPlaceHolder(); //document.createElement("div");
        dummyPlaceHolder.innerHTML = markup;
        return this._Lang.objToArray(dummyPlaceHolder.childNodes);
    },


    _removeNode: function(node, breakEventsOpen) {
        if (!node) return;
        if ('undefined' != typeof node.parentNode && null != node.parentNode) //if the node has a parent
            node.parentNode.removeChild(node);
    },

    innerHTML: function(node, markup) {
        if (!node) return;
        node.innerHTML = markup;
    }


});
