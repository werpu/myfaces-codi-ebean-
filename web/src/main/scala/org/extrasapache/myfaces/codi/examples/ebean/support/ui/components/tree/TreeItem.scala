package org.extrasapache.myfaces.codi.examples.ebean.support.ui.components.tree

import java.util.Collection
import reflect.BeanProperty
import java.io.Serializable

/**
 *
 * @author Werner Punz (latest modification by $Author$)
 * @version $Revision$ $Date$
 */
@serializable
class TreeItem
{
  @BeanProperty
  var key: String = ""
  @BeanProperty
  var data: Serializable = _
  @BeanProperty
  var styleClass = ""
  @BeanProperty
  var childs: Collection[TreeItem] = _

  def hasMore: Boolean = childs != null && childs.size() > 0
}