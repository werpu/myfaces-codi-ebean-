package org.extrasapache.myfaces.codi.examples.ebean.view.security

import org.apache.myfaces.extensions.cdi.core.api.config.view.ViewConfig
import org.apache.myfaces.extensions.cdi.jsf.api.config.view.Page

/**
 *
 * @author Werner Punz (latest modification by $Author$)
 * @version $Revision$ $Date$
 */

object Security extends ViewConfig {

  @Page
  class GroupList extends ViewConfig

  @Page
  class UserList extends ViewConfig

  @Page
  class UserDetail extends ViewConfig

}