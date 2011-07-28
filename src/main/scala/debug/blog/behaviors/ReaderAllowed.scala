package debug.blog.behaviors

import javax.faces.context.FacesContext

/**
 *
 * @author Werner Punz (latest modification by $Author$)
 * @version $Revision$ $Date$
 */

trait ReaderAllowed extends PermissionAware {

  /*general userAllowed check*/
  abstract override def allowed():Boolean = {
    false || super.allowed()
  }
}