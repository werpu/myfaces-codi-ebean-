package org.extrasapache.myfaces.codi.examples.ebean.support.ui

import javax.faces.event.ComponentSystemEvent
import javax.faces.context.FacesContext
import org.extrasapache.myfaces.codi.examples.ebean.support.data.InputSuggestController

import scala.collection.mutable._
import scala.collection.JavaConversions._
import reflect.BeanProperty
import javax.faces.component.{UIInput, UIComponent, UINamingContainer, FacesComponent}

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

  val REQ_MARKER = "ez_typeahead"
  val LINE_MARKER = "ez_typeahead_line"

  val ATTR_MODEL = "model"
  val ATTR_INPUT_VALUE = "inputValue"
}

@FacesComponent("at.irian.InputSuggest")
@serializable
class InputSuggest extends UINamingContainer with AttributeHandler {

  import InputSuggest._

  var placeHolder:UIComponent = _
  var valueHolder:UIInput = _

  /**
   * note we do not use
   * the state helper here to prevent the model to be savestated
   */
  var _model: InputSuggestController[_, _] = _

  def model: InputSuggestController[_, _] = {
    if (_model != null) _model else getAttr[InputSuggestController[_, _]]("model", null)
  }

  def model_$eq(theModel: InputSuggestController[_, _]) = _model = theModel

  def preRenderComponent(ev: ComponentSystemEvent) {
    val model2 = getAttr[AnyRef](ATTR_MODEL, null)

    if (model != null) {
      /**
       * we can use the def functionality to remap
       * our accessor namespace
       * in a tight manner
       **/
      def req_map: Map[String, String] = FacesContext.getCurrentInstance.getExternalContext.getRequestParameterMap

      val req_marker = req_map.get(REQ_MARKER)
      val line_no = req_map.get(LINE_MARKER)
      val theModel = model
      if (req_marker != None && line_no != None) {
        //line handling triggered
        theModel.selectedLine = line_no.get.toInt
        theModel.fromLineToValue
      } else if (req_marker != None) {
        theModel.refreshCurrentResults()
      }
    }
  }
}