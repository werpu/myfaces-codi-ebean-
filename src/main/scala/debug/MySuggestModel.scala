package debug

import org.extrasapache.myfaces.codi.examples.ebean.support.ui.components.inputSuggest.SimpleListSuggestModel
import collection.JavaConversions._
import collection.mutable.ArrayBuffer
import org.extrasapache.myfaces.codi.examples.ebean.support.ui.components.selectionList.SelectionItem

/**
 *
 * @author Werner Punz (latest modification by $Author$)
 * @version $Revision$ $Date$
 */
class MySuggestModel extends SimpleListSuggestModel() {
   /*we generate a list of items with item as key and label as text*/
    shadowItems = (0 until 100).foldLeft(new ArrayBuffer[SelectionItem]) ((buf, cnt) => {
     val item = new SelectionItem()
     item.setValue("val"+cnt)
     item.setLabel("label"+cnt)
     item.markerClass = if((cnt %2) != 0) "odd" else "even"
     buf += item
   })
}