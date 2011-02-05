package org.extrasapache.myfaces.codi.examples.ebean.support.data

import collection.mutable.HashSet

/**
 *
 * @author Werner Punz (latest modification by $Author$)
 * @version $Revision$ $Date$
 */

@serializable
class SpreadSheetController {
  private[this] var editable = new HashSet[Long]

  def enableEdit(instance: StdEntity) = editable.add(instance.getId)

  def disableEdit(instance: StdEntity) = editable.remove(instance.getId)

  def isEditable(instance: StdEntity): Boolean = editable.contains(instance.getId)

  def isEmpty(instance: StdEntity): Boolean = editable.isEmpty()

}