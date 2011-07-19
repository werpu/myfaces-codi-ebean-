package org.extrasapache.myfaces.codi.examples.ebean.support.ui.components.inputSuggest

import collection.JavaConversions._
import collection.mutable.ArrayBuffer
import org.extrasapache.myfaces.codi.examples.ebean.support.ui.components.selectionList.SelectionItem

/**
 *
 * @author Werner Punz (latest modification by $Author$)
 * @version $Revision$ $Date$
 *
 * A simple list model which is the base for the simplest usecase
 * it can be used as a blueprint for more sophisticated suggest
 * models which go straight into the db or caches
 */

class SimpleListSuggestModel extends SuggestModel {

  protected var items: ArrayBuffer[SelectionItem] = _
  protected var shadowItems: ArrayBuffer[SelectionItem] = _

  def getItems(): java.util.Collection[SelectionItem] = items

  def filter(itemFilter: String) {
    items = shadowItems.filter(item => item.getLabel.startsWith(itemFilter))
  }
}