package org.extrasapache.myfaces.codi.examples.ebean.support.ui.components.tree

import javax.faces.context.FacesContext
import javax.faces.component.UIComponent
import model.{TreeModel, TreeItem}
import javax.faces.render.{Renderer, FacesRenderer}

/**
 *
 * @author Werner Punz (latest modification by $Author$)
 * @version $Revision$ $Date$
 */
@FacesRenderer(componentFamily = "javax.faces.Output", rendererType = "at.irian.Tree")
class TreeRenderer extends Renderer {


    override def encodeBegin(context: FacesContext, component: UIComponent) {

        val writer = context.getResponseWriter
        val clientId = component.getClientId(context)
        val rootNode = component.asInstanceOf[Tree].getModel().asInstanceOf[TreeModel[_]].getRootNode

        //start of component with embedding div containing the raw client
        //id of the component
        var model = component.asInstanceOf[Tree].getModel().asInstanceOf[TreeModel[_]]
        writer.write("""<div id="$s"><ol id="$s" class="collapsibleTree">""".format(clientId, clientId + ":" + "mainNodes"))

        renderNodeList(component, context, rootNode, 0)

        //end of the component
        writer.write("""</ol></div>""")
    }

    def renderNodeList(component: UIComponent, context: FacesContext, parent: TreeItem[_], depth: Int) {
        if (!parent.hasChilds) return
        val writer = context.getResponseWriter
        val clientId = component.getClientId(context)

        for (theChild: AnyRef <- parent.childIterator) {
            val child = theChild.asInstanceOf[TreeItem[_]]
            writer.write("""<li id="$s:$s" class="node" data-mf-hassubnodes="$s">""".format(
                        clientId,
                        child.getLabel(),
                        child.hasChilds.toString))

            if (child.hasChilds) {
                writer.write("<div  class=\"collapseIcon\"></div>")
                writer.write(child.getDescription())
                writer.write("<ol id=\"$s:$s:subnodes\" class=\"subNodes\">".format(clientId, child.getLabel()))
                renderNodeList(component, context, child, depth + 1);
                writer.write("</ol>");
            } else {
                writer.write(child.getDescription())
            }

            writer.write("</li>")
            //TODO add renderer
        }

    }
}