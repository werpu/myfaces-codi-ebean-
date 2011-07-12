package org.extrasapache.myfaces.codi.examples.ebean.support.ui.components.datePicker

import javax.faces.component.FacesComponent
import org.extrasapache.myfaces.codi.examples.ebean.support.ui.components.common.StandardJavascriptComponent
import javax.faces.event.{PostRestoreStateEvent, ListenerFor, ActionEvent, ComponentSystemEvent}
import javax.faces.model.SelectItem
import java.text.{DateFormat, SimpleDateFormat}

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

  val DATE_FORMAT = "dateFormat"

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
      val value = getAttr[Date](VALUE, Calendar.getInstance().getTime)
      value.setTime(longVal)
      setAttr[Date](VALUE, value)
    }
    restoreDisplayData
    super.processEvent(event)
  }

  protected def restoreDisplayData {
    val value = getAttr[Date]("value", Calendar.getInstance().getTime)
    val calValue = Calendar.getInstance();
    calValue.setTime(value)
    displayData = getAttr[PickerMonth](DISPLAY_DATA, null)
    if (displayData == null) {
      displayData = new PickerMonth(calValue)
      setAttr[PickerMonth](DISPLAY_DATA, displayData)
    } else {
      displayData.selectedCal = calValue
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

    displayData.year = tempCal.get(Calendar.YEAR)
  }

  //
  def montList: List[SelectItem] = {

    val ret = new ArrayList[SelectItem](12)
    val calHelper = Calendar.getInstance();


    val monthDF = if (getLocale == null) new SimpleDateFormat("MMM") else new SimpleDateFormat("MMM", getLocale)
    for (cnt <- 0 until 12) {
      calHelper.set(Calendar.MONTH, cnt)
      val monthString = monthDF.format(calHelper.getTime).toString
      ret.add(new SelectItem(cnt, monthString))
    }

    ret
  }

  def selectedDate(): String = {
    val dfStr = getAttr[String](DATE_FORMAT, null)
    val locale = getLocale
    val dateFormat = if (dfStr != null) new SimpleDateFormat(dfStr)
    else {
      if (locale != null)
        DateFormat.getDateInstance(DateFormat.LONG, locale)
      else
        DateFormat.getDateInstance(DateFormat.LONG)
    }
    dateFormat.format(getAttr[Date](VALUE, Calendar.getInstance().getTime))
  }

  def weekList: List[String] = {
    val ret = new ArrayList[String](7)
    val calHelper = Calendar.getInstance();
    val locale = getLocale

    val formatter: SimpleDateFormat = if (locale == null) new SimpleDateFormat("EEE") else new SimpleDateFormat("EEE", locale)
    for (cnt <- 1 until 8) {
      calHelper.set(Calendar.DAY_OF_WEEK, cnt)
      val weekString = formatter.format(calHelper.getTime).toString
      ret.add(weekString)
    }

    ret
  }
}