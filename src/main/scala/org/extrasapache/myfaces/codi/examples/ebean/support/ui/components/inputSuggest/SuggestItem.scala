package org.extrasapache.myfaces.codi.examples.ebean.support.ui.components.inputSuggest

import java.security.PublicKey

/**
 *
 * @author Werner Punz (latest modification by $Author$)
 * @version $Revision$ $Date$
 */
@serializable
class SuggestItem {
  /**
   * secondary constructor to ()
   */
  def this(theVal = "", lab = "", mark = "") {
    this()
    this.value = theVal
    this.label = lab
    this.markerClass = mark
  }

  var value = ""
  var label = ""
  var markerClass = ""
}