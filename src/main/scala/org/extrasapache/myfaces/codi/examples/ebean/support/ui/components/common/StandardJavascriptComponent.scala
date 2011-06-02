package org.extrasapache.myfaces.codi.examples.ebean.support.ui.components.common

import javax.faces.component.{FacesComponent, UINamingContainer}
import javax.faces.context.FacesContext

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
}