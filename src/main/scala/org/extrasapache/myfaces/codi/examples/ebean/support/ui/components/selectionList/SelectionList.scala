package org.extrasapache.myfaces.codi.examples.ebean.support.ui.components.selectionList

import javax.faces.model.SelectItem
import javax.faces.context.FacesContext
import collection.JavaConversions._
import collection.mutable.{HashMap, Buffer}
import org.extrasapache.myfaces.codi.examples.ebean.support.ui.components.common.StandardJavascriptComponent
import javax.faces.FacesException
import javax.faces.component.{UIInput, UISelectItems, UISelectItem, FacesComponent}
import reflect.BeanProperty
import javax.faces.event._

/**
 *
 * @author Werner Punz (latest modification by $Author$)
 * @version $Revision$ $Date$
 */
@serializable
object SelectionList {
  val VALUE = "value"
  val ID = "id"
  val MODEL = "model"
  val MULTI_SELECT = "multiSelect"
  val STYLE = "style"
  val STYLE_CLASS = "styleClass"
  val VALUE_HOLDER = "valueHolder"
  val _MODEL_IDX = "_modelIDX"
  val SELECTION_VALUE = "selectionValue"
}

@FacesComponent("at.irian.SelectionList")
@serializable
@ListenersFor(Array(
  new ListenerFor(systemEventClass = classOf[PostAddToViewEvent]),
  new ListenerFor(systemEventClass = classOf[PreRenderComponentEvent])
  ))
class SelectionList extends StandardJavascriptComponent {


  import SelectionList._

  implicit def UISelectItem2SelectItem(in: UISelectItem): SelectionItem = {
    val ret = new SelectionItem()
    ret.setValue(in.getValue)
    ret.setLabel(in.getItemLabel)
    ret.setDisabled(in.isItemDisabled)
    ret.setDescription(in.getItemDescription)
    ret.setEscape(in.isItemEscaped)

    ret
  }

  implicit def SelectItem2SelectItem(in: SelectItem): SelectionItem = new SelectionItem(in, "")

  override def processEvent(event: ComponentSystemEvent) {
    event match {
      case evt: PostAddToViewEvent => {
        initModel()
      }
      case evt: PreRenderComponentEvent => {
        initValues()
      }
      case _ => null
    }
    super.processEvent(event)
  }

  /**
   * we have to convert our standard jsf models to the models
   * we use internally, if not already done so
   *
   */
  protected def initModel() {
    val model = getAttr[java.util.ArrayList[AnyRef]]("model", null)
    if (model != null) {
      // model match {
      //   case m:java.util.ArrayList[SelectionItem] => return
      //   case _ =>
      // }

      val newModel = new java.util.ArrayList[SelectionItem](model.size())
      for (item <- model) {
        item match {
          case x: SelectionItem => newModel.append(x)
          case y: SelectItem => newModel.append(y)
          case _ => throw new FacesException("Selection List Element must be derived from SelectItem")
        }
      }
      setAttr[java.util.ArrayList[SelectionItem]]("model", newModel)
    } else {
      var children = getChildren
      if (children == null || children.size() == null) return;
      val newModel = new java.util.ArrayList[SelectionItem](children.size())
      for (child <- children) {
        child match {
          //conversion done via an implicit conversion
          case x: UISelectItem => newModel.append(x)
          case x: UISelectItems => handleSelectItems(newModel, x)
          case _ =>; //do nothing because other childs are visual
        }
      }
      setAttr[java.util.ArrayList[SelectionItem]]("model", newModel)
    }
  }

  protected def handleSelectItems(targetModel: java.util.ArrayList[SelectionItem], items: UISelectItems) {
    items.getValue match {
      case items: java.util.Collection[SelectItem] => for (item <- items) targetModel.add(item)
      case _ =>;
    }

  }

  /**
   * we use the decode phase here to parse any passed content
   * to decode the passed values and transform them into the list
   * of select items we have as final value
   */

  override def decode(context: FacesContext) {
    super.decode(context)
    val attr: String = getAttr[String](VALUE_HOLDER, this.getClientId(context) + ":" + this.getId + "_valueHolder")


    //attribute found we transform our request params into select items and then set the
    //the component values accordingly
    val requestValue = getReqAttr(attr)
    if (requestValue == null) {
      //no attribute found we return early
      return
    }

    val modelIdx = new HashMap[String, SelectionItem]()
    val theModel: Buffer[SelectionItem] = getAttr[java.util.ArrayList[SelectionItem]]("model", null)


    val value = getAttr[java.util.List[SelectionItem]](VALUE, null)
    value.clear()
    //TODO getting an error here


    for (item <- requestValue.split(",")) {
      if (modelIdx.get(item) != None) value.add(modelIdx.get(item).get)
    }

  }

  def initValues() {
    val attr: String = getAttr[String](VALUE_HOLDER, this.getClientId(FacesContext.getCurrentInstance) + ":" + this.getId + "_valueHolder")


    //attribute found we transform our request params into select items and then set the
    //the component values accordingly
    val requestValue = getReqAttr(attr)

    if (requestValue == null) return else setAttr[String](SELECTION_VALUE, requestValue)

  }

}