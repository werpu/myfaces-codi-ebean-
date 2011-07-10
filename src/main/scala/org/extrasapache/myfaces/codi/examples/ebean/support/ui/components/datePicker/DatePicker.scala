package org.extrasapache.myfaces.codi.examples.ebean.support.ui.components.datePicker

import javax.faces.component.FacesComponent
import org.extrasapache.myfaces.codi.examples.ebean.support.ui.components.common.StandardJavascriptComponent
import javax.faces.event.{PostRestoreStateEvent, ListenerFor, ActionEvent, ComponentSystemEvent}
import java.text.SimpleDateFormat
import javax.faces.model.SelectItem
import javax.faces.context.FacesContext

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

  def nextYear(event: ActionEvent) {
    displayData.nextYear
  }

  def nextMonth(event: ActionEvent) {
    displayData.nextMonth
  }

  def previousMonth(event: ActionEvent) {
    displayData.previousMonth
  }

  def previousYear(event: ActionEvent) {
    displayData.previousYear
  }

  def preRenderInput(ev: ComponentSystemEvent) {
    restoreDisplayData
  }

  /*
  * the listener now is responsible for checking for an incoming
  * date change value and then parsing it in
  */
  override def processEvent(event: ComponentSystemEvent) {
    val incomingParam = reqAttrMap.get("mf_dp")
    if (incomingParam != null && incomingParam.trim != "") {
      val longVal: Long = incomingParam.toLong
      val value = getAttr[Calendar](VALUE, Calendar.getInstance())
      value.setTimeInMillis(longVal)
      setAttr[Calendar](VALUE, value)
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

  //accessors
  def getDisplayYear(): String = {
    val yearDF = new SimpleDateFormat("yyyy");
    val tempHolder = Calendar.getInstance();
    tempHolder.set(Calendar.YEAR, displayData.year)
    yearDF.format(tempHolder)
  }

  def setDisplayYear(year: String) {
    val yearDF = new SimpleDateFormat("yyyy");
    val tempCal = Calendar.getInstance()

    displayData.year =  tempCal.get(Calendar.YEAR)
  }
  //
  def montList:List[SelectItem] = {

    val ret = new ArrayList[SelectItem](12)
    val calHelper = Calendar.getInstance();


    val monthDF = if(getLocale == null) new SimpleDateFormat("yyyy") else new SimpleDateFormat("yyyy", getLocale)
    for (cnt <- 0 until 12) {
      calHelper.set(Calendar.MONTH, cnt)
      val monthString = monthDF.format(calHelper.getTime).toString
      ret.add(new SelectItem(cnt, monthString))
    }

    ret
  }

  def weekList:List[String] = {
    val ret = new ArrayList[String](7)
    val calHelper = Calendar.getInstance();
    val locale  = getLocale

    val formatter:SimpleDateFormat = {if(locale == null)  new SimpleDateFormat("EEE") else  new SimpleDateFormat("EEE", locale)}
    for (cnt <- 1 until 8) {
      calHelper.set(Calendar.DAY_OF_WEEK, cnt)
      val weekString = formatter.format(calHelper.getTime).toString
      ret.add(weekString)
    }

    ret
  }

}