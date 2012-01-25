package org.extrasapache.myfaces.codi.examples.ebean.support.ui.components.tree.model

import collection.mutable.HashMap

/**
 *
 * @author Werner Punz (latest modification by $Author$)
 * @version $Revision$ $Date$
 */

class SimpleTreeModel extends TreeModel[AnyRef] {

    val _itemIdx = new HashMap[String, TreeItem[AnyRef]]

    def addNode(parent: TreeItem[AnyRef], theLabel: String, theDescription: String, theValue: String ) {
        val ret = parent.append(theLabel, theDescription, theValue).asInstanceOf[TreeItem[AnyRef]];
        _itemIdx.put(theLabel, ret);
    }

    def getNodeLevel(label: String): TreeItem[AnyRef] = {
        _itemIdx.get(label).get
    }
}