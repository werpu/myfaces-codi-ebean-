package org.extrasapache.myfaces.codi.examples.ebean.support.data

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
  var id: java.lang.Long = _

  @Version
  var version: java.lang.Long = _
}