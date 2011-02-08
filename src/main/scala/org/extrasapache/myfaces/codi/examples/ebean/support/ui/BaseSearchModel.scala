package org.extrasapache.myfaces.codi.examples.ebean.support.ui

import org.extrasapache.myfaces.codi.examples.ebean.business.util.{OpType, FilterEntry}

import reflect.BooleanBeanProperty

/*explicit import to overwrite the scala defaults*/

import java.util._
import collection.JavaConversions._

/**
 *
 * @author Werner Punz (latest modification by $Author$)
 * @version $Revision$ $Date$
 */
@serializable
class BaseSearchModel extends MapDelegate[String, AnyRef]  {
  //note the scala compiler compiles anyref to java.lang.Object
  //in scala itself anyref is one level above Any which is the base
  //of everything scalawise

  var from: Int = 0
  var pageSize: Int = 10
  @BooleanBeanProperty
  var searchPerformed: Boolean = false

  def toFilterList: List[FilterEntry] = {
    searchPerformed = true

    val iter: collection.mutable.Set[String] = searchMap.keySet
    //val res: List[FilterEntry] = for(item <- iter) yield { transformStrToFilter(_) }
    //res
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