package org.extrasapache.myfaces.codi.examples.ebean.business.util

import reflect.BeanProperty
import java.io.Serializable

/**
 *
 * @author Werner Punz (latest modification by $Author$)
 * @version $Revision$ $Date$
 */

class FilterEntry (
  @BeanProperty var name: String,
  @BeanProperty var value: Object,
  @BeanProperty var entryType: java.lang.Class[_ <: java.lang.Object],
  @BeanProperty var opType: OpType
) extends Serializable

