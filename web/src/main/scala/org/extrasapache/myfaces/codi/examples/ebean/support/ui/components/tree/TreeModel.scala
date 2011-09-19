package org.extrasapache.myfaces.codi.examples.ebean.support.ui.components.tree

import java.util.Collection
import reflect.BeanProperty

/**
 *
 * @author Werner Punz (latest modification by $Author$)
 * @version $Revision$ $Date$
 */
@serializable
class TreeModel
{
  @BeanProperty
  var styleClass: String = _
  @BeanProperty
  var items: Collection[TreeItem] = _
}