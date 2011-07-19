package org.extrasapache.myfaces.codi.examples.ebean.support.ui.components.selectionList

import javax.faces.model.SelectItem
import reflect.BeanProperty

/**
 *
 * @author Werner Punz (latest modification by $Author$)
 * @version $Revision$ $Date$
 */
@serializable
class SelectionItem extends SelectItem {

  def this(item: SelectItem, mark:String = "") {
    this()
    this.setValue(item.getValue())
    this.setLabel(item.getLabel)
    this.setDescription(item.getDescription)
    this.setDisabled(item.isDisabled)
    this.setEscape(item.isEscape)
    this.setNoSelectionOption(item.isNoSelectionOption)
    this.markerClass = mark
  }

  @BeanProperty
  var markerClass = ""
}