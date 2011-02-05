package org.extrasapache.myfaces.codi.examples.ebean.support.data

import reflect.BeanProperty
import javax.persistence.{Version, GenerationType, GeneratedValue, Id}
/**
 *
 * @author Werner Punz (latest modification by $Author$)
 * @version $Revision$ $Date$
 *
 * A trait defined for all classes which have a
 * property id
 */
trait StdEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @BeanProperty
  protected var id: java.lang.Long = _


 /* def getId() : java.lang.Long = {
      id
  }

  def setId(theId: java.lang.Long) = id = theId
   */
  @Version
  @BeanProperty
  protected var version: java.lang.Long = _
}