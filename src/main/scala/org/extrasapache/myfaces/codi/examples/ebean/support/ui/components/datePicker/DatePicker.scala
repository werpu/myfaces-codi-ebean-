package org.extrasapache.myfaces.codi.examples.ebean.support.ui.components.datePicker

import javax.faces.component.FacesComponent
import org.extrasapache.myfaces.codi.examples.ebean.support.ui.components.common.StandardJavascriptComponent
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

  var displayData = new ArrayList[PickerWeek]



  /**
   * prerender creates the date picker list model which then is used
   * for further processing
   */
  def prepareMonth() {

    val currentDay = getAttr[Calendar](VALUE, Calendar.getInstance())
    //not render from beginning of the month to the end of the current month
    var month = currentDay.get(Calendar.MONTH);
    //now reset th
    val currentMonth = makeMonth(currentDay)

    //not iterate over all days and create the day entry list
    val firstDay = currentMonth.getActualMinimum(Calendar.DAY_OF_MONTH)
    var lastDay = currentMonth.getActualMaximum(Calendar.DAY_OF_MONTH)

    val firstDayDisplayed = makeMonth(currentMonth);
    firstDayDisplayed.set(Calendar.DAY_OF_MONTH, firstDay)

    val lastDayDisplayed = makeMonth(currentMonth);
    lastDayDisplayed.set(Calendar.DAY_OF_MONTH, firstDay)

    //we now skip to the beginning of the week according to the locale set
    while(firstDayDisplayed.get(Calendar.DAY_OF_WEEK) != 0) {
      firstDayDisplayed.set(Calendar.DAY_OF_WEEK, firstDayDisplayed.get(Calendar.DAY_OF_WEEK) -1);
    }
    //and to the end of the week according to the locale set
    while(lastDayDisplayed.get(Calendar.DAY_OF_WEEK) != 6) {
      lastDayDisplayed.set(Calendar.DAY_OF_WEEK, lastDayDisplayed.get(Calendar.DAY_OF_WEEK) +1);
    }
    val DAY_LENGTH = 1000l*60l*60l*24l
    val days = (lastDayDisplayed.getTimeInMillis() - lastDayDisplayed.getTimeInMillis()) / DAY_LENGTH
    val currentDate = makeDay(firstDayDisplayed)
    var pickerWeek:PickerWeek = null

    /*beginning of a new week*/
    def newWeek() {
      if (pickerWeek != null) {
          displayData.add(pickerWeek)
          pickerWeek = new PickerWeek
        }
    }

    //we now increment all days and generate the meta data for our view
    for(cnt <- 0 until days.asInstanceOf[Int] ) {
      currentDate.setTimeInMillis(currentDate.getTimeInMillis+DAY_LENGTH)
      val currentPickerDay = new PickerDay
      currentPickerDay.day = makeDay(currentDate)
      if (currentDate.get(Calendar.DAY_OF_WEEK) == 0) {
        currentPickerDay.firstDayOfWeek = true
        newWeek()
        //todo add holiday handling here with a holiday hashmap provided
      }
      pickerWeek.days.add(currentPickerDay)
    }
    newWeek()
    pickerWeek = null

    //now that we have determined the starting and end day, we now generate the
    //calendar data structures for displaying the meta information
    //for loop between first day set and last day
  }

  def makeMonth(in: Calendar): Calendar = {
    val ret = Calendar.getInstance()
    ret.set(Calendar.YEAR, in.get(Calendar.YEAR))
    ret.set(Calendar.MONTH, in.get(Calendar.MONTH))
    ret.set(Calendar.DAY_OF_MONTH, 0)
    ret.set(Calendar.HOUR, 0)
    ret.set(Calendar.MINUTE, 0)
    ret.set(Calendar.SECOND, 0)
    ret.set(Calendar.MILLISECOND, 0)

    ret
  }

  def makeDay(in: Calendar): Calendar = {
    val ret = Calendar.getInstance()
    ret.set(Calendar.YEAR, in.get(Calendar.YEAR))
    ret.set(Calendar.MONTH, in.get(Calendar.MONTH))
    ret.set(Calendar.DAY_OF_MONTH, in.get(Calendar.DAY_OF_MONTH))
    ret.set(Calendar.HOUR, 0)
    ret.set(Calendar.MINUTE, 0)
    ret.set(Calendar.SECOND, 0)
    ret.set(Calendar.MILLISECOND, 0)

    ret
  }


}