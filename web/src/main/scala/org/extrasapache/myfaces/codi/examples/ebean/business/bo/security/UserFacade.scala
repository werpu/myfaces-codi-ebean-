package org.extrasapache.myfaces.codi.examples.ebean.business.bo.security

import org.extrasapache.myfaces.codi.examples.ebean.business.bo.common.FacadeBase
import org.extrasapache.myfaces.codi.examples.ebean.orm.security.User
import org.extrasapache.myfaces.codi.examples.ebean.business.bo.person.PersonFacade
import org.apache.myfaces.extensions.cdi.jpa.api.Transactional
import org.extrasapache.myfaces.codi.examples.ebean.business.util.{OrderEntry, FilterEntry}
import org.extrasapache.myfaces.codi.examples.ebean.support.data.PaginationController

import java.util._
import javax.enterprise.context.Dependent
import javax.inject.{Named, Inject}

/**
 *
 * @author Werner Punz (latest modification by $Author$)
 * @version $Revision$ $Date$
 */

@Named
@Dependent
@serializable
class UserFacade extends FacadeBase[User] {

  @Inject
  var personBo: PersonFacade = _
  clazz = classOf[User]

  def createUser: User = {
    val ret = new User()
    ret.person = personBo.create
    ret
  }

  @Transactional
  def deleteUser(user: User) {
    if (user.id != null) {
      em.delete(user);
    }
  }

  //TODO add search criteria for the list search

  override def loadFromTo(from: Int, pageSize: Int, filter: List[FilterEntry], orderBy: List[OrderEntry]): PaginationController[User] = {
    val query = em.createQuery(clazz)
    query.fetch("person").fetch("groups")
    applyFilters(query, filter, orderBy)
    getPage(from, pageSize, query)
  }

  override def cancel(t: User) {
    if (t.id != null) {
      em.refresh(t)
      em.refreshMany(t, "groups")
    }
  }
}