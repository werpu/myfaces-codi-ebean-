package org.extrasapache.myfaces.codi.examples.ebean.support.ui

import javax.faces.model.SelectItem
import java.io.Serializable
import reflect.BeanProperty
import collection.mutable.{ArrayBuffer, Buffer, LinkedHashMap}
import collection.JavaConversions._
import scala.math._
/**
 *
 * @author Werner Punz (latest modification by $Author$)
 * @version $Revision$ $Date$
 */

class SortableListController extends Serializable {

  var _model: LinkedHashMap[String, SelectItem] = LinkedHashMap[String, SelectItem]()

  var _idx: Buffer[String] = ArrayBuffer[String]()

  @BeanProperty
  var selections: java.util.List[String] = ArrayBuffer[String]()

  def shuttleTopLeft: String = {
    val res = _reorgMap(_shuttleTop, _idx, selections, _model)
    _model = res._1
    _idx = res._2

    null
  }

  def shuttleBottomLeft: String = {
    val res = _reorgMap(_shuttleBottom, _idx, selections, _model)
    _model = res._1
    _idx = res._2

    null
  }

  def shuttleUpLeft: String = {
    _idx = _membersUp(_idx, selections)
    _model = _sortMap(_idx, _model)

    null
  }

  def shuttleUpRight: String = {
    _idx = _membersUp(_idx, selections)
    _model = _sortMap(_idx, _model)

    null
  }

  def  membersRemove: Buffer[SelectItem] = {
    null
  }

  def membersAdd(toAdd: Buffer[SelectItem]) = {

  }

  //the following helpers work in a pure functional manner
  //and rely on immutable input output states
  //(so that we can switch easily between impls)

  def _membersUp(idx: Buffer[String], selections: Buffer[String]): Buffer[String] = {
    selections.foldLeft(idx.clone) {
      (idxClone, key) => {
        val pos = idxClone.indexOf(key)
        idxClone.remove(pos)
        idxClone.insert(max(pos - 1, 0), key)
        idxClone
      }
    }
  }

  def _membersDown(idx: Buffer[String], selections: Buffer[String]): Buffer[String] = {
    selections.foldLeft(idx.clone) {
      (idxClone, key) => {
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