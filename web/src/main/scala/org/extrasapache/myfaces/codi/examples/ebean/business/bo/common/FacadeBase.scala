package org.extrasapache.myfaces.codi.examples.ebean.business.bo.common

import javax.inject.Inject

import com.avaje.ebean.{EbeanServer, Query}
import org.extrasapache.myfaces.codi.examples.ebean.support.data.{PaginationController, StdEntity}
import org.extrasapache.myfaces.codi.examples.ebean.business.util.{OrderEntry, FilterEntry}
import java.util._
import com.avaje.ebean.annotation.Transactional
import collection.JavaConversions._

/**
 *
 * @author Werner Punz (latest modification by $Author$)
 * @version $Revision$ $Date$
 */

class FacadeBase[T <: StdEntity] {

  /**
   * for convenience reasons we use the scala
   * accessors here, namely clazz() for reading
   * and clazz_$eq for writing
   */
  var clazz: java.lang.Class[T] = _

  @Inject
  var em: EbeanServer = _

  def loadById(identifier: AnyRef): T = {
    em.find(clazz, identifier).asInstanceOf[T]
  }

  def getPage(from: Int, pageSize: Int, query: Query[T]): PaginationController[T] = {
    query.setFirstRow(from)
    new PaginationController[T](query.findPagingList(pageSize));
  }

  def loadAll(): List[T] = {
    val query = em.createQuery(clazz)
    query.findList()
  }

  def loadFromTo(from: Int, pageSize: Int): PaginationController[T] = {
    def query = em.createQuery(clazz);
    getPage(from, pageSize, query);
  }

  def loadFromTo(from: Int, pageSize: Int, filter: List[FilterEntry], orderBy: List[OrderEntry]): PaginationController[T] = {
    def query = em.createQuery(clazz);
    applyFilters(query, filter, orderBy);
    getPage(from, pageSize, query);
  }

  @Transactional
  def save(entry: T) {
    em.save(entry)
  }

  def delete(entry: T) = {
    val newPers = if (entry.id != null) {
      em.find(clazz, entry.id)
    } else {
      entry
    }
    em.delete(newPers)
  }

  def cancel(entry: T) {
    if (entry.id != null) em.refresh(entry)
  }

  protected def applyFilters(query: Query[T], filterList: List[FilterEntry], orderBy: List[OrderEntry]) {
    var queryBuilder = query.where();

    /*we fetch the optype enum values directly*/
    import org.extrasapache.myfaces.codi.examples.ebean.business.util.OpType._

    //ebeans internally maps the values to prepared statemes
    //so doing it this way is save

    //Also the queryBuilder has as default concatenation op an
    //for or you have to use separate subexpressions
    //either way this is way superior to what jpa is doing
    //which is too low level

    for (entry <- filterList if entry != null) {
      entry.opType match {

        case GTE =>
          queryBuilder = queryBuilder.ge(entry.name, entry.value)

        case GT =>
          queryBuilder = queryBuilder.gt(entry.name, entry.value)

        case EQ =>
          queryBuilder = queryBuilder.eq(entry.name, entry.value)

        case LIKE =>
          queryBuilder = queryBuilder.like(entry.name, entry.value.asInstanceOf[String])

        case LT =>
          queryBuilder = queryBuilder.lt(entry.name, entry.value)
        case LTE =>
          queryBuilder = queryBuilder.le(entry.name, entry.value)
      }
    }
    if (orderBy != null) {
      for (entry <- asScalaBuffer[OrderEntry](orderBy) if entry != null) {
        queryBuilder.orderBy(entry.name)
      }
    }

  }

}