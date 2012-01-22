package org.extrasapache.myfaces.codi.examples.ebean.support.ui.components.tree.model

import javax.faces.model.SelectItem
import java.util.LinkedList

/**                                                    TreeItem[S] = _
 *
 * @author Werner Punz (latest modification by $Author$)
 * @version $Revision$ $Date$
 *
 * usage
 *
 * val treeModel = ModelBuilder.instance[MySelectItem]
 * .start(rootNode)
 * .appendChild(node00)
 * .appendChild(node01)
 * .down(node11)    //goes one level down with the initial node in that level
 * .appendChild(node12)
 * .up()            //one level up the last appended node is picked up in that level
 * .appendChild(node02)
 * .makeFinal()     //returns the final model representation
 *
 */

object ModelBuilder {
    def instance[T <: SelectItem]: ModelBuilder[T] = {
        new ModelBuilder[T]()
    }
}

class ModelBuilder[S <: SelectItem] {
    var root:  TreeItem[S] = _
    var currentTree: TreeItem[S] = _
    var currentPos: TreeItem[S] = _
    var lastAppended: TreeItem[S] = _
    var posStack: LinkedList[TreeItem[S]] = _

    def start(item: S): ModelBuilder[S] = {
        currentTree = new TreeItem[S]()
        root = currentTree
        currentTree.setValue(item)
        currentPos = currentTree
        lastAppended = currentPos;
        this
    }

    def appendChild(item: S): ModelBuilder[S] = {
        val treeItem = new TreeItem[S]();
        treeItem.setValue(item)
        currentPos.getChilds().set(treeItem)
        lastAppended = treeItem;
        this
    }

    def down(item: S): ModelBuilder[S] = {
        posStack.push(lastAppended)
        val treeItem = new TreeItem[S]();
        treeItem.setValue(item)
        lastAppended.getChilds().set(treeItem)
        lastAppended = treeItem
        currentPos = lastAppended;
        this
    }

    def up(): ModelBuilder[S] = {
        if (posStack.size() > 0) {
            currentPos = posStack.pop()
        }
        this;
    }

    def makeFinal(): TreeItem[S] = root

}