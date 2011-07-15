package org.extrasapache.myfaces.codi.examples.ebean.support.ui.components.menu

import javax.faces.component.FacesComponent
import javax.faces.event.{PostAddToViewEvent, ListenerFor}
import org.extrasapache.myfaces.codi.examples.ebean.support.ui.components.common.StandardJavascriptComponent
/**
 *
 * @author Werner Punz (latest modification by $Author$)
 * @version $Revision$ $Date$
 */

@FacesComponent("at.irian.MenuItem")
@serializable
@ListenerFor(systemEventClass = classOf[PostAddToViewEvent])
class MenuItem extends StandardJavascriptComponent  {

}