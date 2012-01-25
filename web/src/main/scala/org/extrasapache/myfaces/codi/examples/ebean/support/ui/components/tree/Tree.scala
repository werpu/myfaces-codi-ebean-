package org.extrasapache.myfaces.codi.examples.ebean.support.ui.components.tree

//import model.SimpleTreeModel

import model.{TreeModel, TreeItem}
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
  val AJAX_LOADING = "ajaxLoading"
}

/**
 * Basic tree only with collapsibles
 */

@FacesComponent("at.irian.Tree")
@serializable
class Tree extends StandardJavascriptComponent
{
  import Tree._

    /**
     * json representation of the tree
     *
     */
  def getModel(): TreeModel[_] = {

    null
  }

  /**
   * transforms the tree into a flat representation
   * with elements indicating the begging and end of a level in between
   */
  //def getFlatTreeRepresentation: java.util.List[TreeViewEntry] = {
  //  var isAjax = getAttr[Boolean](AJAX_LOADING, false)
    //var model = getAttr[SimpleTreeModel](MODEL, null)

  //  null
  //}



}