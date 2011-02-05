package org.extrasapache.myfaces.codi.examples.ebean.support.data

import reflect.BeanProperty
import java.util.concurrent.Future
import com.avaje.ebean.{Page, PagingList}

import scala.math._
import java.util._

/**
 *
 * @author Werner Punz (latest modification by $Author$)
 * @version $Revision$ $Date$
 *
 * This is our pagination controller, not most of the times
 * we can get away by using the Int -> int(java) autoboxing
 * but since scala does not know any Integer -> int autoboxing
 * we cannot get away the other way
 *
 * Also a null value enforces integer to be used
 */

class PaginationController[T](var _delegate: PagingList[T]) {
  //var _delegate: PagingList[T] = _
  @BeanProperty
  var lastPageAccessed: Int = 0
  var pagingWindowSize: Int = 8

  def refresh() = _delegate.refresh

  def setFetchAhead(b: Boolean) = _delegate.setFetchAhead(b)

  def getFutureRowCount: Future[java.lang.Integer] = _delegate.getFutureRowCount

  def getAsList: java.util.List[T] = _delegate.getAsList

  def getPageSize: Int = _delegate.getPageSize

  def getTotalRowCount: Int = _delegate.getTotalRowCount

  def getTotalPageCount: Int = _delegate.getTotalPageCount

  def getPage(i: Int): Page[T] = {
    lastPageAccessed = i
    _delegate.getPage(i)
  }

  def fetchPage: Page[T] = {
    _delegate.getPage(lastPageAccessed)
  }

  def isFirstPage: Boolean = lastPageAccessed == 0

  def isLastPage: Boolean = lastPageAccessed >= getTotalPageCount

  def isInFirstWindow: Boolean = (getPageSize == 0) || (lastPageAccessed < pagingWindowSize)

  def hasPreviousPagesWindow: Boolean = false

  def getFirstPageIdx: Int = 0

  def getLastPageIdx: Int = _delegate.getTotalPageCount - 1

  def getPreviousPage: Int = {
    val ret = max(0, lastPageAccessed - 1)
    ret
  }



  def getNextWindowIdx: java.lang.Integer = {
    if (isInLastWindow)
      null
    else
      (floor(lastPageAccessed.doubleValue / pagingWindowSize.doubleValue).intValue + 1) * pagingWindowSize
  }

  def getPreviousWindowIdx: java.lang.Integer = {
    if (isInFirstWindow) null
    else {
      (floor(lastPageAccessed.doubleValue / pagingWindowSize.doubleValue).intValue - 1) * pagingWindowSize
    }
  }

  def isInLastWindow: Boolean = {
    (getPageSize == 0) || (lastPageAccessed >= getTotalPageCount - pagingWindowSize)
  }

  def fetchPagesWindow: List[Int] = {
    val ret = new ArrayList[Int](getPageSize)
    if (getTotalPageCount != 1) {
      val pagingWindowPos = floor(lastPageAccessed.doubleValue / pagingWindowSize.doubleValue).intValue
      (pagingWindowPos until getTotalPageCount).foreach {
        ret.add(_)
      }
    }
    ret
  }

  def getPageAsList: List[T] = {
    fetchPage.getList
  }

  def getNextPage: Int = {
    max(0, min(lastPageAccessed, getTotalPageCount - 1))
  }

}