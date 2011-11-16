package org.extrasapache.myfaces.codi.examples.ebean.support.ui.components.tree.model

import java.util._
import javax.faces.model.SelectItem

/**
 *
 * @author Werner Punz (latest modification by $Author$)
 * @version $Revision$ $Date$
 */

class TreeItem extends SelectItem
{
  val childs = new ItemColl[TreeItem]()

  val identifier: String = _
  val value: AnyRef = _
  def hasChilds: Boolean = childs.hashChilds()
  def getChild(identifier: String) : TreeItem = childs.get(identifier)
}