package debug

import org.apache.myfaces.extensions.cdi.core.api.scope.conversation.ViewAccessScoped
import javax.faces.model.SelectItem
import javax.inject.Named
import javax.enterprise.context.RequestScoped
import org.extrasapache.myfaces.codi.examples.ebean.support.ui.components.selectionList.SelectionItem

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

  var selectionModel = new ArrayList[SelectionItem]
  var selectionValue = new ArrayList[SelectionItem]
  var selectionValue2 = new ArrayList[SelectionItem]

  //constructor initializer
  for (item <- (0 to 9)) {
    var theItem = new SelectionItem()
    theItem.setValue(item.toString)
    theItem.setLabel("item label" + item.toString)
    selectionModel.add(new SelectionItem(theItem))
  }

  def doSelection: String = {
    print(selectionValue.size())

    return "selectionList"
  }
}