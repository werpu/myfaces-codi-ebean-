package org.extrasapache.myfaces.codi.examples.ebean.support.ui.components.common

import javax.faces.component.UISelectItem
import org.extrasapache.myfaces.codi.examples.ebean.support.ui.components.selectionList.SelectionItem
import javax.faces.model.SelectItem

/**
 *
 * @author Werner Punz (latest modification by $Author$)
 * @version $Revision$ $Date$
 *
 * Various ui modem conversions
 */

object UIConversions {
  implicit def UISelectItem2SelectItem(in: UISelectItem): SelectionItem = {
       val ret = new SelectionItem()
       ret.setValue(in.getItemValue)
       ret.setLabel(in.getItemLabel)
       ret.setDisabled(in.isItemDisabled)
       ret.setDescription(in.getItemDescription)
       ret.setEscape(in.isItemEscaped)

       ret
     }

     implicit def SelectItem2SelectionItem(in: SelectItem): SelectionItem = new SelectionItem(in, "")

}