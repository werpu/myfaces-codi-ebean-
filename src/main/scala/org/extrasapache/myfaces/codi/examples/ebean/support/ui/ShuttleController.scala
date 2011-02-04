package org.extrasapache.myfaces.codi.examples.ebean.support.ui

import javax.enterprise.context.Dependent
import javax.faces.model.SelectItem
//again we overwrite the defaults to make the code shorter
import java.util._

/**
 *
 * @author Werner Punz (latest modification by $Author$)
 * @version $Revision$ $Date$
 *
 *
 * A scala version of our shuttle controller
 *
 */

@Dependent
@serializable
class ShuttleController  {

  private var _leftCtrl: SortableListController = new SortableListController
  private var _rightCtrl: SortableListController = new SortableListController

  /*delegation methods*/
  def shuttleTopLeft: String    = _leftCtrl.shuttleTop
  def shuttleTopRight: String = _rightCtrl.shuttleTop
  def shuttleBottomLeft: String = _leftCtrl.shuttleBottom
  def shuttleBottomRight: String = _rightCtrl.shuttleBottom
  def shuttleUpLeft: String = _leftCtrl.shuttleUp
  def shuttleUpRight: String = _rightCtrl.shuttleUp
  def shuttleDownLeft: String = _leftCtrl.shuttleDown
  def shuttleDownRight: String = _rightCtrl.shuttleDown
  def getSelectionsLeft: List[String] = _leftCtrl.getSelections
  def setSelectionsLeft(sel: List[String]) = _leftCtrl.setSelections(sel)
  def getSelectionsRight: List[String] = _rightCtrl.getSelections
  def setSelectionsRight(sel: List[String]) = _rightCtrl.setSelections(sel)

  def setLeft(sel: Collection[SelectItem]) = _leftCtrl.setModel(sel)
  def setRight(sel: Collection[SelectItem]) = _rightCtrl.setModel(sel)

  def getLeft:Collection[SelectItem] = _leftCtrl.getModel
  def getRight:Collection[SelectItem] = _rightCtrl.getModel

  /*additional functionality of the right left shutteling*/
  def fromRightToLeft: String = {
    _leftCtrl.membersAdd(_rightCtrl.membersRemove)
    null
  }

  def fromLeftToRight: String = {
    _rightCtrl.membersAdd(_leftCtrl.membersRemove)
    null
  }
}