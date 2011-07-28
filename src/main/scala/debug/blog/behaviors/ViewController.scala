package debug.blog.behaviors

import javax.faces.context.FacesContext
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
}