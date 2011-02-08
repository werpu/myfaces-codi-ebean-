package org.extrasapache.myfaces.codi.examples.ebean.view.person

import org.extrasapache.myfaces.codi.examples.ebean.business.bo.person.PersonFacade
import org.extrasapache.myfaces.codi.examples.ebean.support.data.PaginationController
import javax.annotation.PostConstruct
import org.extrasapache.myfaces.codi.examples.ebean.business.util.FilterEntry
import org.apache.myfaces.extensions.cdi.core.api.scope.conversation.ViewAccessScoped
import javax.inject.{Named, Inject}
import scala.math._

/**
 *
 * @author Werner Punz (latest modification by $Author$)
 * @version $Revision$ $Date$
 */

/**
 * PersonListViewModel
 * we split our page bean into two parts
 * a model part containing all referenced
 * model elements (and combined controller model elements)
 *
 * and a controller class part containing the core logic
 * That way we get a cleaner structure  and can share models
 * between various page beans with different logic
 *
 */
@serializable
trait PersonListViewModel {
  @Inject
  var searchData: PersonListSearchModel = null
  /**
   * we inject our person facade to handle the raw details
   */
  @Inject
  var personFacade: PersonFacade = null

  var listModel: PaginationController[org.extrasapache.myfaces.codi.examples.ebean.orm.person.Person] = null
}

/**
 * The controller logic which itself is also a page bean,
 * we use traits as decorators which decorate our model in
 */
@Named
@ViewAccessScoped
@serializable
class PersonListView extends PersonListViewModel {

  import Person._

  def preRenderView = {}

  @PostConstruct
  def postConstruct = {
    if (listModel == null && searchData.searchPerformed) {
      refresh
    }
  }

  protected def refresh = {
    var filters: java.util.List[FilterEntry] = null
    if (searchData != null) filters = searchData.toFilterList
    listModel = personFacade.loadFromTo(max(searchData.from, 0), searchData.pageSize, filters, null)
  }

  def doSearchList: java.lang.Class[_] = {
    refresh

    GO_LIST
  }
}