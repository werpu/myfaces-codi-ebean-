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
    if (!base.isInstanceOf[scala.ScalaObject]) {
      //no scala object we forward it to another el
      //resolver
      null
    } else {

      //TODO we need a lean way to identify a scala class upfront
      //and it it is none we have to delegate further on

      //We have to iterate over all properties of the base and return it
      //as feature descriptor instance
      val methods: Array[Method] = base.getClass.getMethods
      var props = HashSet[String]
      for (prop <- props) {
        //if prop.name == *._eq then setter remove name
        //fetch additonal type info
        //and store it, also store its name for the getter

        //else if prop returns something worthwhile and has no params
        //then it is a getter store its name and type info and also in the props list

      }
    }

  }

  /**
   * backported from myfaces
   */
  private def makeDescriptor(name: String, description: String,
                             elResolverType: Class[_]): FeatureDescriptor = {
    val fd = new FeatureDescriptor();
    fd.setValue(ELResolver.RESOLVABLE_AT_DESIGN_TIME, true);
    fd.setValue(ELResolver.TYPE, elResolverType);
    fd.setName(name);
    fd.setDisplayName(name);
    fd.setShortDescription(description);
    fd.setExpert(false);
    fd.setHidden(false);
    fd.setPreferred(true);
    fd;
  }

  def getType(elContext: ELContext, base: AnyRef, prop: AnyRef): Class[_] = {
    null
  }

  def getValue(elContext: ELContext, base: AnyRef, prop: AnyRef): AnyRef = {
    null
  }

  def isReadOnly(elContext: ELContext, base: AnyRef, prop: AnyRef): Boolean = {
    true
  }

  def setValue(elContext: ELContext, base: AnyRef, prop: AnyRef, value: AnyRef) {

  }

  def invoke(context: ELContext, base: AnyRef, method: AnyRef, paramTypes: Array[Class[_]], params: Array[AnyRef]): AnyRef = {
    null
  }

}