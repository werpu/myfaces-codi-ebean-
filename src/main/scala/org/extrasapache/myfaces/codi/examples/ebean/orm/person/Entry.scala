package org.extrasapache.myfaces.codi.examples.ebean.orm.person

import java.io.Serializable
import javax.persistence._
import reflect.BeanProperty

/**
 *
 * @author Werner Punz (latest modification by $Author$)
 * @version $Revision$ $Date$
 */

@Entity
@Table(name = "o_entry")
class Entry extends Serializable {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @BeanProperty
  protected var id: java.lang.Long = _

  @BeanProperty
  protected var title: String = ""

  @BeanProperty
  protected var shortDesc: String = ""

  @BeanProperty
  protected var longDesc: String = ""

  @Version
  @BeanProperty
  protected var version: java.lang.Long  = _

  @ManyToOne
  @BeanProperty
  protected var poster: Person = _
}