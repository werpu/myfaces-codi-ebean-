package org.extrasapache.myfaces.codi.examples.ebean.support.ui.components.tabbedPane

import javax.faces.component.FacesComponent
import javax.faces.event._
import org.extrasapache.myfaces.codi.examples.ebean.support.ui.components.contentPane.ContentPane
import javax.faces.FacesException
import collection.JavaConversions._
import collection.mutable._

object TabbedPane {
  val LAZY_LOAD = "lazyLoad"
  val TAB_CLASSES = "tabClasses"
  val HEAD_STYLECLASS = "headStyleClass"
  val TABS = "tabs"

  val ERR_CHILD = "Children of Tabbed Pane must be of type content Pane"
}


/**
 * tabulation info derived from the child components
 */
class TabInfo {
  var label = ""
  var styleClass = ""
  var clientId = ""
  var active = "inactive"
}

/**
 *
 * @author Werner Punz (latest modification by $Author$)
 * @version $Revision$ $Date$
 */
@serializable
@FacesComponent("at.irian.TabbedPane")
@ListenerFor(systemEventClass = classOf[PreRenderComponentEvent])
class TabbedPane extends ContentPane {
  import TabbedPane._

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
    val tabInfoStorage = new ArrayBuffer[TabInfo]
    var activeTabFound:Boolean = false
    var activeTabId = getAttr[String]("activeTab","")

    for (child <- children) {
      if (!child.isInstanceOf[ContentPane]) throw new FacesException(ERR_CHILD)

      val tab = child.asInstanceOf[ContentPane]
      val tabInfo = new TabInfo()

      tabInfo.label = tab.getAttr[String]("title","")
      tabInfo.styleClass = tab.getAttr[String](HEAD_STYLECLASS,"")
      tabInfo.clientId = tab.getClientId()
      if (activeTabId != "") {
        tabInfo.active = if (activeTabId == tabInfo.clientId) "active" else "inactive"
      } else {
        tabInfo.active =  if(activeTabFound || (tab.getAttr[String]("active","false") == "true")) "inactive" else "active"
      }
      tabInfoStorage += tabInfo

    }
    val storage: java.util.List[TabInfo] = tabInfoStorage;
    setAttr[java.util.List[TabInfo]](TABS, storage)
  }



}