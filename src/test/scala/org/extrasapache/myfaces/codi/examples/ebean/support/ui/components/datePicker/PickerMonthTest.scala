package org.extrasapache.myfaces.codi.examples.ebean.support.ui.components.datePicker


import org.junit.Test
import junit.framework.TestCase
import junit.framework.Assert._
import java.util.Calendar
import java.util.logging.Logger
import javax.inject.Inject

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
    probe.set(Calendar.MONTH, 1)
    probe.set(Calendar.DAY_OF_WEEK, 2)

    var pickerMonth = new PickerMonth(Calendar.getInstance())

    //TODO first day 27.12.2010
    //Last day 06.02.2011

    //TODO assert now the begin and ending of the pickermonth properly
    logger.info("Ending Test")
  }

}