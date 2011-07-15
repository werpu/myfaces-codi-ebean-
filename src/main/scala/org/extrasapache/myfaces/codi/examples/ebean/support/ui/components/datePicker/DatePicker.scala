package org.extrasapache.myfaces.codi.examples.ebean.support.ui.components.datePicker

import org.extrasapache.myfaces.codi.examples.ebean.support.ui.components.common.StandardJavascriptComponent
import javax.faces.model.SelectItem
import java.text.{DateFormat, SimpleDateFormat}
import collection.mutable.ArrayBuffer
import collection.JavaConversions._
import java.util.ArrayList
import javax.faces.event._
import javax.faces.component.{UIInput, FacesComponent}
import javax.faces.convert.DateTimeConverter

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
@ListenersFor(Array(
  new ListenerFor(systemEventClass = classOf[PostRestoreStateEvent]),
  new ListenerFor(systemEventClass = classOf[PostAddToViewEvent])
))
class DatePicker extends StandardJavascriptComponent {

  import java.util._
  import DatePicker._

  var displayData: PickerMonth = _

  def nextYear(event: ActionEvent) {
    displayData.nextYear
  }

  def nextMonth(event: ActionEvent):Unit      =  displayData.nextMonth
  def previousMonth(event: ActionEvent):Unit  = displayData.previousMonth
  def previousYear(event: ActionEvent):Unit   = displayData.previousYear
  def preRenderInput(ev: ComponentSystemEvent):Unit = restoreDisplayData

  /*
  * the listener now is responsible for checking for an incoming
  * date change value and then parsing it in
  */
  override def processEvent(event: ComponentSystemEvent) {
    event match {
      case evt: PostAddToViewEvent => {
        if (valHolder.getConverter == null) {
          val converter = new DateTimeConverter()
          converter.setDateStyle("medium")
          converter.setLocale(getLocale())
          converter.setTimeZone(Calendar.getInstance().getTimeZone)
          valHolder.setConverter(converter)
        }
      }
      case evt: PostRestoreStateEvent => {
          val incomingParam = reqAttrMap.get("mf_dp")
          if (incomingParam != null && incomingParam.trim != "") {
            val longVal: Long = incomingParam.toLong
            val value = getAttr[Date](VALUE, Calendar.getInstance(getTimezone()).getTime)
            value.setTime(longVal)
            setAttr[Date](VALUE, value)
          }
          restoreDisplayData
      }
      case _ => {}
    }


    super.processEvent(event)
  }


  def valHolder:UIInput = {
    findComponent("input") match {
      case inp:UIInput => inp
      case _ => null
    }
  }


  protected def restoreDisplayData {
    val value = getAttr[Date]("value", Calendar.getInstance(getTimezone()).getTime())
    val calValue = Calendar.getInstance(getTimezone());
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
    val yearDF = new SimpleDateFormat("yyyy", getLocale());
    val tempHolder = Calendar.getInstance(getTimezone());
    tempHolder.set(Calendar.YEAR, displayData.year)

    yearDF.format(tempHolder)
  }

  def setDisplayYear(year: String) {
    val yearDF = new SimpleDateFormat("yyyy", getLocale());
    val tempCal = Calendar.getInstance(getTimezone())

    displayData.year = tempCal.get(Calendar.YEAR)
  }

  //
  def montList: List[SelectItem] = {

    val ret = new ArrayList[SelectItem](12)
    val calHelper = Calendar.getInstance(getTimezone());


    val monthDF = new SimpleDateFormat("MMM", getLocale())
    for (cnt <- 0 until 12) {
      calHelper.set(Calendar.MONTH, cnt)
      val monthString = monthDF.format(calHelper.getTime).toString
      ret.add(new SelectItem(cnt, monthString))
    }

    ret
  }

  def finalConverter: DateTimeConverter = {
      valHolder.getConverter() match {
        case conv: DateTimeConverter => conv
        case _ => null
      }
  }

  /**
   * fetches the current locale
   * either from the converter or from
   * the jsf locale being present
   */
  override def getLocale():Locale = {
       if (finalConverter != null)
         finalConverter.getLocale
       else
         super.getLocale
  }

  /**
   * fetches the given timezone either from an embedded converter
   * or from the system timezone currently present
   */
  def getTimezone():TimeZone = {
      if (finalConverter != null)
          finalConverter.getTimeZone
      else
         Calendar.getInstance().getTimeZone
  }


  def selectedDate(): String = {

    val dfStr = getAttr[String](DATE_FORMAT, null)

    val dateFormat = if (dfStr != null) new SimpleDateFormat(dfStr)
    else {
        DateFormat.getDateInstance(DateFormat.LONG, getLocale)
    }
    dateFormat.setTimeZone(getTimezone())
    dateFormat.format(getAttr[Date](VALUE, Calendar.getInstance(getTimezone()).getTime))
  }

  def weekList: List[String] = {
    val ret = new ArrayList[String](7)
    val calHelper = Calendar.getInstance(getTimezone());

    val formatter: SimpleDateFormat = new SimpleDateFormat("EEE", getLocale)
    formatter.setTimeZone(getTimezone())

    for (cnt <- 1 until 8) {
      calHelper.set(Calendar.DAY_OF_WEEK, cnt)
      val weekString = formatter.format(calHelper.getTime).toString
      ret.add(weekString)
    }

    ret
  }
}