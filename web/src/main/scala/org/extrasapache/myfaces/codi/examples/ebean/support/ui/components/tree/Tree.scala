package org.extrasapache.myfaces.codi.examples.ebean.support.ui.components.tree

import org.extrasapache.myfaces.codi.examples.ebean.support.ui.components.common.StandardJavascriptComponent
import javax.faces.component.FacesComponent

/**
 *
 * @author Werner Punz (latest modification by $Author$)
 * @version $Revision$ $Date$
 */

@serializable
object Tree
{
  val VALUE = "value"
  val ID = "id"
  val MODEL = "model"
  val MULTI_SELECT = "multiSelect"
  val STYLE = "style"
  val STYLE_CLASS = "styleClass"
  val VALUE_HOLDER = "valueHolder"
}

@FacesComponent("at.irian.Tree")
@serializable
class Tree extends StandardJavascriptComponent
{
    import Tree._

}