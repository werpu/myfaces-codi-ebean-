package org.extrasapache.myfaces.codi.examples.ebean.orm.security

import java.io.Serializable
import javax.persistence._

import reflect.BeanProperty
import org.extrasapache.myfaces.codi.examples.ebean.orm.person.Person
import org.extrasapache.myfaces.codi.examples.ebean.support.data.StdEntity

/**
 *
 * @author Werner Punz (latest modification by $Author$)
 * @version $Revision$ $Date$
 */
@Entity
class User extends Serializable with StdEntity {

  @ManyToMany(fetch = FetchType.EAGER, cascade = Array(CascadeType.MERGE, CascadeType.REFRESH))
  @BeanProperty
  protected var groups: java.util.Set[SecGroup] = _

  @ManyToOne(cascade = Array(CascadeType.MERGE, CascadeType.REFRESH))
  @BeanProperty
  protected var person: Person = _

  @BeanProperty
  protected var userName: String = _

  @BeanProperty
  protected var password: String = _
}