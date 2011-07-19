package org.extrasapache.myfaces.codi.examples.ebean.support.ui.components.common

import javax.faces.context.FacesContext
import javax.faces.component._

/**
 *
 * @author Werner Punz (latest modification by $Author$)
 * @version $Revision$ $Date$
 */

@FacesComponent("at.irian.StandardJavascriptComponent")
@serializable
class StandardJavascriptComponent extends UINamingContainer with JavascriptComponent {
  def ajaxState(): Boolean = {
    FacesContext.getCurrentInstance.getPartialViewContext.isPartialRequest || FacesContext.getCurrentInstance.getPartialViewContext.isAjaxRequest
  }

  implicit def component2Input(in: UIComponent): UIInput = {
    in match {
      case comp: UIInput => comp
      case _ => null
    }
  }
  implicit def component2Ouput(in: UIComponent): UIOutput = {
    in match {
      case comp: UIOutput => comp
      case _ => null
    }
  }
}