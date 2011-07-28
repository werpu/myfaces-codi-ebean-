package debug.blog

import behaviors.{AdminAllowed, ViewController}
import javax.faces.bean.ManagedBean
import javax.enterprise.context.RequestScoped

/**
 *
 * @author Werner Punz (latest modification by $Author$)
 * @version $Revision$ $Date$
 */
@ManagedBean
@RequestScoped
class AdminView (val hello:String = "Hello world from AdminView")
  extends ViewController
  /*Permission set for this page*/
  with AdminAllowed