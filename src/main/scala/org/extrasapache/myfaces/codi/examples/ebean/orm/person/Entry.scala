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
@Table(name = "o_entry")
@serializable
class Entry  extends StdEntity  {

  @BeanProperty
  protected var title: String = ""

  @BeanProperty
  protected var shortDesc: String = ""

  @BeanProperty
  protected var longDesc: String = ""

  @ManyToOne
  @BeanProperty
  protected var poster: Person = _
}