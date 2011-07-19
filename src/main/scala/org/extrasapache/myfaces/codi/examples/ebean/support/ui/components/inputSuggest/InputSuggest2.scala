package org.extrasapache.myfaces.codi.examples.ebean.support.ui.components.inputSuggest

import javax.faces.event.ListenerFor._
import org.extrasapache.myfaces.codi.examples.ebean.support.ui.components.common.StandardJavascriptComponent
import javax.faces.component.{UIInput, UIComponent, FacesComponent}
import org.extrasapache.myfaces.codi.examples.ebean.support.data.InputSuggestController
import javax.faces.event.{ComponentSystemEvent, PostAddToViewEvent, ListenerFor}
import javax.faces.FacesException

/**
 *
 * @author Werner Punz (latest modification by $Author$)
 * @version $Revision$ $Date$
 *
 * Revised simplified version of our input suggest (the first version)
 */
@serializable
object InputSuggest2 {

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

  val VALUE_HOLDER = "input"
}

@FacesComponent("at.irian.InputSuggest")
@serializable
@ListenerFor(systemEventClass = classOf[PostAddToViewEvent])
class InputSuggest2 extends StandardJavascriptComponent {

  import InputSuggest2._

  var placeHolder: UIComponent = _
  var valHolder: UIInput = _
  var _model: InputSuggestController[_, _] = _

  override def processEvent(event: ComponentSystemEvent) {
    event match {
      case evt: PostAddToViewEvent => {

      }
      case _ => null
    }
    super.processEvent(event)
  }

  def initModel() {
    var model = getAttr[SuggestModel]("model", null);
    model = if(model != null) model else {
      //TODO check for existing select items and transform them into a model
      null
    }
    setAttr[SuggestModel]("model", model)
  }

  /**
   * a suggest is very simple we fetch the current input value
   * and from upon it we prefilter our model
   * before it is rendered
   */
  def prerenderComponent(event: ComponentSystemEvent) {
    val isAjaxSearch = getReqAttr("mf_ajaxSearch");
    if (isAjaxSearch == null) return;
    var model = getAttr[SuggestModel]("model", null);
    if (model == null) throw new FacesException("Model on input suggest not set")
    var value = getAttr[String]("value", "");
    model.filter(value)
  }

}