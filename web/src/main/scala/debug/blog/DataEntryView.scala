package debug.blog

import behaviors.{ReaderAllowed, AuthorAllowed, AdminAllowed, ViewController}
import javax.faces.bean.ManagedBean
import javax.enterprise.context.RequestScoped

/**
 *
 * @author Werner Punz (latest modification by $Author$)
 * @version $Revision$ $Date$
 */
@ManagedBean
@RequestScoped
class DataEntryView (val hello:String = "Hello world from DataEntryView")
  extends ViewController
  /*Permission set for this page*/
  with AdminAllowed
  with AuthorAllowed