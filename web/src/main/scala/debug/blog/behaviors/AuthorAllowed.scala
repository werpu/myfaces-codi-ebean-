package debug.blog.behaviors

/**
 *
 * @author Werner Punz (latest modification by $Author$)
 * @version $Revision$ $Date$
 */

trait AuthorAllowed extends PermissionAware {

  /*general userAllowed check*/
  abstract override def allowed():Boolean = {
    false || super.allowed()
  }
}