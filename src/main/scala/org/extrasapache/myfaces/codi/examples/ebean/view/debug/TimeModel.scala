/*
 * Created by IntelliJ IDEA.
 * User: werpu2
 * Date: 22.02.11
 * Time: 13:56
 */
package org.extrasapache.myfaces.codi.examples.ebean.view.debug

import java.util.Calendar
import javax.inject.Named
import javax.enterprise.context.ApplicationScoped

@Named
@ApplicationScoped
class TimeModel {

  def timeDateAsString: String = {
    Calendar.getInstance.toString
  }
}