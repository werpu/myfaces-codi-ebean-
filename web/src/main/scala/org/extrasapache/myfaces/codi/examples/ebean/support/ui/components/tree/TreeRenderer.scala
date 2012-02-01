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
@FacesRenderer(componentFamily = "javax.faces.Output", rendererType = "extras.apache.Tree")
class TreeRenderer extends Renderer {


    override def encodeEnd(context: FacesContext, component: UIComponent) {
        val writer = context.getResponseWriter
        val clientId = component.getClientId(context)

        //TODO add a decent error message here
        val rootNode = component.asInstanceOf[Tree].getModel().asInstanceOf[TreeModel[_]].getRootNode

        //start of component with embedding div containing the raw client
        //id of the component
        var model = component.asInstanceOf[Tree].getModel().asInstanceOf[TreeModel[_]]
        writer.write("""<div id="%1$s"><ol id="%2$s" class="collapsibleTree">""".format(clientId, clientId + ":" + "mainNodes"))

        renderNodeList(component, context, rootNode, 0)

        //end of the component
        writer.write("""</ol></div>""")
    }

    def renderNodeList(component: UIComponent, context: FacesContext, parent: TreeItem[_], depth: Int) {
        if (!parent.hasChilds) return
        val writer = context.getResponseWriter
        val clientId = component.getClientId(context)
        val it = parent.childIterator
        while (it.hasNext) {
            val theChild = it.next()
            val child = theChild.asInstanceOf[TreeItem[_]]
            writer.write("""<li id="%1$s:%2$s" class="node" data-mf-hassubnodes="%3$s">""".format(
                        clientId,
                        child.getLabel(),
                        child.hasChilds.toString))

            if (child.hasChilds) {
                writer.write("<div  class=\"collapseIcon\"></div>")
                writer.write(child.getDescription())
                writer.write("<ol id=\"%1$s:%2$s:subnodes\" class=\"subNodes\">".format(clientId, child.getLabel()))
                renderNodeList(component, context, child, depth + 1);
                writer.write("</ol>");
            } else {
                writer.write(child.getDescription())
            }

            writer.write("</li>")
            writer.flush()
            //TODO add renderer
        }

    }
}