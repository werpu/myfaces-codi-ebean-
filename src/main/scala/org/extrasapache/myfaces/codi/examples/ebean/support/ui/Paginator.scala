package org.extrasapache.myfaces.codi.examples.ebean.support.ui

import javax.faces.component.{FacesComponent, UINamingContainer}
import javax.faces.event.ComponentSystemEvent
import javax.faces.component.html.HtmlDataTable
import org.extrasapache.myfaces.codi.examples.ebean.support.data.PaginationController
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
class Paginator extends UINamingContainer with AttributeHandler with Serializable {

  def beforeEncode(event: ComponentSystemEvent) = {
    val forTable = this.getParent().findComponent(getAttr[String](Const.FOR_TABLE,"")).asInstanceOf[HtmlDataTable]
    setAttr[String](Const.FOR_TABLE_CLIENTID,forTable.getClientId)
    setAttr[String](Const.ENCLOSING_CONTAINER_CLIENT_ID, this.findComponent(Const.PAGING_CONTROLLER).getClientId);
  }
}

}