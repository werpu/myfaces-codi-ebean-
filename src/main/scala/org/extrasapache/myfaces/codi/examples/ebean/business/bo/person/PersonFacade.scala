package org.extrasapache.myfaces.codi.examples.ebean.business.bo.person

import org.extrasapache.myfaces.codi.examples.ebean.business.bo.common.FacadeBase
import java.io.Serializable
import org.extrasapache.myfaces.codi.examples.ebean.orm.person.{Address, Person}
import org.extrasapache.myfaces.codi.examples.ebean.support.data.PaginationController
import org.extrasapache.myfaces.codi.examples.ebean.business.util.{OrderEntry, FilterEntry}
import javax.enterprise.context.Dependent
import javax.inject.Named
/*we make the overrides for list etc... because we do not need the scala collections here*/
import java.util._

/**
 *
 * @author Werner Punz (latest modification by $Author$)
 * @version $Revision$ $Date$
 */

@Named
@Dependent
class PersonFacade extends FacadeBase[Person] with Serializable {

  clazz = classOf[Person]

  def create: Person = new Person
  def createAdr: Address = new Address

  def delete(person: Person) = {
    val newPers = if (person.getId != null) {
      em.find(clazz, person.getId)
    } else {
      person
    }
    em.delete(newPers)
  }

  override def loadFromTo(from: Int, pageSize: Int, filter: List[FilterEntry], orderBy: List[OrderEntry]): PaginationController[Person] = {
    val query = em.createQuery(clazz).fetch("addresses")
    applyFilters(query, filter, orderBy)

    getPage(from, pageSize, query)
  }

  def cancel(person: Person) = {
    if (person.getId != null) {
      em.refresh(person)
      em.refreshMany(person, "addresses")
    }
  }

}