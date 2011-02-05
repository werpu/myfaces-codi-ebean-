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
  object GroupList extends ViewConfig

  @Page
  object UserList extends ViewConfig

  @Page
  object UserDetail extends ViewConfig

  def GO_GROUP_LIST: Class[_] = GroupList.getClass
  def GO_USER_LIST: Class[_]  = UserList.getClass
  def GO_USER_DETA: Class[_]  = UserDetail.getClass


}