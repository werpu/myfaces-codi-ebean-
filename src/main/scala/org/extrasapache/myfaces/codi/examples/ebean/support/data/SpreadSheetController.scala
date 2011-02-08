package org.extrasapache.myfaces.codi.examples.ebean.support.data

import collection.mutable.HashSet
import javax.inject.Named
import javax.enterprise.context.Dependent

/**
 *
 * @author Werner Punz (latest modification by $Author$)
 * @version $Revision$ $Date$
 */

@Named
@Dependent
@serializable
class SpreadSheetController {
  private[this] var editable = new HashSet[java.lang.Long]

  def enableEdit(instance: StdEntity) = editable.add(instance.id)

  def disableEdit(instance: StdEntity) = editable.remove(instance.id)

  def isEditable(instance: StdEntity): Boolean = editable.contains(instance.id)

  def isEmpty: Boolean = editable.isEmpty

  def clear = editable.clear

}