package org.extrasapache.myfaces.codi.examples.ebean.support.ui.components.common

import javax.faces.context.FacesContext
import scala.AnyRef


/**
 *
 * @author Werner Punz (latest modification by $Author$)
 * @version $Revision$ $Date$
 */

trait RequestHandler {
  def attrMap: java.util.Map[String, String] = {
    FacesContext.getCurrentInstance.getExternalContext.getRequestParameterMap
  }

  def getReqAttr(key:String): String = {
    attrMap.get(key)
  }
}