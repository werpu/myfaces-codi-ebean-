package org.extrasapache.myfaces.codi.examples.ebean.business.util

/**
 *
 * @author Werner Punz (latest modification by $Author$)
 * @version $Revision$ $Date$
 */
@serializable
class FilterEntry  (
  var name: String,
  var value: AnyRef,
  var entryType: java.lang.Class[_],
  var opType: OpType
)

