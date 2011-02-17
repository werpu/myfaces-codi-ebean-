package org.extrasapache.myfaces.codi.examples.ebean.orm.person

import javax.persistence._
import org.extrasapache.myfaces.codi.examples.ebean.orm.security.User
import org.extrasapache.myfaces.codi.examples.ebean.support.data.StdEntity

import java.util._

/**
 *
 * @author Werner Punz (latest modification by $Author$)
 * @version $Revision$ $Date$
 *
 * Note we are using Scala for those objects t
 *
 */

@NamedQuery(name="allNames", query = "find * where firstName like :name or lastName like :name")
@Entity
@Table(name = "o_person")
@serializable
class Person extends StdEntity  {

   var firstName: String = _

   var lastName: String = _

   var nickName: String = _

  @OneToMany
   var infoEntries: Set[Entry] = _

  @OneToMany(cascade = Array(CascadeType.ALL))
  @OrderBy(value = "addressType asc")
   var addresses: List[Address] = new LinkedList[Address]

  @OneToMany(fetch = FetchType.LAZY)
   var userData: List[User] = _

}