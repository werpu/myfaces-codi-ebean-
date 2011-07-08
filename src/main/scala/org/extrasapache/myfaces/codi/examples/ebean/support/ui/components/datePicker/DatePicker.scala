package org.extrasapache.myfaces.codi.examples.ebean.support.ui.components.datePicker

import javax.faces.component.FacesComponent
import org.extrasapache.myfaces.codi.examples.ebean.support.ui.components.common.StandardJavascriptComponent
import javax.faces.event.{ActionEvent, ComponentSystemEvent}
import java.util.logging.Logger

/**
 *
 * @author Werner Punz (latest modification by $Author$)
 * @version $Revision$ $Date$
 */

object DatePicker {
  val DATE_PATTERN  = "datePattern"
  val HOLIDAYS      = "holidays"
  val SPECIAL_DAYS  = "specialDays"

  val BEG_WEEK      = "beginningOfWeek"
  val VALUE         = "value"
}

/**
 * helper to avoid a problem with the image button being nested in another component
 * takes a calendar as value
 */
@FacesComponent("at.irian.DatePicker")
@serializable
class DatePicker extends StandardJavascriptComponent {

  import java.util._
  import DatePicker._

  var displayData:PickerMonth = _
  //we use prerender to enable the value conversion
  //TODO move this into an implicit jsf converter in the long run
  def preRenderInput(ev: ComponentSystemEvent) {
    var value = getAttr[Calendar]("value", Calendar.getInstance())
    if (displayData == null || displayData.selectedDay != value) {
       displayData = new PickerMonth(value)
    }
  }

  def selectDay:String = {
    val logger = Logger.getLogger("DatePicker.selectDay")
    logger.info("picked")
    return null
  }


}