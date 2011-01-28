package org.extrasapache.myfaces.codi.examples.ebean.orm.person

import javax.persistence._
import java.util.LinkedList
import org.extrasapache.myfaces.codi.examples.ebean.orm.security.User
import java.io.Serializable
import reflect.BeanProperty


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
class Person extends Serializable {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @BeanProperty
  protected var id: java.lang.Long = _

  @BeanProperty
  protected var firstName: String = _

  @BeanProperty
  protected var lastName: String = _

  @BeanProperty
  protected var nickName: String = _

  @Version
  @BeanProperty
  protected var version: java.lang.Long = _

  @OneToMany
  @BeanProperty
  protected var infoEntries: java.util.Set[Entry] = _

  @OneToMany(cascade = Array(CascadeType.ALL))
  @OrderBy(value = "addressType asc")
  @BeanProperty
  protected var addresses: java.util.List[Address] = new java.util.LinkedList[Address]

  @OneToMany(fetch = FetchType.LAZY)
  @BeanProperty
  protected var userData: java.util.List[User] = _


  //def getId(): Long = { this.id }
  //def setId(newId:Long) { this.id = _  }

}