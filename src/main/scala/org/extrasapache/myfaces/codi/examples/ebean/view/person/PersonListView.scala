package org.extrasapache.myfaces.codi.examples.ebean.view.person

import java.io.Serializable
import org.extrasapache.myfaces.codi.examples.ebean.business.bo.person.PersonFacade
import org.extrasapache.myfaces.codi.examples.ebean.support.data.PaginationController
import reflect.BeanProperty
import javax.annotation.PostConstruct
import org.extrasapache.myfaces.codi.examples.ebean.business.util.FilterEntry
import org.apache.myfaces.extensions.cdi.core.api.scope.conversation.ViewAccessScoped
import javax.inject.{Named, Inject}
import org.apache.myfaces.extensions.cdi.core.api.config.view.ViewConfig

import scala.math._

/**
 *
 * @author Werner Punz (latest modification by $Author$)
 * @version $Revision$ $Date$
 */

trait PersonListViewModel extends Serializable {
   @Inject
   @BeanProperty
   var searchData: PersonListSearchModel = null
   /**
    * we inject our person facade to handle the raw details
    */
   @Inject
   var personFacade: PersonFacade = null

   @BeanProperty
   var listModel: PaginationController[org.extrasapache.myfaces.codi.examples.ebean.orm.person.Person] = null
}

@Named
@ViewAccessScoped
class PersonListView extends PersonListViewModel with Serializable {

  def preRenderView = {}

  @PostConstruct
  def postConstruct = {
    if(listModel == null && searchData.isSearchPerformed) {
      refresh
    }
  }

  protected def refresh = {
    var filters: java.util.List[FilterEntry] = null
    if (searchData != null)  filters = searchData.toFilterList
    listModel = personFacade.loadFromTo(max(searchData.getFrom, 0), searchData.getPageSize, filters, null)
  }

  def doSearchList: java.lang.Class[_ <: ViewConfig] = {
    refresh

     classOf [Person.PersonList]
  }
}