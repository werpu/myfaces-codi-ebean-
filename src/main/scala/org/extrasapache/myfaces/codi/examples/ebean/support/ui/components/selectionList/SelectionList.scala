package org.extrasapache.myfaces.codi.examples.ebean.support.ui.components.selectionList

import javax.faces.model.SelectItem
import javax.faces.context.FacesContext
import collection.JavaConversions._
import collection.mutable.{HashMap, Buffer}
import org.extrasapache.myfaces.codi.examples.ebean.support.ui.components.common.StandardJavascriptComponent
import javax.faces.event.{ComponentSystemEvent, PostAddToViewEvent, ListenerFor}
import javax.faces.component.{UISelectItems, UISelectItem, FacesComponent}
import javax.faces.FacesException
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
}

@FacesComponent("at.irian.SelectionList")
@serializable
@ListenerFor(systemEventClass = classOf[PostAddToViewEvent])
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

  implicit def SelectItem2SelectItem(in: SelectItem): SelectionItem = new SelectionItem(in,"")

  override def processEvent(event: ComponentSystemEvent) {
    event match {
      case evt: PostAddToViewEvent => {
        initModel()
      }
      case _ => null
    }
    super.processEvent(event)
  }

  protected def initModel() {
    val model = getAttr[java.util.ArrayList[AnyRef]]("model", null)
    if (model != null) {
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
      if (children == null) return;
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
    theModel.foreach(item => {
      modelIdx.put(item.getValue.toString, item)
    })

    val value = getAttr[java.util.List[SelectionItem]](VALUE, null)
    value.clear()
    //TODO getting an error here

    for (item <- requestValue.split(",")) {
      value.add(modelIdx.get(item).get)
    }

  }

}