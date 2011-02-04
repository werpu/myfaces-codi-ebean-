package org.extrasapache.myfaces.codi.examples.ebean.support.ui

import java.io.Serializable

//we alias the object to make the code tighter
//scala has its own object so we cannot rely on Object alone

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
    //note the scala compiler compiles anyref to java.lang.Object
    //in scala itself anyref is one level above Any which is the base
    //of everything scalawise
    getAttributes.put(key, value.asInstanceOf[AnyRef])
  }

  def getAttributes(): java.util.Map[String, AnyRef]
}

