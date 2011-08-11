package org.extrasapache.myfaces.codi.examples.ebean.support.ui.components.menu

import javax.faces.component.FacesComponent
import org.extrasapache.myfaces.codi.examples.ebean.support.ui.components.common.StandardJavascriptComponent
import javax.faces.event.{ComponentSystemEvent, PostAddToViewEvent, ListenerFor}
import collection.JavaConversions._
/**
 *
 * @author Werner Punz (latest modification by $Author$)
 * @version $Revision$ $Date$
 */
@FacesComponent("at.irian.Menu")
@serializable
@ListenerFor(systemEventClass = classOf[PostAddToViewEvent])
class Menu extends StandardJavascriptComponent {

  var toCheck: Class[_] = _

  override def processEvent(event: ComponentSystemEvent) {
    for (component <- this.getChildren) component match {
      case comp: Menu => null
      case comp: MenuItem => null
      case _ => throw new Exception("Only child elements of type menu or menuitem are allowed within a menu")
    }
    super.processEvent(event);
  }

}