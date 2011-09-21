package org.extrasapache.myfaces.codi.examples.ebean.support.ui.components.tree

import collection.immutable.HashMap
import collection.immutable.ListSet
import javax.faces.model.SelectItem
import java.util.Collection

/**
 *
 * @author Werner Punz (latest modification by $Author$)
 * @version $Revision$ $Date$
 */

class SimpleTreeModel extends TreeModel {

  class SimpleTreeModelItem {
    var  item:SimpleTreeItem = _
    var childs: ListSet[SimpleTreeModelItem] = new ListSet[SimpleTreeModelItem]()

  }

  //we use an immutable collection because we can rely on the tree model being
  //used mainly for reading
  var treeIdx: Map[String, SelectItem] = new HashMap[String, SelectItem]


  def getChilds(ident: String): Collection[TreeItem] = null

  def getNodeValue(ident: String): TreeItem = null

  def getRootNode: TreeItem = null
}