package debug.blog.behaviors

import javax.faces.context.FacesContext
import java.util._
/**
 *
 * @author Werner Punz (latest modification by $Author$)
 * @version $Revision$ $Date$
 */

trait JSFAware {
  def facesContext = FacesContext.getCurrentInstance
  def externalContext = facesContext.getExternalContext
  def viewRoot = facesContext.getViewRoot

  def paramMap = externalContext.getRequestMap
  def appMap = externalContext.getApplicationMap
  def cookieMap = externalContext.getRequestCookieMap


}