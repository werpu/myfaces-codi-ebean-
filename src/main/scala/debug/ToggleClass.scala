package debug

import javax.enterprise.context.RequestScoped
import javax.inject.Named

/**
 *
 * @author Werner Punz (latest modification by $Author$)
 * @version $Revision$ $Date$
 */
@RequestScoped
@Named
@serializable
class ToggleClass {

  def doSubmit():String = {
    return null
  }
}