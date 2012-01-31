package org.extrasapache.myfaces.codi.examples.ebean.support.ui.components.tree

//import model.SimpleTreeModel

import model.TreeModel
import org.extrasapache.myfaces.codi.examples.ebean.support.ui.components.common.JavascriptComponent
import javax.faces.component.{UIOutput, FacesComponent}

/**
 *
 * @author Werner Punz (latest modification by $Author$)
 * @version $Revision$ $Date$
 */

@serializable
object Tree {
    val VALUE = "value"
    val ID = "id"
    val MODEL = "model"
    val MULTI_SELECT = "multiSelect"
    val STYLE = "style"
    val STYLE_CLASS = "styleClass"
    val VALUE_HOLDER = "valueHolder"
    val AJAX_LOADING = "ajaxLoading"

    val COMPONENT_TYPE = "at.irian.Tree"
}

/**
 * Basic tree only with collapsibles
 */

@FacesComponent("at.irian.Tree")
@serializable
class Tree extends UIOutput with JavascriptComponent {

    import Tree._

    setRendererType("at.irian.Tree");

    def setStyle(style: String) {
        putStateAttr[String](STYLE, style);
    }

    def getStyle(): String = getStateAttr[String](STYLE, "")

    def setStyleClass(style: String) {
        putStateAttr[String](STYLE, style);
    }

    def getStyleClass(): String = getStateAttr[String](STYLE, "");

    def setMultiSelect(select: java.lang.Boolean) {
        putStateAttr[java.lang.Boolean](MULTI_SELECT, select);
    }

    def getMultiSelect(): java.lang.Boolean = getStateAttr[java.lang.Boolean](MULTI_SELECT, java.lang.Boolean.TRUE);

    def setModel(style: TreeModel[_]) {
        putStateAttr[AnyRef](MODEL, style);
    }

    def getModel(): TreeModel[_] = getStateAttr[TreeModel[_]](MODEL, null);

}