package org.extrasapache.myfaces.codi.examples.ebean.support.ui.components.tree

import model.TreeItem
import reflect.BeanProperty
import javax.faces.model.SelectItem

/**
 *
 * @author Werner Punz (latest modification by $Author$)
 * @version $Revision$ $Date$
 *
 * A simple representatin of a tree entry as a flat entry
 * with following properties additional
 * begin level marks an empty non data element
 * end level marks the end of a sublevel (also empty non data)
 */

class TreeViewEntry
{
  @BeanProperty
  var beginLevel = false
  @BeanProperty
  var endLevel = false
  @BeanProperty
  var hasChilds = false
  @BeanProperty
  var ajaxChilds = false
  @BeanProperty
  var item: TreeItem[SelectItem] = _

  @BeanProperty
  var identifier: String = ""
}