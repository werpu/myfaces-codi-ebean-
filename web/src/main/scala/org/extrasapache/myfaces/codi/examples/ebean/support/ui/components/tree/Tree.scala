package org.extrasapache.myfaces.codi.examples.ebean.support.ui.components.tree

//import model.SimpleTreeModel

import model.{TreeItem, TreeModel}
import org.extrasapache.myfaces.codi.examples.ebean.support.ui.components.common.StandardJavascriptComponent
import javax.faces.component.FacesComponent
import javax.faces.context.FacesContext

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
}

/**
 * Basic tree only with collapsibles
 */

@FacesComponent("at.irian.Tree")
@serializable
class Tree extends StandardJavascriptComponent {


    /**
     * json representation of the tree
     *
     */
    def getModel(): TreeModel[_] = {
        null
    }

    def renderNodeList(context: FacesContext, parent: TreeItem[_]) {
        if (!parent.hasChilds) return
        val writer = context.getResponseWriter
        val clientId = getClientId(context)

        /*for (child <- parent.childIterator) {

            writer.write("""
                    <li id="$s" class="node" data-mf-hassubnodes="$s">
                """.format(child.getLabel(), child.hasChilds.toString))
            if (child.hasChilds) {
                writer.write("<div class=\"collapseIcon\"></div>")
                writer.write(child.getDescription())
                writer.write("""<ol class="subNodes"> """)
                renderNodeList(context, child);
                writer.write("</ol>");
            } else {
                writer.write(child.getDescription())
            }
            writer.write("</li>")
        }*/

    }

    //for easier prototypign we encode our own tree in the component
    //not in the separate renderer class
    override def encodeAll(context: FacesContext) {
        //super.encodeAll(context)

        val writer = context.getResponseWriter
        val clientId = getClientId(context)
        val rootNode = getModel().getRootNode

        //start of component with embedding div containing the raw client
        //id of the component
        var model = getModel()
        writer.write("""
            <div id="$s">
                 <ol id="$s" class="collapsibleTree">
        """.format(clientId, clientId + ":" + "mainNodes"))

        renderNodeList(context, rootNode)

        //end of the component
        writer.write("""
                 </ol>
            </div>
                """)
    }
}