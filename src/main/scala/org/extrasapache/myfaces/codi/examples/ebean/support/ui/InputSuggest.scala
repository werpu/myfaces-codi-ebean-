package org.extrasapache.myfaces.codi.examples.ebean.support.ui

import scala.collection.JavaConversions._
import javax.faces.component.{UIComponent, UINamingContainer, FacesComponent}
import javax.faces.event.ComponentSystemEvent
import javax.faces.context.FacesContext

/**
 *
 * @author Werner Punz (latest modification by $Author$)
 * @version $Revision$ $Date$
 */
@serializable
object InputSuggest {

  val VALUE = "value"
  val ID = "id"
  val LABEL = "label"
  val TABLEMODEL = "model"
  val LABELSTYLECLASS = "labelStyleClass"
  val INPUTSTYLECLASS = "inputStyleClass"

}

@FacesComponent("at.irian.InputSuggest")
@serializable
class InputSuggest extends UINamingContainer with AttributeHandler {

  import InputSuggest._

  //TODO add an alias for the model to #{model} to our component
  //so that the facet can use it easily

}