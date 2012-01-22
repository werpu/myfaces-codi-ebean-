package org.extrasapache.myfaces.codi.examples.ebean.support.ui.components.tree.model

import javax.faces.model.SelectItem
import reflect.BeanProperty

/**
 * Builder pattern for easier tree creation
 * */


/**
 *
 * @author Werner Punz (latest modification by $Author$)
 * @version $Revision$ $Date$
 *
 * a a tree item, which has the same identifier as the select item it holds
 *
 * <h3>Additional attributes:</h3>
 * <li>childs: an ItemColl holding its children with convenience methods</li>
 * <li>expanded: if set to true then the tree node is expanded</li>
 * <li>identifier: the identifier (equals the label)</li>
 * <li>value: the SelectItem holding the current node value</li>
 */
@serializable
class TreeItem[T <: SelectItem] {
  @BeanProperty
  val childs = new ItemColl[T, TreeItem[T]]()
  @BeanProperty
  var expanded: Boolean = false
  @BeanProperty
  var identifier: String = _
  protected var _value: T = _ //setters and getters see below

  def TreeItem() {
  }



  def hasChilds: Boolean = childs.hashChilds

  def getChild(identifier: String): TreeItem[T] = childs.get(identifier)

  def append(value: T): TreeItem[T] = {
    val finalValue = new TreeItem[T]
    finalValue.setValue ( value )
    childs.set(finalValue)
    finalValue
  }

  def remove(identifier: String) {
    val child = childs.get(identifier)
    if (child != null) {
      childs.remove(child)
    }
  }

  def remove(child: TreeItem[T]) {
    childs.remove(child)
  }

  def setValue(newVal: T) = {
    _value = newVal
    identifier = newVal.getLabel
  }

  def getValue: T = _value

  def setLabel(newVal: String) = {
    _value.setLabel(newVal)
    identifier = newVal
  }

  def getLabel: String = _value.getLabel




}