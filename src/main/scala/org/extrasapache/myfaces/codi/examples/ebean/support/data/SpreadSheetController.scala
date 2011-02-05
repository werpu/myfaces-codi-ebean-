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

  def enableEdit(instance: StdEntity) = editable.add(instance.getId)

  def disableEdit(instance: StdEntity) = editable.remove(instance.getId)

  def isEditable(instance: StdEntity): Boolean = editable.contains(instance.getId)

  def isEmpty: Boolean = editable.isEmpty

  def clear = editable.clear

}