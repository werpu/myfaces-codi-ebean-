package org.extrasapache.myfaces.codi.examples.ebean.support.ui.components.tabbedPane

import javax.faces.component.FacesComponent
import org.extrasapache.myfaces.codi.examples.ebean.support.ui.components.common.StandardJavascriptComponent
import java.awt.Label
import javax.faces.event.ListenerFor._
import javax.faces.event._
import collection.JavaConversions._

object TabbedPane {
  val LAZY_LOAD = "lazyLoad"
  val TAB_CLASSES = "tabClasses"

}


/**
 * tabulation info derived from the child components
 */
class TabInfo {
  var label = ""
  var styleClass = ""
  var clientId = ""
}

/**
 *
 * @author Werner Punz (latest modification by $Author$)
 * @version $Revision$ $Date$
 */
@serializable
@FacesComponent("at.irian.TabbedPane")
@ListenerFor(systemEventClass = classOf[PreRenderComponentEvent])
class TabbedPane extends StandardJavascriptComponent {

  override def processEvent(event: ComponentSystemEvent) {
    event match {
      case ev: PreRenderComponentEvent => {
        updateTabInfo();
      }
      case _ => ;
    }
  }

  /**
   * The idea is that we have to determine the correct tabulation info on every
   * prerender of the component because the childs might have changed
   * upon the last refresh
   */
  def updateTabInfo() {
    val children = this.getChildren();
    for (child <- children) {

    }

  }

}