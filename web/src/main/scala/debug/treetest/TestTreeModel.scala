package debug.treetest

import org.extrasapache.myfaces.codi.examples.ebean.support.ui.components.tree.model.{SimpleTreeModel, TreeItem}
import javax.enterprise.context.SessionScoped
import javax.faces.bean.ManagedBean

/**
 *
 * @author Werner Punz (latest modification by $Author$)
 * @version $Revision$ $Date$
 */
@ManagedBean
@SessionScoped
class TestTreeModel extends SimpleTreeModel[String] {
    var tree = new TreeItem[String]


    tree.setLabel("Tree");
    tree.setDescription("Tree")

    this.setRootNode(tree)
    for (cnt2 <- 1 to 10) {
        val tree2 = tree.append("identifier" + cnt2 + "_1", "value" + cnt2 + "_1", "value" + cnt2 + "_1")
        updateIdx(tree2)

        for (cnt <- 1 to 10) {
            updateIdx(tree2.append("identifier" + cnt + "_1", "value" + cnt + "_1", "value" + cnt + "_1"));
        }
    }

    def isCollapsed: Boolean = {
        getRootNode().hasChilds && !getRootNode().getExpanded()
    }
}