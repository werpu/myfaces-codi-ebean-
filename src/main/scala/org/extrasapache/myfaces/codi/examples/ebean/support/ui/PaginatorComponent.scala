package org.extrasapache.myfaces.codi.examples.ebean.support.ui

/**
 *
 * @author Werner Punz (latest modification by $Author$)
 * @version $Revision$ $Date$
 */

import javax.faces.component.{FacesComponent, UINamingContainer}
import javax.faces.event.ComponentSystemEvent
import javax.faces.component.html.HtmlDataTable
import org.extrasapache.myfaces.codi.examples.ebean.support.data.PaginationController
import java.io.Serializable

object PropertyKeys extends Serializable {
  val FOR_TABLE = "forTable"
  val VALUE = "value"
  val FOR_TABLE_CLIENTID = "forTableClientId"
  val ENCLOSING_CONTAINER_CLIENT_ID = "forTableClientId"
}

@FacesComponent("at.irian.PaginatorComponent")
class PaginatorComponent extends UINamingContainer {
  val PAGING_CONTROLLER = "pagingController"

  def beforeEncode(event: ComponentSystemEvent) = {
    def forTable = this.getParent().findComponent(getForTable).asInstanceOf[HtmlDataTable]
    setForTableClientId(forTable.getClientId)
    setEnclosingContainerClientId(this.findComponent(PAGING_CONTROLLER).getClientId);
  }

  def getValue: PaginationController[_] = getStateHelper().eval(PropertyKeys.VALUE, null).asInstanceOf[PaginationController[_]]

  def getForTable: java.lang.String = getStateHelper().eval(PropertyKeys.FOR_TABLE, "").asInstanceOf[java.lang.String]

  def getForTableClientId: java.lang.String = getStateHelper().eval(PropertyKeys.FOR_TABLE_CLIENTID, "").asInstanceOf[java.lang.String]

  def getEnclosingContainerClientId: java.lang.String = getStateHelper().eval(PropertyKeys.ENCLOSING_CONTAINER_CLIENT_ID, "").asInstanceOf[java.lang.String]

  def setValue(value: PaginationController[_]) {
    getStateHelper().put(PropertyKeys.VALUE, value)
  }

  def setForTable(theVal: java.lang.String) {
    getStateHelper().put(PropertyKeys.FOR_TABLE, theVal)
  }

  def setForTableClientId(value: java.lang.String) {
    getStateHelper().put(PropertyKeys.FOR_TABLE_CLIENTID, value)
  }

  def setEnclosingContainerClientId(value: java.lang.String) {
    getStateHelper().put(PropertyKeys.ENCLOSING_CONTAINER_CLIENT_ID, value)
  }
}

