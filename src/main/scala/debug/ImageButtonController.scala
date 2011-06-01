package debug

import javax.faces.event.ActionListener
import javax.inject.Named
import javax.faces.bean.RequestScoped

/**
 *
 * @author Werner Punz (latest modification by $Author$)
 * @version $Revision$ $Date$
 */

@Named
@RequestScoped
class ImageButtonController {

  def doActionListener(listener: ActionListener) {
    print("doing image action listener")
  }

  def  doAction():String = {
    print("doing image action")
    return null
  }

}