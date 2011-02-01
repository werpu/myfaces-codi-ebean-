package org.extrasapache.myfaces.codi.examples.ebean.orm.person

import javax.persistence._
import org.extrasapache.myfaces.codi.examples.ebean.orm.security.User
import java.io.Serializable
import reflect.BeanProperty
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

@Entity
@Table(name = "o_person")
class Person extends Serializable with StdEntity  {


  @BeanProperty
  protected var firstName: String = _

  @BeanProperty
  protected var lastName: String = _

  @BeanProperty
  protected var nickName: String = _

  @OneToMany
  @BeanProperty
  protected var infoEntries: Set[Entry] = _

  @OneToMany(cascade = Array(CascadeType.ALL))
  @OrderBy(value = "addressType asc")
  @BeanProperty
  protected var addresses: List[Address] = new LinkedList[Address]

  @OneToMany(fetch = FetchType.LAZY)
  @BeanProperty
  protected var userData: List[User] = _


}