package org.extrasapache.myfaces.codi.examples.ebean.orm.security

import javax.persistence._

import org.extrasapache.myfaces.codi.examples.ebean.orm.person.Person
import org.extrasapache.myfaces.codi.examples.ebean.support.data.StdEntity

/**
 *
 * @author Werner Punz (latest modification by $Author$)
 * @version $Revision$ $Date$
 */
@Entity
@serializable
class User extends StdEntity {

  @ManyToMany(fetch = FetchType.EAGER, cascade = Array(CascadeType.MERGE, CascadeType.REFRESH))
   var groups: java.util.Set[SecGroup] = _

  @ManyToOne(cascade = Array(CascadeType.MERGE, CascadeType.REFRESH))
   var person: Person = _

   var userName: String = _

   var password: String = _
}