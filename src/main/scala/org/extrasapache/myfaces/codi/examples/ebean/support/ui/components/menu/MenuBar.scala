package org.extrasapache.myfaces.codi.examples.ebean.support.ui.components.menu

import javax.faces.component.FacesComponent
import javax.faces.event.ListenerFor._
import javax.faces.event._
import org.extrasapache.myfaces.codi.examples.ebean.support.ui.components.common.StandardJavascriptComponent
import collection.JavaConversions._

/**
 *
 * @author Werner Punz (latest modification by $Author$)
 * @version $Revision$ $Date$
 */
@FacesComponent("at.irian.MenuBar")
@serializable
@ListenerFor(systemEventClass = classOf[PostAddToViewEvent])
class MenuBar extends StandardJavascriptComponent{
}