package org.extrasapache.myfaces.codi.examples.ebean.support.ui.components.datePicker


import org.junit.Test
import junit.framework.Assert._
import java.util.Calendar
import java.util.logging.Logger
/**
 *
 * @author Werner Punz (latest modification by $Author$)
 * @version $Revision$ $Date$
 */

class PickerMonthTest {

  var logger = Logger.getLogger("PickerMonthTest")
  @Test
  def testPickerMonth() {
    logger.info("Starting Test")
    var probe = Calendar.getInstance();
    probe.set(Calendar.YEAR, 2011)
    probe.set(Calendar.MONTH, Calendar.JANUARY)
    probe.set(Calendar.DAY_OF_WEEK, 2)

    var pickerMonth = new PickerMonth(probe)

    import DatePickerConversions._

    logger.info("First:"+pickerMonth.first.get(Calendar.DAY_OF_MONTH))
    logger.info("Last:"+pickerMonth.last.get(Calendar.DAY_OF_MONTH))

    assertTrue("First day", 26 == pickerMonth.first.get(Calendar.DAY_OF_MONTH))
    assertTrue("Last day", 5 == pickerMonth.last.get(Calendar.DAY_OF_MONTH))

    assertTrue("Month", Calendar.DECEMBER == pickerMonth.first.get(Calendar.MONTH))
    assertTrue("Month", Calendar.FEBRUARY == pickerMonth.last.get(Calendar.MONTH))

    //Last day 06.02.2011


    //TODO assert now the begin and ending of the pickermonth properly
    logger.info("Ending Test")
  }

}