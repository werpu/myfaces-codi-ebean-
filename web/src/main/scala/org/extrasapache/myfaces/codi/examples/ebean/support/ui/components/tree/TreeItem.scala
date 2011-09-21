package org.extrasapache.myfaces.codi.examples.ebean.support.ui.components.tree

import java.util.Collection
import reflect.BeanProperty
import java.io.Serializable
import javax.faces.model.SelectItem

/**
 *
 * @author Werner Punz (latest modification by $Author$)
 * @version $Revision$ $Date$
 *
 * a treeitem interface resembling a single entry for the tree
 */
@serializable
trait TreeItem
{
  def getItem() : AnyRef

  /**
   * every item must be identifyable by an identifier
   */
  def getIdentifier() : String
  def isChilds(): Boolean
}