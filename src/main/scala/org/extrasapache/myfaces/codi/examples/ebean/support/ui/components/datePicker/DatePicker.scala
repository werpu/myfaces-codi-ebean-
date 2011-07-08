package org.extrasapache.myfaces.codi.examples.ebean.support.ui.components.datePicker

import javax.faces.component.FacesComponent
import org.extrasapache.myfaces.codi.examples.ebean.support.ui.components.common.StandardJavascriptComponent
import javax.faces.event.{PostRestoreStateEvent, ListenerFor, ActionEvent, ComponentSystemEvent}

/**
 *
 * @author Werner Punz (latest modification by $Author$)
 * @version $Revision$ $Date$
 */

object DatePicker {
  val DATE_PATTERN = "datePattern"
  val HOLIDAYS = "holidays"
  val SPECIAL_DAYS = "specialDays"

  val BEG_WEEK = "beginningOfWeek"
  val VALUE = "value"
  val DISPLAY_DATA = "displayData"
}

/**
 * helper to avoid a problem with the image button being nested in another component
 * takes a calendar as value
 */
@FacesComponent("at.irian.DatePicker")
@serializable
@ListenerFor(systemEventClass = classOf[PostRestoreStateEvent])
class DatePicker extends StandardJavascriptComponent {

  import java.util._
  import DatePicker._

  var displayData: PickerMonth = _

  def nextYear(event: ActionEvent) { displayData.nextYear }
  def nextMonth(event: ActionEvent) { displayData.nextMonth }
  def previousMonth(event: ActionEvent) { displayData.previousMonth }
  def previousYear(event: ActionEvent) { displayData.previousYear }

  def preRenderInput(ev: ComponentSystemEvent) { restoreDisplayData }


  /*
   * the listener now is responsible for checking for an incoming
   * date change value and then parsing it in
   */
  override def processEvent(event: ComponentSystemEvent) {
    val incomingParam = reqAttrMap.get("mf_dp")
    if (incomingParam != null && incomingParam.trim != "") {
      val longVal:Long =  incomingParam.toLong
      val value = getAttr[Calendar](VALUE, Calendar.getInstance())
      value.setTimeInMillis(longVal)
      setAttr[Calendar](VALUE,value)
    }
    restoreDisplayData
    super.processEvent(event)
  }

  protected def restoreDisplayData {
    val value = getAttr[Calendar]("value", Calendar.getInstance())
    displayData = getAttr[PickerMonth](DISPLAY_DATA, null)
    if (displayData == null) {
      displayData = new PickerMonth(value)
      setAttr[PickerMonth](DISPLAY_DATA, displayData)
    }
  }
}