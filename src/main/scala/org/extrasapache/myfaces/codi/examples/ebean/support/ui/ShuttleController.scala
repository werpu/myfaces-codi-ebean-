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

  private[this] var _leftCtrl = new SortableListController
  private[this] var _rightCtrl = new SortableListController

  /*delegation methods*/
  def shuttleTopLeft: String    = _leftCtrl.shuttleTop
  def shuttleTopRight: String = _rightCtrl.shuttleTop
  def shuttleBottomLeft: String = _leftCtrl.shuttleBottom
  def shuttleBottomRight: String = _rightCtrl.shuttleBottom
  def shuttleUpLeft: String = _leftCtrl.shuttleUp
  def shuttleUpRight: String = _rightCtrl.shuttleUp
  def shuttleDownLeft: String = _leftCtrl.shuttleDown
  def shuttleDownRight: String = _rightCtrl.shuttleDown

  def selectionsLeft: List[String] = _leftCtrl.selections
  def selectionsLeft_$eq(sel: List[String]) = _leftCtrl.selections = sel
  def selectionsRight: List[String] = _rightCtrl.selections
  def selectionsRight_$eq(sel: List[String]) = _rightCtrl.selections = sel

  def left_$eq(sel: Collection[SelectItem]) = _leftCtrl.setModel(sel)
  def right_$eq(sel: Collection[SelectItem]) = _rightCtrl.setModel(sel)

  def left:Collection[SelectItem] = _leftCtrl.getModel
  def right:Collection[SelectItem] = _rightCtrl.getModel

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