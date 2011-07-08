package org.extrasapache.myfaces.codi.examples.ebean.support.ui.components.datePicker

import javax.faces.component.FacesComponent
import org.extrasapache.myfaces.codi.examples.ebean.support.ui.components.common.StandardJavascriptComponent
import java.util.logging.Logger
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

  /*
   * the listener now is responsible for checking for an incoming
   * date change value and then parsing it in
   */
  override def processEvent(event: ComponentSystemEvent) {
    val logger = Logger.getLogger("DatePicker.selectDay")
    logger.info("decoded")
    val incomingParam: String = reqAttrMap.get("mf_dp")
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
    if (displayData == null || displayData.selectedDay != value) {
      displayData = new PickerMonth(value)
    }
  }

  def nextYear(event: ActionEvent) {
    val logger = Logger.getLogger("DatePicker.selectDay")
    logger.info("nextYear")
  }

  def nextMonth(event: ActionEvent) {
    val logger = Logger.getLogger("DatePicker.selectDay")
    logger.info("nextMonth")
  }

  def previousMonth(event: ActionEvent) {
    val logger = Logger.getLogger("DatePicker.selectDay")
    logger.info("previousMonth")
  }

  def previousYear(event: ActionEvent) {
    val logger = Logger.getLogger("DatePicker.selectDay")
    logger.info("previousYear")
  }

  def preRenderInput(ev: ComponentSystemEvent) {
    //we fetch the request attribute in case we did not have it yet

    restoreDisplayData
  }

  def selectDay: String = {
    val logger = Logger.getLogger("DatePicker.selectDay")
    logger.info("picked")
    null
  }

}