package org.extrasapache.myfaces.codi.examples.ebean.support.ui.components.datePicker

import java.util.{ArrayList, Calendar}
import java.util.logging.Logger
import java.io.ObjectInputStream

/**
 *
 * @author Werner Punz (latest modification by $Author$)
 * @version $Revision$ $Date$
 *
 * TODO proper beginning day calculation
 */
@serializable
class PickerMonth(var selectedDay: Calendar) {

  @transient
  var logger = Logger.getLogger("PickerMonth")

  @transient
  var weeks = prepareMonth(selectedDay)

  var current: PickerDay = _

  //TODO implement this
  var beginDay: Int = 1 /*1 mon 2 tues etc...*/

  /*properties for day month year selection*/
  def day: Int = {
    selectedDay.get(Calendar.DAY_OF_MONTH)
  }

  def day_$eq(day: Int) {
    selectedDay.set(Calendar.DAY_OF_MONTH, day)
  }

  def month: Int = {
    selectedDay.get(Calendar.MONTH)
  }

  def month_$eq(month: Int) {
    selectedDay.set(Calendar.MONTH, month)
    weeks = prepareMonth(selectedDay)
  }

  def year: Int = {
    selectedDay.get(Calendar.YEAR)
  }

  def year_$eq(year: Int) {
     selectedDay.set(Calendar.YEAR, year)
     weeks = prepareMonth(selectedDay)
  }

  def nextMonth() {
    this.month = this.month+1
  }

  def previousMonth() {
    this.month = this.month-1
  }

  def nextYear() {
    this.year = this.year+1
  }

  def previousYear() {
    this.year = this.year-1
  }

  def first:PickerDay = {
    weeks.get(0).days.get(0)
  }

  def last:PickerDay = {
    var pm = weeks.get(weeks.size -1)

    pm.days.get(pm.days.size -1)
  }

  /**
   * prerender creates the date picker list model which then is used
   * for further processing
   */
  protected def prepareMonth(currentDay: Calendar): ArrayList[PickerWeek] = {

    val ret = new ArrayList[PickerWeek]

    val currentMonth = makeMonth(currentDay)
    current = new PickerDay
    current.cal = currentDay

    //not iterate over all days and create the day entry list
    val firstDay = currentMonth.getActualMinimum(Calendar.DAY_OF_MONTH)
    val lastDay = currentMonth.getActualMaximum(Calendar.DAY_OF_MONTH)

    val firstDayDisplayed = makeMonth(currentMonth);
    firstDayDisplayed.set(Calendar.DAY_OF_MONTH, firstDay)

    val lastDayDisplayed = makeMonth(currentMonth);
    lastDayDisplayed.set(Calendar.DAY_OF_MONTH, lastDay)

    //we now skip to the beginning of the week according to the locale set
    val DAY_LENGTH = 1000l*60l*60l*24l
    val firstDayOfMonthMS = firstDayDisplayed.getTimeInMillis
    val lastDayOfMonthMS = lastDayDisplayed.getTimeInMillis
    val firstMs = firstDayDisplayed.getTimeInMillis - DAY_LENGTH * ( firstDayDisplayed.get(Calendar.DAY_OF_WEEK) - 1);
    val lastMs =  lastDayDisplayed.getTimeInMillis  + DAY_LENGTH * (8 - lastDayDisplayed.get(Calendar.DAY_OF_WEEK));

    val days = (lastMs - firstMs) / DAY_LENGTH

    firstDayDisplayed.setTimeInMillis(firstMs)
    val currentDate = makeDay(firstDayDisplayed)
    var pickerWeek:PickerWeek = new PickerWeek()

    /*beginning of a new week*/
    def newWeek() {
      if (pickerWeek != null) {
          ret.add(pickerWeek)
          pickerWeek = new PickerWeek
        }
    }

    //we now increment all days and generate the meta data for our view
    for(cnt <- 0 until days.asInstanceOf[Int] ) {
      currentDate.setTimeInMillis(currentDate.getTimeInMillis+DAY_LENGTH)
      val currentPickerDay = new PickerDay
      currentPickerDay.cal = makeDay(currentDate)
      currentPickerDay.inSelectedMonth = currentPickerDay.cal.getTimeInMillis < firstDayOfMonthMS || currentPickerDay.cal.getTimeInMillis > lastDayOfMonthMS

      if (currentDate.get(Calendar.DAY_OF_WEEK) == 1) {
        currentPickerDay.firstDayOfWeek = true

        pickerWeek.days.add(currentPickerDay)
        if (cnt < (days.asInstanceOf[Int]-1l)) {
          newWeek()
        }
      } else {
        pickerWeek.days.add(currentPickerDay)
      }
    }
    newWeek()
    pickerWeek = null

    ret
  }

  protected def makeMonth(in: Calendar): Calendar = {
    val ret = Calendar.getInstance()
    ret.set(Calendar.YEAR, in.get(Calendar.YEAR))
    ret.set(Calendar.MONTH, in.get(Calendar.MONTH))
    ret.set(Calendar.DAY_OF_MONTH, in.get(Calendar.DAY_OF_MONTH))
    ret.set(Calendar.HOUR, 0)
    ret.set(Calendar.MINUTE, 0)
    ret.set(Calendar.SECOND, 0)
    ret.set(Calendar.MILLISECOND, 1)

    ret
  }

  protected def makeDay(in: Calendar): Calendar = {
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

  private def readObject(in: ObjectInputStream) {
    in.defaultReadObject
    if (weeks == null) {
      weeks = prepareMonth(selectedDay)
    }
  }

}