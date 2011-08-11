package org.extrasapache.myfaces.codi.examples.ebean.support.ui.components.contentPane

import javax.faces.component.FacesComponent
import org.extrasapache.myfaces.codi.examples.ebean.support.ui.components.common.StandardJavascriptComponent

/**
 *
 * @author Werner Punz (latest modification by $Author$)
 * @version $Revision$ $Date$
 */
@serializable
@FacesComponent("at.irian.Contentpane")
class ContentPane extends StandardJavascriptComponent {
  /*abbreviation to fetch the title*/
  def getTitle():String = {
    getAttr[String]("title","")
  }

}