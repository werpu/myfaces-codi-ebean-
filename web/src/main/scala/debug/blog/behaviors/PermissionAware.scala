package debug.blog.behaviors

/**
 *
 * @author Werner Punz (latest modification by $Author$)
 * @version $Revision$ $Date$
 */

abstract class PermissionAware {
  def allowed():Boolean
}