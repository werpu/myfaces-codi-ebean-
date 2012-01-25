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
  var tree = new TreeItem[String]

  for (cnt2 <- 1 to 10)
  {

    val tree2 = tree.append("identifier" + cnt2 + "_1", "value" + cnt2 + "_1", "value" + cnt2 + "_1")
    for (cnt <- 1 to 10)
    {

      tree2.append("identifier" + cnt + "_1", "value" + cnt + "_1", "value" + cnt + "_1");
    }
  }
}