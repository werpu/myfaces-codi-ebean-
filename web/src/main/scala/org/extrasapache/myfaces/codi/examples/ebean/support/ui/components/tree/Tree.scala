package org.extrasapache.myfaces.codi.examples.ebean.support.ui.components.tree

//import model.SimpleTreeModel

import model.TreeModel
import org.extrasapache.myfaces.codi.examples.ebean.support.ui.components.common.JavascriptComponent
import java.io.Serializable
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

    val COMPONENT_TYPE = "extras.apache.Tree"
}

/**
 * Basic tree only with collapsibles
 */

@FacesComponent("extras.apache.Tree")
@serializable
class Tree extends UIOutput with JavascriptComponent {

    import Tree._

    setRendererType("extras.apache.Tree");

    def setStyle(style: String) {
        putStateAttr[String](STYLE, style);
    }

    def getStyle(): String = getStateAttr[String](STYLE, "")

    def setStyleClass(style: String) {
        putStateAttr[String](STYLE_CLASS, style);
    }

    def getStyleClass(): String = getStateAttr[String](STYLE_CLASS, "");

    def setMultiSelect(select: java.lang.Boolean) {
        putStateAttr[java.lang.Boolean](MULTI_SELECT, select);
    }

    def getMultiSelect(): java.lang.Boolean = getStateAttr[java.lang.Boolean](MULTI_SELECT, java.lang.Boolean.TRUE);

    def setModel(style: AnyRef) {
        putStateAttr[AnyRef](MODEL, style);
    }

    def getModel(): AnyRef = getStateAttr[AnyRef](MODEL, null);


    def getStateAttr[T](key: Serializable, default: T): T = getStateHelper().eval(key, default).asInstanceOf[T]

    def putStateAttr[T](key: Serializable, default: T): T = getStateHelper().put(key, default).asInstanceOf[T]

    /*implemented by the underlying component class*/
    //    protected def getStateHelper():StateHelper
}