package debug.treetest

import javax.inject.Named
import org.apache.myfaces.extensions.cdi.core.api.scope.conversation.ViewAccessScoped
import javax.faces.model.SelectItem
import org.extrasapache.myfaces.codi.examples.ebean.support.ui.components.tree.model.{SimpleTreeModel, TreeItem}

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
  var treeModel = new SimpleTreeModel[String]

  tree.setLabel("Tree");
  tree.setDescription("Tree")

  treeModel.setRootNode(tree)
  for (cnt2 <- 1 to 10)
  {
    val tree2 = tree.append("identifier_" + cnt2 , "value" + cnt2 , "value" + cnt2)
    treeModel.updateIdx(tree2)

    for (cnt <- 1 to 10)
    {
        treeModel.updateIdx(tree2.append("identifier_" +cnt2+":" + cnt , "value"+cnt2+":"  + cnt, "value"+cnt2+":" + cnt));
    }
  }

  def isCollapsed: Boolean = {
        treeModel.getRootNode().hasChilds &&
        !treeModel.getRootNode().getExpanded()
  }


}