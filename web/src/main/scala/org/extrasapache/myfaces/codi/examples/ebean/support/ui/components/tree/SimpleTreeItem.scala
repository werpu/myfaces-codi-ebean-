package org.extrasapache.myfaces.codi.examples.ebean.support.ui.components.tree

import reflect.BeanProperty

/**
 *
 * @author Werner Punz (latest modification by $Author$)
 * @version $Revision$ $Date$
 */

class SimpleTreeItem extends TreeItem
{

  private var childs: Boolean = _

  private var item: AnyRef = _

  private var identifier: String = _

  //since  we want the class perfectly java usable
  //we have to work over setters and getters
  //given we have an interface to adhere we cannot use
  //Beanproperties here
  def getItem() = item

  def getIdentifier() = identifier

  def isChilds() = childs

  def setItem(theItem: AnyRef)
  {
    item = theItem
  }

  def setIdentifier(theIdentifier: String)
  {
    identifier = theIdentifier
  }

  def setChilds(theChilds: Boolean)
  {
    childs = theChilds
  }

}