package org.extrasapache.myfaces.codi.examples.ebean.support.ui.components.tree.model

import javax.faces.model.SelectItem

/**
 *
 * @author Werner Punz (latest modification by $Author$)
 * @version $Revision$ $Date$
 */
@serializable
class TreeItem[T <: SelectItem] {

  val childs = new ItemColl[T, TreeItem[T]]()
  var expanded: Boolean = false

  var identifier: String = _
  protected var _value: T = _ //setters and getters see below

  def TreeItem() {
  }

  def TreeItem(newVal: T) {
    _value = newVal
  }

  def hasChilds: Boolean = childs.hashChilds

  def getChild(identifier: String): TreeItem[T] = childs.get(identifier)

  def append(value: T): TreeItem[T] = {
    val finalValue = new TreeItem[T]
    finalValue.value = value
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

  def value_$eq(newVal: T) = {
    _value = newVal
    identifier = newVal.getLabel
  }

  def value: T = _value

  def label_$eq(newVal: String) = {
    _value.setLabel(newVal)
    identifier = newVal
  }

  def label: String = _value.getLabel

}