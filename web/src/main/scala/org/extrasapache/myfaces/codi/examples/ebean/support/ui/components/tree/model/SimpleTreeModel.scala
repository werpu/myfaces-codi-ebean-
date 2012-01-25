package org.extrasapache.myfaces.codi.examples.ebean.support.ui.components.tree.model

import collection.mutable.HashMap
import reflect.BeanProperty

/**
 *
 * @author Werner Punz (latest modification by $Author$)
 * @version $Revision$ $Date$
 */
@serializable
class SimpleTreeModel[T<:AnyRef] extends TreeModel[T] {

    private val _itemIdx = new HashMap[String, TreeItem[T]]
    protected var rootNode: TreeItem[T] = _


    def addNode(parent: TreeItem[T], theLabel: String, theDescription: String, theValue: T) {
            val ret = parent.append(theLabel, theDescription, theValue)
            _itemIdx.put(theLabel, ret);
    }

    def updateIdx(node: TreeItem[T]) {
        _itemIdx.put(node.getLabel(), node)
    }
    
    def setRootNode(rootNode: TreeItem[T]) {
        updateIdx(rootNode)
        this.rootNode = rootNode
    }

    def getRootNode(): TreeItem[T] = rootNode
    def getNodeLevel(label: String): TreeItem[T] = _itemIdx.get(label).get

}