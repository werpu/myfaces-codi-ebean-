package debug.treetest

import javax.inject.Named
import org.apache.myfaces.extensions.cdi.core.api.scope.conversation.ViewAccessScoped
import org.extrasapache.myfaces.codi.examples.ebean.support.ui.components.tree.model.TreeItem
import javax.faces.model.SelectItem

/**
 *
 * @author Werner Punz (latest modification by $Author$)
 * @version $Revision$ $Date$
 */
@serializable
@Named
@ViewAccessScoped
class TreeTestView
{
  var tree = new TreeItem[SelectItem]

  for (cnt2 <- 1 to 10)
  {
    val item = new SelectItem()
    item.setLabel("identifier" + cnt2)
    item.setValue("value" + cnt2);
    val tree2 = tree.append(item)
    for (cnt <- 1 to 10)
    {
      val item = new SelectItem()
      item.setLabel("identifier" + cnt + "_1")
      item.setValue("value" + cnt + "_1");
      tree2.append(item);
    }
  }
}