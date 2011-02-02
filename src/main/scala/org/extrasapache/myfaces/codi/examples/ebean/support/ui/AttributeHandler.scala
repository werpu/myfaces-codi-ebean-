package org.extrasapache.myfaces.codi.examples.ebean.support.ui

import java.io.Serializable

//we alias the object to make the code tighter
//scala has its own object so we cannot rely on Object alone
import java.lang.{Object => Obj}


/**
 *
 * @author Werner Punz (latest modification by $Author$)
 * @version $Revision$ $Date$
 *
 * a trait which simplifys the attribute handling of a jsf component
 * by streamlinging the nested api and default handling
 */

trait AttributeHandler {
  def getAttr[T](key: Serializable, default: T): T = {
    val ret = getAttributes().get(key)
    if (ret != null) ret.asInstanceOf[T] else default
  }

  def setAttr[T](key: String, value: T) {
    getAttributes.put(key, value.asInstanceOf[Obj])
  }

  def getAttributes(): java.util.Map[String, Obj]
}

