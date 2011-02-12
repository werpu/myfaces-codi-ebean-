package org.extrasapache.myfaces.codi.examples.ebean.support.ui

import javax.faces.component.{UINamingContainer, FacesComponent}

/**
 *
 * @author Werner Punz (latest modification by $Author$)
 * @version $Revision$ $Date$
 */

object TypeAhead {

  val VALUE = "value"
  val ID = "id"
  val LABEL = "label"
  val TABLEMODEL = "model"
  val LABELSTYLECLASS = "labelStyleClass"
  val INPUTSTYLECLASS = "inputStyleClass"

}

@FacesComponent("at.irian.TypeAhead")
@serializable
class TypeAhead extends UINamingContainer with AttributeHandler {

  import TypeAhead._

  /**
   * event handler which is triggered after the paginator is added to the component tree
   */
  def afterAddToComponentTree() {
    //TODO find facet name = preview and append it as child in the placeholder of the template
  }

}