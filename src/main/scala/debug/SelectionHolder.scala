package debug

import org.apache.myfaces.extensions.cdi.core.api.scope.conversation.ViewAccessScoped
import javax.faces.model.SelectItem
import javax.inject.Named
import javax.enterprise.context.RequestScoped

/**
 *
 * @author Werner Punz (latest modification by $Author$)
 * @version $Revision$ $Date$
 */

@RequestScoped
@Named
@serializable
class SelectionHolder {

  import java.util.ArrayList

  var selectionModel = new ArrayList[SelectItem]
  var selectionValue = new ArrayList[SelectItem]
  var selectionValue2 = new ArrayList[SelectItem]

  //constructor initializer
  for (item <- (0 until 10)) {
    selectionModel.add(new SelectItem(item.toString, "item label" + item.toString))
  }

  def doSelection: String = {
    print(selectionValue.size())

    return "selectionList"
  }
}