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

/**
 * tests the collection
 * operations
 */
class ItemCollTest {
    var logger = Logger.getLogger("ItemCollTest")

    def setup(): ItemColl[SelectItem, TreeItem[SelectItem]] = {
        val probe = new ItemColl[SelectItem, TreeItem[SelectItem]]
        for (cnt <- 0 until 20) {
            var item = new SelectItem()
            item.setLabel("label" + cnt);
            item.setDescription("description" + cnt)
            var treeItem = new TreeItem[SelectItem]
            treeItem.setValue( item)
            probe.set(treeItem)
        }
        probe
    }

    @Test
    def itemAppendTest() {
        logger.info("Starting Test")
        val probe = setup()
        for (cnt <- 0 until 20) {
            val item: TreeItem[SelectItem] = probe.childs.get(cnt);
            assertTrue("probe in correct order", "label" + cnt == item.getLabel)
        }
    }


    @Test
    def itemIndexTest() {
        logger.info("Starting Test")
        val probe = setup()
        for (cnt <- 0 until 20) {
            var item: TreeItem[SelectItem] = probe.childs.get(cnt);
            var pos = probe.childIdx.get(item.getLabel).get;
            assertTrue("position must be stored in the index", pos == cnt);
        }
    }

    @Test
    def moveUpTest() {
        logger.info("Starting Test")
        val probe = setup()
        val second = probe.childs.get(1);
        var first = probe.childs.get(0);
        probe.up(second);
        val newPos = probe.childs.get(0);
        val newPosFirst = probe.childs.get(1);
        assertTrue("probes must be the same", newPos eq second);
        assertTrue("probes must be the same 2", first eq newPosFirst);

        //we now have to check the indexes
        val firstPos: Int = probe.childIdx.get(first.getLabel).get
        val secondPos: Int = probe.childIdx.get(second.getLabel).get
        assertTrue("probe indexes must be at the correct position", firstPos == 1)
        assertTrue("probe indexes must be at the correct position", secondPos == 0)


    }

    @Test
    def moveDownTest() {
        logger.info("Starting Test")
        val probe = setup()
        val second = probe.childs.get(0);
        var first = probe.childs.get(1);
        probe.down(second);
        val newPos = probe.childs.get(1);
        val newPosFirst = probe.childs.get(0);
        assertTrue("probes must be the same", newPos eq second);
        assertTrue("probes must be the same 2", first eq newPosFirst);

        //we now have to check the indexes
        val firstPos: Int = probe.childIdx.get(first.getLabel).get
        val secondPos: Int = probe.childIdx.get(second.getLabel).get
        assertTrue("probe indexes must be at the correct position", firstPos == 0)
        assertTrue("probe indexes must be at the correct position", secondPos == 1)

    }

    @Test
    def removeTest() {
        logger.info("Starting Test")
        val probe = setup()
        var first = probe.childs.get(1);
        var len1 = probe.childs.size()
        var len2 = probe.childIdx.size

        probe.remove(first);

        assertTrue("probe now must be removed 1", probe.childs.size() == len1-1)
        assertTrue("probe now must be removed 2", probe.childIdx.size == len2-1)
        var cnt = 0
        for(cnt <- 0 until  probe.childs.size()) {
            val child = probe.childs.get(cnt)
            val pos = probe.childIdx.get(child.getLabel).get
            assertTrue("index position must be correct", pos == cnt)
        }
    }


}