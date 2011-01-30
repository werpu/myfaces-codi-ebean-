package org.extrasapache.myfaces.codi.examples.ebean.support.ui

import javax.enterprise.context.Dependent
import javax.faces.model.SelectItem
import java.io.Serializable
import reflect.BeanProperty
import collection.mutable.{ArrayBuffer, Buffer, LinkedHashMap}
import collection.JavaConversions._
import scala.math._
import java.util.Collections

/*see http://www.scala-lang.org/docu/files/collections-api/collections.html
*/

/**
 *
 * @author Werner Punz (latest modification by $Author$)
 * @version $Revision$ $Date$
 *
 *
 * A scala version of our shuttle controller
 *
 * ok scrapping the work on it again, the java
 * version is not that much more locs
 * so it does not make sense
 * to roll it into scala
 *
 */

@Dependent
class ShuttleController extends Serializable {
  private var _left: LinkedHashMap[String, SelectItem] = LinkedHashMap[String, SelectItem]()
  private var _right: LinkedHashMap[String, SelectItem] = LinkedHashMap[String, SelectItem]()

  private var _leftIdx: Buffer[String] = ArrayBuffer[String]()
  private var _rightIdx: Buffer[String] = ArrayBuffer[String]()

  @BeanProperty
  protected var selectionsLeft: java.util.List[String] = ArrayBuffer[String]()

  @BeanProperty
  protected var selectionsRight: java.util.List[String] = ArrayBuffer[String]()

  def shuttleTopLeft: String = {
    val res = _reorgMap(_shuttleTop, _leftIdx, selectionsLeft, _left)
    _left = res._1
    _leftIdx = res._2

    null
  }

  def shuttleBottomLeft: String = {
    val res = _reorgMap(_shuttleBottom, _leftIdx, selectionsLeft, _left)
    _left = res._1
    _leftIdx = res._2

    null
  }

  def shuttleTopRight: String = {
    val res = _reorgMap(_shuttleTop, _rightIdx, selectionsRight, _right)
    _right = res._1
    _rightIdx = res._2


    null
  }

  def shuttleBottomRight: String = {
    val res = _reorgMap(_shuttleBottom, _rightIdx, selectionsRight, _right)
    _right = res._1
    _rightIdx = res._2

    null
  }

  def shuttleUpLeft: String = {
    _leftIdx = _membersUp(_leftIdx, selectionsLeft)
    _left = _sortMap(_leftIdx, _left)

    null
  }

  def shuttleUpRight: String = {
    println("shuttleuprigith")
    _rightIdx = _membersUp(_rightIdx, selectionsRight)
    _right = _sortMap(_rightIdx, _right)

    null
  }

  def shuttleDownLeft: String = {
    _leftIdx = _membersDown(_leftIdx, selectionsLeft)
    _left = _sortMap(_leftIdx, _left)

    null
  }

  def shuttleDownRight: String = {
    _rightIdx = _membersDown(_rightIdx, selectionsRight)
    _right = _sortMap(_rightIdx, _right)

    null
  }

  def fromRightToLeft: String = {
    selectionsRight.foreach(
      _shiftLeftRight(_, _right, _left, _rightIdx, _leftIdx)
    )

    null
  }

  def fromLeftToRight: String = {
    selectionsLeft.foreach(
      _shiftLeftRight(_, _left, _right, _leftIdx, _rightIdx)
    )
    null
  }

  def getRight: java.util.Collection[SelectItem] = {
    val ret: java.util.Map[String, SelectItem] = _right
    ret.values
  }

  def getLeft: java.util.Collection[SelectItem] = {
    val ret: java.util.Map[String, SelectItem] = _left
    ret.values
  }

  def setRight(source: java.util.Collection[SelectItem]) {
    _right = new LinkedHashMap[String, SelectItem]
    _rightIdx = new ArrayBuffer[String]
    val buf = source
    buf.foreach(item => {
      _right.put(item.getValue.toString, item)
      _rightIdx += item.getValue.toString
    }
    )
  }

  def setLeft(source: java.util.Collection[SelectItem]) {
    _left = new LinkedHashMap[String, SelectItem]
    _leftIdx = new ArrayBuffer[String]
    val buf = source
    buf.foreach(item => {
      _left.put(item.getValue.toString, item)
      _leftIdx += item.getValue.toString
    }
    )
  }

  protected def _shiftLeftRight(key: String, source: LinkedHashMap[String, SelectItem]
                                , target: LinkedHashMap[String, SelectItem]
                                , _sourceIdx: Buffer[String], _targetIdx: Buffer[String]) = {
    target.put(key, source.remove(key).get)
    _sourceIdx -= key
    _targetIdx += key
  }

  //the following helpers work in a pure functional manner
  //and rely on immutable input output states
  //(so that we can switch easily between impls)

  protected def _membersUp(idx: Buffer[String], selections: Buffer[String]): Buffer[String] = {
    selections.foldLeft(idx.clone){(idxClone, key) => {
        val pos = idxClone.indexOf(key)
        idxClone.remove(pos)
        idxClone.insert(max(pos - 1, 0), key)
        idxClone
      }
    }
  }

  protected def _membersDown(idx: Buffer[String], selections: Buffer[String]): Buffer[String] = {
    selections.foldLeft(idx.clone){(idxClone, key) => {
        val pos = idxClone.indexOf(key)
        idxClone.remove(pos)
        idxClone.insert(max(pos + 1, idxClone.size - 1), key)
        idxClone
      }
    }
  }

  def _shuttleTop(list1: Buffer[String], list2: Buffer[String]): Buffer[String] = {
    list1 ++ list2
  }

  def _shuttleBottom(list1: Buffer[String], list2: Buffer[String]): Buffer[String] = {
    list2 ++ list1
  }

  def _reorgMap(applyClosure: (Buffer[String], Buffer[String]) => Buffer[String],
                          idx: Buffer[String],
                          selections: Buffer[String],
                          dataMap: LinkedHashMap[String, SelectItem]
                           ):
  (LinkedHashMap[String, SelectItem], Buffer[String]) = {

    val filteredIdx = idx.filter(!selections.contains(_));
    val newIdx = applyClosure(selections, filteredIdx)
    val resMap = _sortMap(newIdx, dataMap)

    (resMap, newIdx)
  }

  def _sortMap(idx: Buffer[String], dataMap: LinkedHashMap[String, SelectItem]): LinkedHashMap[String, SelectItem] = {
    val resMap = LinkedHashMap[String, SelectItem]()
    idx.foreach(key =>
      resMap.put(key, dataMap.get(key).get)
    )
    resMap
  }

}