package org.extrasapache.myfaces.codi.examples.ebean.support.ui.components.imageButton

import org.extrasapache.myfaces.codi.examples.ebean.support.ui.components.common.StandardJavascriptComponent
import javax.faces.component.FacesComponent
import javax.faces.context.FacesContext

/**
 *
 * @author Werner Punz (latest modification by $Author$)
 * @version $Revision$ $Date$
 */

object ImageButton {
  val ACTION = "action"
}

/**
 * helper to avoid a problem with the image button being nested in another component
 */
@FacesComponent("at.irian.ImageButton")
@serializable
class ImageButton extends StandardJavascriptComponent {
  import ImageButton._


  override def decode(context: FacesContext) {
    super.decode(context)
    val myVar = getAttr[AnyRef](ACTION, null)
    print(myVar.toString)
  }

}