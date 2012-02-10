package org.extrasapache.myfaces.codi.examples.ebean.business.bo.person

import org.extrasapache.myfaces.codi.examples.ebean.business.bo.common.FacadeBase
import scala.serializable
import org.extrasapache.myfaces.codi.examples.ebean.orm.person.{Address, Person}
import org.extrasapache.myfaces.codi.examples.ebean.support.data.PaginationController
import org.extrasapache.myfaces.codi.examples.ebean.business.util.{OrderEntry, FilterEntry}
import javax.enterprise.context.Dependent
import javax.inject.Named
import org.extrasapache.myfaces.codi.examples.ebean.orm.security.User

/*we make the overrides for list etc... because we do not need the scala collections here*/

import java.util._

/**
 *
 * @author Werner Punz (latest modification by $Author$)
 * @version $Revision$ $Date$
 */

@Named
@Dependent
@serializable
class PersonFacade extends FacadeBase[Person] {

  clazz = classOf[Person]

  def create: Person = new Person
  def createUser: User = new User
  def createAdr: Address = new Address

  override def loadFromTo(from: Int, pageSize: Int, filter: List[FilterEntry], orderBy: List[OrderEntry]): PaginationController[Person] = {
    val query = em.createQuery(clazz).fetch("addresses")
    applyFilters(query, filter, orderBy)

    getPage(from, pageSize, query)
  }

  def loadFromToName(from: Int, pageSize: Int, anyName: String, orderBy: List[OrderEntry]): PaginationController[Person] = {
    val query = em.createNamedQuery(clazz, "allNames")
    query.setParameter("name", anyName)

    getPage(from, pageSize, query)
  }

  override def cancel(person: Person) = {
    if (person.id != null) {
      em.refresh(person)
      em.refreshMany(person, "addresses")
    }
  }

}