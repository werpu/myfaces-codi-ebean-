package debug

import org.extrasapache.myfaces.codi.examples.ebean.support.ui.components.inputSuggest.{SuggestItem, SimpleListSuggestModel}

/**
 *
 * @author Werner Punz (latest modification by $Author$)
 * @version $Revision$ $Date$
 */

class MySuggestModel extends SimpleListSuggestModel() {
   /*we generate a list of items with item as key and label as text*/
   for(cnt <- 0 until 100) {
     val oddOrEven =  if((cnt %2) != 0) "odd" else "even"
     super.items += new SuggestItem("item_"+cnt,"Label"+cnt, oddOrEven )
   }
}