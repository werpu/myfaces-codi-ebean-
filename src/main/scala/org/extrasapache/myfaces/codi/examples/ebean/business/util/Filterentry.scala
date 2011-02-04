package org.extrasapache.myfaces.codi.examples.ebean.business.util

import reflect.BeanProperty
/**
 *
 * @author Werner Punz (latest modification by $Author$)
 * @version $Revision$ $Date$
 */
@serializable
class FilterEntry  (
  @BeanProperty var name: String,
  @BeanProperty var value: java.lang.Object,
  @BeanProperty var entryType: java.lang.Class[_],
  @BeanProperty var opType: OpType
)

