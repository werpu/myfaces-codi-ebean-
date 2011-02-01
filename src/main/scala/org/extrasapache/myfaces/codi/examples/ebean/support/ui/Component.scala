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
    val ENCLOSING_CONTAINER_CLIENT_ID = "forTableClientId"
    val PAGING_CONTROLLER = "pagingController"
  }

  @FacesComponent("at.irian.PaginatorComponent")
  class Component extends UINamingContainer {

    def beforeEncode(event: ComponentSystemEvent) = {
      def forTable = this.getParent().findComponent(getForTable).asInstanceOf[HtmlDataTable]
      setForTableClientId(forTable.getClientId)
      setEnclosingContainerClientId(this.findComponent(Const.PAGING_CONTROLLER).getClientId);
    }

    def getValue: PaginationController[_] = getStateHelper().eval(Const.VALUE, null).asInstanceOf[PaginationController[_]]

    def getForTable: String = getStateHelper().eval(Const.FOR_TABLE, "").asInstanceOf[String]

    def getForTableClientId: String = getStateHelper().eval(Const.FOR_TABLE_CLIENTID, "").asInstanceOf[String]

    def getEnclosingContainerClientId: String = getStateHelper().eval(Const.ENCLOSING_CONTAINER_CLIENT_ID, "").asInstanceOf[String]

    def setValue(value: PaginationController[_]): Unit = getStateHelper().put(Const.VALUE, value)

    def setForTable(theVal: String): Unit = getStateHelper().put(Const.FOR_TABLE, theVal)

    def setForTableClientId(value: String): Unit = getStateHelper().put(Const.FOR_TABLE_CLIENTID, value)

    def setEnclosingContainerClientId(value: String): Unit = getStateHelper().put(Const.ENCLOSING_CONTAINER_CLIENT_ID, value)
  }

}