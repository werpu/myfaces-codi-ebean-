package org.extrasapache.myfaces.codi.examples.ebean.orm.person

import javax.persistence._
import java.io.Serializable
import reflect.BeanProperty

/**
 *
 * @author Werner Punz (latest modification by $Author$)
 * @version $Revision$ $Date$
 */

@Entity
@Table(name = "o_address")
class Address extends Serializable {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @BeanProperty
  protected var id: java.lang.Long = _

  @BeanProperty
  protected var street: String = _

  @BeanProperty
  protected var houseNumber: String = _

  @BeanProperty
  protected var house: String = _

  @BeanProperty
  protected var door: String = _

  @BeanProperty
  protected var zipCode: String = _

  @BeanProperty
  protected var country: String = _

  @BeanProperty
  protected var region: String = _

  @Version
  @BeanProperty
  protected var version: java.lang.Long = _

  @BeanProperty
  protected var addressType: Integer = _

  @ManyToOne
  @BeanProperty
  protected var person: Person = _
}