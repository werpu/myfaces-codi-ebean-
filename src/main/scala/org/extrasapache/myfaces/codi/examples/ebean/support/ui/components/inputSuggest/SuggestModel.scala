package org.extrasapache.myfaces.codi.examples.ebean.support.ui.components.inputSuggest

import java.util.Collection
/**
 *
 * @author Werner Punz (latest modification by $Author$)
 * @version $Revision$ $Date$
 *
 * A suggest model for our input suggest
 * which consists of a set if items
 * and a filter method which prefilters the items
 */
@serializable
abstract class SuggestModel {
  def filter(itemFilter: String);
  def getItems(): Collection[SuggestItem]
}