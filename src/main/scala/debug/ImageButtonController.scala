package debug

import javax.faces.event.ActionListener
import javax.inject.Named
import javax.faces.bean.{SessionScoped, RequestScoped}

/**
 *
 * @author Werner Punz (latest modification by $Author$)
 * @version $Revision$ $Date$
 */

@Named
@SessionScoped
@serializable
class ImageButtonController {

  var visibleRow: Boolean = false

  def doActionListener(listener: ActionListener) {
    print("doing image action listener")
  }

  def doVisible(): String = {
    println("making row visible")
    visibleRow = true
    null
  }

  def  doAction():String = {
    print("doing image action")
    return null
  }

}