package debug.blog.behaviors

import javax.faces.context.FacesContext
import javax.annotation.PostConstruct
import javax.faces.FacesException

/**
 *
 * @author Werner Punz (latest modification by $Author$)
 * @version $Revision$ $Date$
 */

class ViewController extends PermissionAware {
  /**
   * acessor method to get the viewid
   * */
  def viewId: String = FacesContext.getCurrentInstance.getViewRoot.getViewId
  def ctx = FacesContext.getCurrentInstance
  def session = FacesContext.getCurrentInstance.getExternalContext.getSession(true)
  //add other methods as needed

  /*general userAllowed check*/
  override def allowed():Boolean  = false

  @PostConstruct
  def postCreate() {
    if (!this.allowed()) throw new FacesException("Permission Error you dont have the right to access this page")
  }
}