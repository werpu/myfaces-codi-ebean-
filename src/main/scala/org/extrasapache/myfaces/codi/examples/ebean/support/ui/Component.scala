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
class Component extends UINamingContainer {

  def beforeEncode(event: ComponentSystemEvent) = {
    def putAttr(key: String, entry: String) {
      getAttributes.put(key, entry)
    }

    def forTable = this.getParent().findComponent(getAttributes.get(Const.FOR_TABLE).asInstanceOf[String]).asInstanceOf[HtmlDataTable]
    putAttr(Const.FOR_TABLE_CLIENTID,forTable.getClientId)
    putAttr(Const.ENCLOSING_CONTAINER_CLIENT_ID, this.findComponent(Const.PAGING_CONTROLLER).getClientId);
  }
}

}