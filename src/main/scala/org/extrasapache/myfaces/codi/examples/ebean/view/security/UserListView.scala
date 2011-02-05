package org.extrasapache.myfaces.codi.examples.ebean.view.security

import org.apache.myfaces.extensions.cdi.core.api.scope.conversation.ViewAccessScoped
import javax.inject.{Inject, Named}
import org.extrasapache.myfaces.codi.examples.ebean.support.data.PaginationController
import org.extrasapache.myfaces.codi.examples.ebean.business.bo.security.UserFacade

import java.util._
import org.extrasapache.myfaces.codi.examples.ebean.business.util.FilterEntry
import org.apache.myfaces.extensions.cdi.core.api.config.view.ViewConfig
import reflect.BeanProperty
import org.extrasapache.myfaces.codi.examples.ebean.orm.security.User
import scala.math._

/**
 *
 * @author Werner Punz (latest modification by $Author$)
 * @version $Revision$ $Date$
 */

trait UserListViewData {
  @Inject
  @BeanProperty
  var searchData: UserListSearchModel = _

  @BeanProperty
  var listModel: PaginationController[User] = _

  @Inject
  var bo: UserFacade = _
}

@Named
@ViewAccessScoped
@serializable
class UserListView extends UserListViewData {

  def refreshIt: PaginationController[User] = {
    val filters: List[FilterEntry] = if (searchData != null) searchData.toFilterList else null
    bo.loadFromTo(max(searchData.getFrom, 0), searchData.getPageSize, filters, null);
  }

  def doSearch(): Class[_ <: ViewConfig] = {
    listModel = refreshIt
    null
  }
}