package debug.blog

import debug.blog.behaviors._
import javax.faces.bean.{RequestScoped, ManagedBean}
/**
 *
 * @author Werner Punz (latest modification by $Author$)
 * @version $Revision$ $Date$
 */
@ManagedBean
@RequestScoped
@serializable
class ReportingView
  extends ViewController
  /*Permission set for this page*/
  /*with AdminAllowed
  with AuthorAllowed
  with ReaderAllowed */{
  var hello:String= "Hello world from ReportingView"
}
