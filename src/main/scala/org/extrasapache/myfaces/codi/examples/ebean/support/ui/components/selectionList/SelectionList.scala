package org.extrasapache.myfaces.codi.examples.ebean.support.ui.components.selectionList

import javax.faces.model.SelectItem
import javax.faces.context.FacesContext
import collection.JavaConversions._
import collection.mutable.{HashMap, Buffer}
import org.extrasapache.myfaces.codi.examples.ebean.support.ui.components.common.StandardJavascriptComponent
import javax.faces.FacesException
import javax.faces.event._
import javax.faces.component.{UIComponent, UISelectItems, UISelectItem, FacesComponent}

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
  new ListenerFor(systemEventClass = classOf[PreRenderComponentEvent]),
  new ListenerFor(systemEventClass = classOf[PostRestoreStateEvent])
))
class SelectionList extends StandardJavascriptComponent {

  var appliedValue = false;

  import SelectionList._

  implicit def UISelectItem2SelectItem(in: UISelectItem): SelectionItem = {
    val ret = new SelectionItem()
    ret.setValue(in.getItemValue)
    ret.setLabel(in.getItemLabel)
    ret.setDisabled(in.isItemDisabled)
    ret.setDescription(in.getItemDescription)
    ret.setEscape(in.isItemEscaped)

    ret
  }

  implicit def SelectItem2SelectionItem(in: SelectItem): SelectionItem = new SelectionItem(in, "")

  override def processEvent(event: ComponentSystemEvent) {
    super.processEvent(event)
    event match {
      case evt: PostAddToViewEvent => {
        initModel()
      }
      case evt: PostRestoreStateEvent => {
        applyValue()
        appliedValue = true;
      }
      case evt: PreRenderComponentEvent => {
        if (!appliedValue)
          applyValue()
        initValueHolderValues()
      }
      case _ => null
    }

  }

  /**
   * we have to convert our standard jsf models to the models
   * we use internally, if not already done so
   *
   */
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
      if (children == null || children.size() == 0) return;
      val newModel = new java.util.ArrayList[SelectionItem](children.size())
      for (child <- children) {
        child match {
          //conversion done via an implicit conversion
          case x: UISelectItem => newModel.append(x)
          case x: UISelectItems => handleSelectItems(newModel, x)
        }
      }
      setAttr[java.util.ArrayList[SelectionItem]]("model", newModel)
    }
  }

  protected def handleSelectItems(targetModel: java.util.ArrayList[SelectionItem], items: UISelectItems) {
    items.getValue match {
      case items: java.util.Collection[SelectItem] => for (item <- items) targetModel.add(item)
    }

  }

  /**
   * we use the decode phase here to parse any passed content
   * to decode the passed values and transform them into the list
   * of select items we have as final value
   */

  def applyValue() {

    val attr: String = getAttr[String](VALUE_HOLDER, this.getClientId(FacesContext.getCurrentInstance) + ":" + this.getId + "_valueHolder")

    //attribute found we transform our request params into select items and then set the
    //the component values accordingly
    val requestValue = getReqAttr(attr)
    if (requestValue == null) {
      //no attribute found we return early
      return
    }

    transformValue(requestValue)

  }

  def transformValue(incomingStrValue: String) {

    val value = getVal()
    val modelIdx = getModelIdx()
    value.clear()

    for (item <- incomingStrValue.split(",") if modelIdx.get(item) != None) {
      value.add(modelIdx.get(item).get)
    }
  }

  def getModelIdx(): HashMap[String, SelectionItem] = {
    val modelIdx = new HashMap[String, SelectionItem]()
    val theModel: Buffer[SelectionItem] = getAttr[java.util.ArrayList[SelectionItem]]("model", new java.util.ArrayList[SelectionItem])

    for (item <- theModel) {
      modelIdx.put(item.getValue.toString, item)
    }
    modelIdx
  }

  def getVal(): java.util.List[SelectionItem] = {

    val theValue = getAttr[AnyRef](VALUE, new java.util.LinkedList[SelectionItem]())
    theValue match {
      case theVal: String => {
        setAttr[AnyRef](VALUE, new java.util.LinkedList[SelectionItem]())
        getAttr[java.util.LinkedList[SelectionItem]](VALUE, null)
      }
      case theVal: java.util.List[SelectionItem] => {
        theVal
      }
      case _ => theValue.asInstanceOf[java.util.List[SelectionItem]]
    }


  }

  def initValueHolderValues() {
    val attr: String = getAttr[String](VALUE_HOLDER, this.getClientId(FacesContext.getCurrentInstance) + ":" + this.getId + "_valueHolder")

    val requestValue = getReqAttr(attr)

    if (requestValue != null) setAttr[String](SELECTION_VALUE, requestValue)
    else {
      extractFromValue()
    }

  }

  private def extractFromValue() {
    val value = getVal()

    var finalVal = value.foldLeft(new StringBuffer)((target, singleVal) => {
      target.append(singleVal)
      target.append(",")
    }).toString
    finalVal = if (finalVal != "") finalVal.substring(finalVal.length() - 1) else finalVal
    setAttr[String](SELECTION_VALUE, finalVal)
  }
}