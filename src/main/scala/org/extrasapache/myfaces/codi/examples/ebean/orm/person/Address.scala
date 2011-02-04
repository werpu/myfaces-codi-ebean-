package org.extrasapache.myfaces.codi.examples.ebean.orm.person

import javax.persistence._
import reflect.BeanProperty
import org.extrasapache.myfaces.codi.examples.ebean.support.data.StdEntity

/**
 *
 * @author Werner Punz (latest modification by $Author$)
 * @version $Revision$ $Date$
 */

@Entity
@Table(name = "o_address")
@serializable
class Address  extends StdEntity {

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

  @BeanProperty
  protected var addressType: java.lang.Integer = _

  @ManyToOne
  @BeanProperty
  protected var person: Person = _
}