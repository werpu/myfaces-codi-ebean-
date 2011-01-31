package org.extrasapache.myfaces.codi.examples.ebean.business.util

import reflect.{BooleanBeanProperty, BeanProperty}

/**
 *
 * @author Werner Punz (latest modification by $Author$)
 * @version $Revision$ $Date$
 */

class OrderEntry {
  @BeanProperty
  var name: String = null
  @BooleanBeanProperty
  var asc: Boolean = false
}