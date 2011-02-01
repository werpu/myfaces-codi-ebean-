package org.extrasapache.myfaces.codi.examples.ebean.view.person

import org.apache.myfaces.extensions.cdi.core.api.scope.conversation.ViewAccessScoped
import org.apache.myfaces.extensions.cdi.core.api.config.view.ViewConfig
import reflect.BeanProperty
import java.io.Serializable
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
trait PersonDetailViewModel  {

  @Inject
  @BeanProperty
  var searchData: PersonListSearchModel = _

  @Inject
  var personFacade: PersonFacade = _

  @BeanProperty
  var person: org.extrasapache.myfaces.codi.examples.ebean.orm.person.Person = _

  @BeanProperty
  var address: Address = _

  @BeanProperty
  var viewMode: String = PersConst.MODE_CREATE
}

/**
 * The controller logic which itself is also a page bean,
 * we use traits as decorators which decorate our model in
 */
@Named
@ViewAccessScoped
class PersonDetailView extends PersonDetailViewModel with Serializable {

  def goCreate: java.lang.Class[_ <: ViewConfig] = {
    viewMode = PersConst.MODE_CREATE
    person = personFacade.create

    classOf[Person.PersonDetail]
  }

  def goDeta: java.lang.Class[_ <: ViewConfig] = {
    viewMode = PersConst.MODE_EDIT
    classOf[Person.PersonDetail]
  }

  def doDelete: java.lang.Class[_ <: ViewConfig] = {
    personFacade.delete(person)
    classOf[Person.PersonList]
  }

  def doSave: java.lang.Class[_ <: ViewConfig] = {
    personFacade.save(person)
    classOf[Person.PersonList]
  }

  def doCancel: java.lang.Class[_ <: ViewConfig] = {
    personFacade.cancel(person)
    classOf[Person.PersonList]
  }

  def addAddress: java.lang.Class[_ <: ViewConfig] = {
    address = personFacade.createAdr
    person.getAddresses.add(address)

    classOf[Person.PersonDetail]
  }

  def removeAddress: java.lang.Class[_ <: ViewConfig] = {
    person.getAddresses.remove(address)

    classOf[Person.PersonDetail]
  }

}