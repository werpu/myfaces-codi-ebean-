package org.extrasapache.myfaces.codi.examples.ebean.view.person

import org.apache.myfaces.extensions.cdi.core.api.scope.conversation.ViewAccessScoped
import javax.inject.{Inject, Named}
import org.extrasapache.myfaces.codi.examples.ebean.business.bo.person.PersonFacade
import org.extrasapache.myfaces.codi.examples.ebean.orm.person.Address

object PersConst {
  val MODE_CREATE = "create"
  val MODE_EDIT = "edit"
  val MODE_DELETE = "delete"
}

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
trait PersonDetailViewModel {

  @Inject
  var searchData: PersonListSearchModel = _

  @Inject
  var personFacade: PersonFacade = _

  var person: org.extrasapache.myfaces.codi.examples.ebean.orm.person.Person = _

  var address: Address = _

  var viewMode: String = PersConst.MODE_CREATE
}

/**
 * The controller logic which itself is also a page bean,
 * we use traits as decorators which decorate our model in
 */
@Named
@ViewAccessScoped
@serializable
class PersonDetailView extends PersonDetailViewModel {

  //an import of Person enables GO_DETA and GO_LIST
  import Person._

  def goCreate: java.lang.Class[_] = {
    viewMode = PersConst.MODE_CREATE
    person = personFacade.create

    GO_DETA
  }

  def goDeta: java.lang.Class[_] = {
    viewMode = PersConst.MODE_EDIT

    GO_DETA
  }

  def doDelete: java.lang.Class[_] = {
    personFacade.delete(person)
    GO_LIST
  }

  def doSave: java.lang.Class[_] = {
    personFacade.save(person)
    GO_LIST
  }

  def doCancel: java.lang.Class[_] = {
    personFacade.cancel(person)
    GO_LIST
  }

  def addAddress: java.lang.Class[_] = {
    address = personFacade.createAdr
    person.addresses.add(address)

    GO_DETA
  }

  def removeAddress: java.lang.Class[_] = {
    person.addresses.remove(address)

    GO_DETA
  }

}