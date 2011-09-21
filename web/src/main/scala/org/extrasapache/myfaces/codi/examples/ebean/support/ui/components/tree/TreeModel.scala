package org.extrasapache.myfaces.codi.examples.ebean.support.ui.components.tree

import java.util.Collection
/**
 *
 * @author Werner Punz (latest modification by $Author$)
 * @version $Revision$ $Date$
 *
 * A TreeModel interface which defines the contract
 * for the control
 */

trait TreeModel
{
  def getChilds(ident: String): Collection[TreeItem]
  def getNodeValue(ident:String): TreeItem
  def getRootNode: TreeItem
}