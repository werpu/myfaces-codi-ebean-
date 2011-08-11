package org.extrasapache.myfaces.codi.examples.ebean.view.person

import org.apache.myfaces.extensions.cdi.core.api.config.view.ViewConfig
import org.apache.myfaces.extensions.cdi.jsf.api.config.view.Page

/**
 *
 * @author Werner Punz (latest modification by $Author$)
 * @version $Revision$ $Date$
 *
 * We use traits as interfaces for the codi type safe navigation
 */

object Person extends ViewConfig {

  @Page
  object PersonList extends ViewConfig

  @Page
  object PersonDetail extends ViewConfig

  /*remapping of the function call hierarchy to make the code leaner*/
  def GO_DETA: Class[_] = Person.PersonDetail.getClass

  def GO_LIST: Class[_] = Person.PersonList.getClass

}




