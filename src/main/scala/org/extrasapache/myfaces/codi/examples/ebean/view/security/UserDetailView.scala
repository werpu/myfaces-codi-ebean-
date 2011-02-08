package org.extrasapache.myfaces.codi.examples.ebean.view.security

import org.extrasapache.myfaces.codi.examples.ebean.support.data.PaginationController
import org.extrasapache.myfaces.codi.examples.ebean.business.bo.security.{GroupFacade, UserFacade}
import org.extrasapache.myfaces.codi.examples.ebean.business.bo.person.PersonFacade
import org.extrasapache.myfaces.codi.examples.ebean.view.person.{Person, PersonListSearchModel}
import org.extrasapache.myfaces.codi.examples.ebean.support.ui.ShuttleController
import org.extrasapache.myfaces.codi.examples.ebean.orm.security._
import org.extrasapache.myfaces.codi.examples.ebean.orm.person.{Address, Person}
import javax.inject.{Named, Inject}
import org.apache.myfaces.extensions.cdi.core.api.scope.conversation.ViewAccessScoped
import javax.annotation.PostConstruct
import collection.JavaConversions._
import collection.mutable.{ArrayBuffer, Buffer, Set}
import javax.faces.model.SelectItem
/**
 *
 * @author Werner Punz (latest modification by $Author$)
 * @version $Revision$ $Date$
 */

trait UserDetailViewModel {

  var pageMode: String = _
  var model: User = _
  var address: Address = _
  var person: Person.type = _
  var personHistory: Person = _
  var newPerson: Boolean = false

}

trait UserDetailControllers {
  //form controllers
  @Inject
  var shuttleController: ShuttleController = _

  @Inject
  var personSearchData: PersonListSearchModel = _

  var personListModel: PaginationController[User] = _

}

trait UserDetailFacades {
  //business facades
  @Inject
  var bo: UserFacade = _

  @Inject
  var personBo: PersonFacade = _

  @Inject
  var groupBo: GroupFacade = _
}

@Named
@ViewAccessScoped
@serializable
class UserDetailView extends UserDetailViewModel with UserDetailFacades with UserDetailControllers {

  /*static navigational imports*/
  import Security._
  
  @PostConstruct
  def postInit = {}

  private def initShuttle() {
    val groups: Buffer[SecGroup] = groupBo.loadAll
    //val selectItemsRight = new ArrayBuffer[SelectItem]
    val selectItemsRight, selectItemsLeft = new ArrayBuffer[SelectItem]
    val userGroups: Set[SecGroup] = model.groups

    val res = groups.span(group => userGroups.contains(group))
    //TODO replace this with a span
    groups.foreach(group => {
      //TODO we have to add an identifier remapping service but for now this suffices
      if (userGroups.contains(group)) {
        selectItemsLeft.add(new SelectItem(group.id.toString, group.groupName))
      } else {
        selectItemsRight.add(new SelectItem(group.id.toString, group.groupName))
      }
    })
    shuttleController.setLeft(asJavaList[SelectItem](selectItemsLeft))
    shuttleController.setRight(asJavaList[SelectItem](selectItemsRight))
  }

  def doSave: Class[_] = {
    model.groups.clear
    model.groups.addAll(groupBo.loadByIdsStr(shuttleController.getSelectionsLeft))
    bo.save(model);

    null;
  }

  def goNewPerson: Class[_] = {
    personHistory = model.person
    model.person = personBo.create

    null
  }

  def goExistingPerson: Class[_] = {
    model.person = personHistory
    personHistory = null

    null
  }

  def goDeta: Class[_] = {
    initShuttle
    GO_USER_DETA
  }

  def goCreate: Class[_] = {
    model = bo.createUser
    initShuttle
    GO_USER_DETA
  }

  def selectPerson: Class[_] = {
    null
  }

  def addAddress: Class[_] = {
    address = personBo.createAdr
    model.person.addresses.add(address)

    GO_USER_DETA
  }

  def removeAddress: Class[_] = {
    model.person.addresses.remove(address)

    GO_USER_DETA
  }

}