package debug.treetest

import org.extrasapache.myfaces.codi.examples.ebean.support.ui.components.tree.model.{SimpleTreeModel, TreeItem}
import javax.inject.Named
import org.apache.myfaces.extensions.cdi.core.api.scope.conversation.ViewAccessScoped

/**
 *
 * @author Werner Punz (latest modification by $Author$)
 * @version $Revision$ $Date$
 */
@serializable
@Named
@ViewAccessScoped
class TestTreeModel extends SimpleTreeModel[String] {
    var tree = new TreeItem[String]


    tree.setLabel("Tree");
    tree.setDescription("Tree")

    this.setRootNode(tree)
    for (cnt2 <- 1 to 10) {
        val tree2 = tree.append("identifier_" + cnt2, "value" + cnt2, "value" + cnt2)
        updateIdx(tree2)

        for (cnt <- 1 to 10) {
            updateIdx(tree2.append("identifier_" + cnt2 + ":" + cnt, "value" + cnt2 + ":" + cnt, "value" + cnt2 + ":" + cnt));
        }
    }

    def isCollapsed: Boolean = {
        getRootNode().hasChilds && !getRootNode().getExpanded()
    }
}