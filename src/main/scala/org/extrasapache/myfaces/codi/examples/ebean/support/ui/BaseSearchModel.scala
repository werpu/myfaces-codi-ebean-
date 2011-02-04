package org.extrasapache.myfaces.codi.examples.ebean.support.ui

import org.extrasapache.myfaces.codi.examples.ebean.business.util.{OpType, FilterEntry}
import collection.JavaConversions._
import reflect.BeanProperty
import reflect.BooleanBeanProperty

/*explicit import to overwrite the scala defaults*/

import java.util._

/**
 *
 * @author Werner Punz (latest modification by $Author$)
 * @version $Revision$ $Date$
 */
@serializable
class BaseSearchModel extends MapDelegate[String, java.lang.Object]  {

  @BeanProperty
  var from: Int = 0
  @BeanProperty
  var pageSize: Int = 10
  @BooleanBeanProperty
  var searchPerformed: Boolean = false

  def toFilterList: List[FilterEntry] = {
    searchPerformed = true

    val iter: collection.mutable.Set[String] = searchMap.keySet
    iter.foldLeft(new LinkedList[FilterEntry]) {
      (coll, item) => {
        coll.add(transformStrToFilter(item))
        coll
      }
    }
  }

  protected def transformStrToFilter(strAttr: String): FilterEntry = {
    if (searchMap.get(strAttr) != null &&
      !searchMap.get(strAttr).asInstanceOf[String].isEmpty) {
      new FilterEntry(strAttr, searchMap.get(strAttr).asInstanceOf[String] + "%", classOf[String], OpType.LIKE)
    } else {
      null
    }
  }
}