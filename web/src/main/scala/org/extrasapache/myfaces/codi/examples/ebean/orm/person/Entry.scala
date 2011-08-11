package org.extrasapache.myfaces.codi.examples.ebean.orm.person

import javax.persistence._
import org.extrasapache.myfaces.codi.examples.ebean.support.data.StdEntity

/**
 *
 * @author Werner Punz (latest modification by $Author$)
 * @version $Revision$ $Date$
 */

@Entity
@Table(name = "o_entry")
@serializable
class Entry extends StdEntity {

   var title: String = ""

   var shortDesc: String = ""

   var longDesc: String = ""

  @ManyToOne
   var poster: Person = _
}