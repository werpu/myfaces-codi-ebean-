package org.extrasapache.myfaces.codi.examples.ebean.support.ui

import javax.enterprise.context.Dependent
import javax.faces.model.SelectItem
import java.io.Serializable
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

  private var _leftCtrl: SortableListController = new SortableListController
  private var _rightCtrl: SortableListController = new SortableListController

  /*delegation methods*/
  def shuttleTopLeft: String = _leftCtrl.shuttleTop
  def shuttleTopRight: String = _rightCtrl.shuttleTop
  def shuttleBottomLeft: String = _leftCtrl.shuttleBottom
  def shuttleBottomRight: String = _rightCtrl.shuttleBottom
  def shuttleUpLeft: String = _leftCtrl.shuttleUp
  def shuttleUpRight: String = _rightCtrl.shuttleUp
  def shuttleDownLeft: String = _leftCtrl.shuttleDown
  def shuttleDownRight: String = _rightCtrl.shuttleDown
  def getSelectionsLeft: java.util.List[String] = _leftCtrl.getSelections
  def setSelectionsLeft(sel: java.util.List[String]) = _leftCtrl.setSelections(sel)
  def getSelectionsRight: java.util.List[String] = _rightCtrl.getSelections
  def setSelectionsRight(sel: java.util.List[String]) = _rightCtrl.setSelections(sel)

  def setLeft(sel: java.util.Collection[SelectItem]) = _leftCtrl.setModel(sel)
  def setRight(sel: java.util.Collection[SelectItem]) = _rightCtrl.setModel(sel)

  def getLeft:java.util.Collection[SelectItem] = _leftCtrl.getModel
  def getRight:java.util.Collection[SelectItem] = _rightCtrl.getModel

  def fromRightToLeft: String = {
    _leftCtrl.membersAdd(_rightCtrl.membersRemove)
    null
  }

  def fromLeftToRight: String = {
    _rightCtrl.membersAdd(_leftCtrl.membersRemove)
    null
  }
}