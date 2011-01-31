package org.extrasapache.myfaces.codi.examples.ebean.support.ui

import java.io.Serializable

import org.extrasapache.myfaces.codi.examples.ebean.business.util.{OpType, FilterEntry}
import collection.mutable._
import collection.JavaConversions._
import reflect.BeanProperty
import reflect.BooleanBeanProperty


/**
 *
 * @author Werner Punz (latest modification by $Author$)
 * @version $Revision$ $Date$
 */

class BaseSearchModel extends MapDelegate[String, java.lang.Object] with Serializable {

  @BeanProperty
  var from: Int = 0
  @BeanProperty
  var pageSize: Int = 10
  @BooleanBeanProperty
  var searchPerformed: Boolean = false

  def toFilterList: java.util.List[FilterEntry] = {
    val iter: collection.mutable.Set[String] = searchMap.keySet
    val res: java.util.List[FilterEntry] = new java.util.LinkedList[FilterEntry]

    iter.foreach { (item) => res.add( transformStrToFilter(item) ) }
    searchPerformed = true

    res
  }

  protected def transformStrToFilter(strAttr: String): FilterEntry = {
    var ret: FilterEntry = null
    ret = if (searchMap.get(strAttr) != null &&
      !searchMap.get(strAttr).asInstanceOf[String].isEmpty) {
      new FilterEntry(strAttr, searchMap.get(strAttr).asInstanceOf[String] + "%", classOf[String], OpType.LIKE)
    } else {
      null
    }

    ret
  }
}