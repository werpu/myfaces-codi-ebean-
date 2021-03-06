package org.extrasapache.myfaces.codi.examples.ebean.support.ui

import javax.faces.component.{FacesComponent, UINamingContainer}
import javax.faces.event.ComponentSystemEvent
import javax.faces.component.html.HtmlDataTable
/**
 *
 * @author Werner Punz (latest modification by $Author$)
 * @version $Revision$ $Date$
 *
 */
package paginator {

import components.common.{JavascriptComponent, AttributeHandler}

@serializable
  object Paginator  {
    val FOR_TABLE = "forTable"
    val VALUE = "value"
    val FOR_TABLE_CLIENTID = "forTableClientId"
    val ENCLOSING_CONTAINER_CLIENT_ID = "enclosingContainerClientId"
    val PAGING_CONTROLLER = "pagingController"
  }

  @FacesComponent("at.irian.PaginatorComponent")
  @serializable
  class Paginator extends UINamingContainer with AttributeHandler with JavascriptComponent {
    //note the import aliases our const into the root namespace
    import Paginator._

    def beforeEncode(event: ComponentSystemEvent) = {
      val forTable = getParent.findComponent( getAttr[String](FOR_TABLE, "") ).asInstanceOf[HtmlDataTable]

      setAttr[String](FOR_TABLE_CLIENTID, forTable.getClientId)
      setAttr[String](ENCLOSING_CONTAINER_CLIENT_ID, this.findComponent(PAGING_CONTROLLER).getClientId);
    }
  }

}