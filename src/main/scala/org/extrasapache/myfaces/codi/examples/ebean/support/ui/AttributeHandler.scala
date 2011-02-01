package org.extrasapache.myfaces.codi.examples.ebean.support.ui

import java.io.Serializable

/**
 *
 * @author Werner Punz (latest modification by $Author$)
 * @version $Revision$ $Date$
 */

trait AttributeHandler {
  def getAttr[T](key: Serializable, default: T): T = {
    val ret = getAttributes().get(key)
    if(ret != null) ret.asInstanceOf[T] else default
  }

  def setAttr[T](key: String, value: T) {
    getAttributes.put(key, value.asInstanceOf[java.lang.Object])
  }

  def getAttributes(): java.util.Map[String, java.lang.Object]
}

