package org.extrasapache.myfaces.codi.examples.ebean.support.ui

import javax.faces.component.{FacesComponent, UINamingContainer}
import javax.faces.event.ComponentSystemEvent
import javax.faces.component.html.HtmlDataTable
import java.io.Serializable

/**
 *
 * @author Werner Punz (latest modification by $Author$)
 * @version $Revision$ $Date$
 *
 */
package paginator {

  object Const extends Serializable {
    val FOR_TABLE = "forTable"
    val VALUE = "value"
    val FOR_TABLE_CLIENTID = "forTableClientId"
    val ENCLOSING_CONTAINER_CLIENT_ID = "enclosingContainerClientId"
    val PAGING_CONTROLLER = "pagingController"
  }

  @FacesComponent("at.irian.PaginatorComponent")
  @serializable
  class Paginator extends UINamingContainer with AttributeHandler  {
    //note the import aliases our const into the root namespace
    import Const._

    def beforeEncode(event: ComponentSystemEvent) = {
      val forTable = getParent.findComponent( getAttr[String](FOR_TABLE, "") ).asInstanceOf[HtmlDataTable]

      setAttr[String](FOR_TABLE_CLIENTID, forTable.getClientId)
      setAttr[String](ENCLOSING_CONTAINER_CLIENT_ID, this.findComponent(PAGING_CONTROLLER).getClientId);
    }
  }

}