package org.extrasapache.myfaces.codi.examples.ebean.support.ui.components.inputSuggest

import collection.JavaConversions._
import collection.mutable.ArrayBuffer

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

  protected var items = new ArrayBuffer[SuggestItem]()
  private val shadowItems = new ArrayBuffer[SuggestItem](items.size)

  shadowItems.appendAll(items)

  def getItems(): java.util.Collection[SuggestItem] = items

  def filter(itemFilter: String) {
    items = shadowItems.filter(item => item.label.startsWith(itemFilter))
  }
}