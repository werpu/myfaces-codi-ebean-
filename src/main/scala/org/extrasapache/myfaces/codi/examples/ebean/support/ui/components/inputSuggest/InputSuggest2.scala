package org.extrasapache.myfaces.codi.examples.ebean.support.ui.components.inputSuggest

import org.extrasapache.myfaces.codi.examples.ebean.support.ui.components.common.StandardJavascriptComponent
import org.extrasapache.myfaces.codi.examples.ebean.support.data.InputSuggestController
import javax.faces.FacesException
import javax.faces.event._
import org.extrasapache.myfaces.codi.examples.ebean.support.ui.components.common.UIConversions._

import java.util.LinkedList
import javax.faces.model.SelectItem
import javax.faces.component._
import collection.JavaConversions._
import org.extrasapache.myfaces.codi.examples.ebean.support.ui.components.popup.Popup
import org.extrasapache.myfaces.codi.examples.ebean.support.ui.components.selectionList.{SelectionList, SelectionItem}

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
  val SELECTION_VALUE="selectionValue"
}

@FacesComponent("at.irian.InputSuggest")
@serializable
@ListenersFor(Array(
  new ListenerFor(systemEventClass = classOf[PostAddToViewEvent])
))
class InputSuggest2 extends StandardJavascriptComponent {

  var placeHolder: UIComponent = _
  var valHolder: UIInput = _
  var _model: InputSuggestController[_, _] = _

  import InputSuggest2._

  override def processEvent(event: ComponentSystemEvent) {
    event match {
      case evt: PostAddToViewEvent => {
        //we default the value for the selection list to an empty value

        initModel()
      }
      case evt: PreRenderComponentEvent => {
        prerenderComponent(evt)
      }
      case _ => null
    }
    super.processEvent(event)
  }
  //TODO we have to transform embedded selection lists into a simple model if given


   /**
   * we have to convert our standard jsf models to the models
   * we use internally, if not already done so
   *
   */
  protected def initModel() {
    val model = getAttr[SuggestModel](TABLEMODEL, null)
    if(model == null) {

      val children = getChildren
      if (children == null || children.size() == 0) return;
      val newModel = new SimpleListSuggestModel()
      for (child <- children) {
        child match {
          //conversion done via an implicit conversion
          case x: UISelectItem => newModel.addItem(x)
          case x: UISelectItems => handleSelectItems(newModel.getItems(), x)
        }
      }
      setAttr[SuggestModel]("model", newModel)
    }
    setAttr[java.util.LinkedList[SelectionItem]](SELECTION_VALUE, new java.util.LinkedList[SelectionItem]())

  }

 protected def handleSelectItems(targetModel: java.util.Collection[SelectionItem], items: UISelectItems) {
    items.getValue match {
      case items: java.util.Collection[SelectItem] => for (item <- items) targetModel.add(item)
    }
  }

  /**
   * a suggest is very simple we fetch the current input value
   * and from upon it we prefilter our model
   * before it is rendered
   */
  def prerenderComponent(event: ComponentSystemEvent) {
    val isAjaxSearch = getReqAttr("mf_ajaxSearch");
    if (isAjaxSearch == null) return;
    var model = getAttr[SuggestModel](TABLEMODEL, null);
    if (model == null) throw new FacesException("Model on input suggest not set")
    var value = getAttr[String]("value", "");
    model.filter(value)
    //TODO set the component of the child as well anew
    val selectionList = findComponent("input_popup").findComponent("selection_panel").asInstanceOf[SelectionList]
    selectionList.setAttr[String]("childChangeListener", this.getClientId)
  }

}