package org.extrasapache.myfaces.codi.examples.ebean.support.ui.components.inputSuggest

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
  def this(theVal:String = "", lab:String = "", mark:String = "") {
    this()
    this.value = theVal
    this.label = lab
    this.markerClass = mark
  }

  var value = ""
  var label = ""
  var markerClass = ""
}