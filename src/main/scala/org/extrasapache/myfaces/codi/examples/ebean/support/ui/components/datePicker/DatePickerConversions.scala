package org.extrasapache.myfaces.codi.examples.ebean.support.ui.components.datePicker

import java.util.Calendar

/**
 *
 * @author Werner Punz (latest modification by $Author$)
 * @version $Revision$ $Date$
 *
 * pickerday calendar cross conversion
 */

object DatePickerConversions {
  implicit def pickerDay2Calendar(pickerDay: PickerDay): Calendar = {
    pickerDay.day
  }

  implicit def Calendar2PickerDay(cal: Calendar): PickerDay = {
    val ret = new PickerDay()
    ret.day = cal

    ret
  }
}