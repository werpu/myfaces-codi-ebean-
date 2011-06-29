package org.extrasapache.myfaces.codi.examples.ebean.support.ui.components.datePicker

import java.util.Calendar

/**
 *
 * @author Werner Punz (latest modification by $Author$)
 * @version $Revision$ $Date$
 *
 * internal day descriptor for a single day
 */

class PickerDay {

  var day: Calendar = _
  var holiday: Boolean = false
  var firstDayOfWeek: Boolean = false
  var specialDay: Boolean = false
  var specialDayMetaInfo:String = ""
}