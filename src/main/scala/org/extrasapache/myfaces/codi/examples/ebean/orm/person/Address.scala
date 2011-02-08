package org.extrasapache.myfaces.codi.examples.ebean.orm.person

import javax.persistence._
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

   var street: String = _

   var houseNumber: String = _

   var house: String = _

   var door: String = _

   var zipCode: String = _

   var country: String = _

   var region: String = _

   var addressType: java.lang.Integer = _

  @ManyToOne
   var person: Person = _
}