package org.extrasapache.myfaces.codi.examples.ebean.support.ui.components.datePicker

/**
 *
 * @author Werner Punz (latest modification by $Author$)
 * @version $Revision$ $Date$
 */

import java.util.logging.Logger
import org.junit.Test
import junit.framework.Assert._
import javax.faces.model.SelectItem
import org.extrasapache.myfaces.codi.examples.ebean.support.ui.components.tree.model.{TreeItem, ItemColl}

class ItemCollTest {
    var logger = Logger.getLogger("ItemCollTest")

    @Test
    def itemAppendTest() {
        logger.info("Starting Test")
        val probe = new ItemColl[SelectItem, TreeItem[SelectItem]]
        for(cnt <- 0 until 20) {
            var item = new SelectItem()
            item.setLabel("label"+cnt);
            item.setDescription("description"+cnt)
            var treeItem = new TreeItem[SelectItem]
            treeItem.value = item
            probe.set(treeItem)
        }
        for( cnt <- 0 until  20) {
            var item:TreeItem[SelectItem] = probe.childs.get(cnt);
            assertTrue("probe in correct order", "label"+cnt == item.label)
        }
        
        
    }

}