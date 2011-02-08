package org.extrasapache.myfaces.codi.examples.ebean.view.jsf

import javax.el.{ELContext, ELResolver}
import java.beans.FeatureDescriptor
import java.lang.reflect.Method

import collection.JavaConversions._
import collection.mutable.HashSet

/**
 *
 * @author Werner Punz (latest modification by $Author$)
 * @version $Revision$ $Date$
 *
 * A custom el resolver which needs to do following things
 * call the getters and setters of scala according to the scala convention of
 * attr() and attr_eq$(value)
 *
 * transform the incoming or outgoing lists, maps and arrays
 * from the scala maps an arrays to their java representations
 * (if needed, since the el works with introspection alone
 * it might work without the conversion)
 *
 * delegate the rest to the other el resolvers in the chain
 */

class ScalaELResolver extends ELResolver {

  def getCommonPropertyType(elContext: ELContext, o: AnyRef): Class[_] = {
    o.getClass
  }

  def getFeatureDescriptors(elContext: ELContext, base: AnyRef): java.util.Iterator[FeatureDescriptor] = {

    //TODO find the proper condition statement

    if (base.isInstanceOf[scala.ScalaObject] ) {
      //no scala object we forward it to another el
      //resolver
      null
    } else {
      val ret = new HashSet[FeatureDescriptor]
      //TODO we need a lean way to identify a scala class upfront
      //and it it is none we have to delegate further on

      //We have to iterate over all properties of the base and return it
      //as feature descriptor instance
      val methods: Array[Method] = base.getClass().getMethods
      val alreadyProcessed = new HashSet[String]
      for (method <- methods if(!alreadyProcessed.contains(method.getName.replaceAll("\\_eq\\$","")))) {
        //note every attribute of a scala object
        //is set as protected or private
        //with two encapsulating functions
        var methodName: String = method.getName.replaceAll("\\_eq\\$","")
        alreadyProcessed += methodName
        //TODO we probably have to work the return values in
        ret += makeDescriptor(methodName, methodName, base.getClass)
      }

      asJavaSet[FeatureDescriptor](ret).iterator
    }

  }

  /**
   * backported from myfaces
   */
  private def makeDescriptor(name: String, description: String,
                             objectType: Class[_]): FeatureDescriptor = {
    val fd = new FeatureDescriptor()
    fd.setValue(ELResolver.RESOLVABLE_AT_DESIGN_TIME, true)
    fd.setValue(ELResolver.TYPE, objectType)
    fd.setName(name)
    fd.setDisplayName(name)
    fd.setShortDescription(description)
    fd.setExpert(false)
    fd.setHidden(false)
    fd.setPreferred(true)
    fd
  }

  def getType(elContext: ELContext, base: AnyRef, prop: AnyRef): Class[_] = {
    if(base != null && !base.isInstanceOf[scala.ScalaObject]) null
    else if(prop != null && !prop.isInstanceOf[scala.ScalaObject]) null
    else if(base == null && prop != null) prop.getClass //TODO this should not terminate
    else if (base != null && prop == null) base.getClass


    null
  }

  def getValue(elContext: ELContext, base: AnyRef, prop: AnyRef): AnyRef = {
    if(!(base != null && base.isInstanceOf[scala.ScalaObject])) {
      null
    } else {
      val m: Method = base.getClass.getMethod(prop.asInstanceOf[String])
      if(m != null) {
        m.invoke(base, null)
      }
    }
    null
  }

  def isReadOnly(elContext: ELContext, base: AnyRef, prop: AnyRef): Boolean = {
    true
  }

  def setValue(elContext: ELContext, base: AnyRef, prop: AnyRef, value: AnyRef) {

  }

  //override def invoke(context: ELContext, base: AnyRef, method: AnyRef, paramTypes: Array[Class[_]], params: Array[AnyRef]): AnyRef = {
  //  null
  //}

}