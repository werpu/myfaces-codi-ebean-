package org.extrasapache.myfaces.codi.examples.ebean.support.ui.components.popup

import org.extrasapache.myfaces.codi.examples.ebean.support.ui.components.common.StandardJavascriptComponent
import javax.faces.event.ComponentSystemEvent
import javax.faces.FacesException
import javax.faces.component.html.HtmlDataTable
import javax.faces.component.{UIComponent, FacesComponent}
import javax.faces.context.FacesContext

@serializable
object Popup {
  val FOR = "for"
  var FOR_CLIENT_ID = "forClientId"
}

/**
 *
 * @author Werner Punz (latest modification by $Author$)
 * @version $Revision$ $Date$
 */
@serializable
@FacesComponent("at.irian.Popup")
class Popup extends StandardJavascriptComponent {

  import Popup._

  override def encodeAll(context: FacesContext) {
    val forComponent = getParent.findComponent( getAttr[String](FOR, "") ).asInstanceOf[UIComponent]
    setAttr[String](FOR_CLIENT_ID,forComponent.getClientId(FacesContext.getCurrentInstance))
    super.encodeAll(context)
  }

}