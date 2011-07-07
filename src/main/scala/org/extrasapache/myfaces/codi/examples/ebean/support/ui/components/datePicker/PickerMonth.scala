package org.extrasapache.myfaces.codi.examples.ebean.support.ui.components.datePicker

import java.util.{ArrayList, Calendar}
/**
 *
 * @author Werner Punz (latest modification by $Author$)
 * @version $Revision$ $Date$
 */
@serializable
case class PickerMonth(var selectedDay: Calendar) {

  @transient
  var data = prepareMonth(selectedDay)

  var current: PickerDay = _


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
    data = prepareMonth(selectedDay)
  }

  def year: Int = {
    selectedDay.get(Calendar.YEAR)
  }

  def year_$eq(year: Int) {
     selectedDay.set(Calendar.YEAR, year)
     data = prepareMonth(selectedDay)
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
    data.get(0).days.get(0)
  }

  def last:PickerDay = {
    var pm = data.get(data.size -1)

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
    current.day = currentDay

    //not iterate over all days and create the day entry list
    val firstDay = currentMonth.getActualMinimum(Calendar.DAY_OF_MONTH)

    val firstDayDisplayed = makeMonth(currentMonth);
    firstDayDisplayed.set(Calendar.DAY_OF_MONTH, firstDay)

    val lastDayDisplayed = makeMonth(currentMonth);
    lastDayDisplayed.set(Calendar.DAY_OF_MONTH, firstDay)

    //we now skip to the beginning of the week according to the locale set
    while(firstDayDisplayed.get(Calendar.DAY_OF_WEEK) != 1) {
      firstDayDisplayed.set(Calendar.DAY_OF_WEEK, firstDayDisplayed.get(Calendar.DAY_OF_WEEK) -1);
    }
    //and to the end of the week according to the locale set
    while(lastDayDisplayed.get(Calendar.DAY_OF_WEEK) != 7) {
      lastDayDisplayed.set(Calendar.DAY_OF_WEEK, lastDayDisplayed.get(Calendar.DAY_OF_WEEK) +1);
    }
    val DAY_LENGTH = 1000l*60l*60l*24l
    val days = (lastDayDisplayed.getTimeInMillis() - lastDayDisplayed.getTimeInMillis()) / DAY_LENGTH
    val currentDate = makeDay(firstDayDisplayed)
    var pickerWeek:PickerWeek = null

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

    ret
  }

  protected def makeMonth(in: Calendar): Calendar = {
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

  def main(args: Array[String]) {
    var pickerMonth = new PickerMonth(Calendar.getInstance());
  }

}