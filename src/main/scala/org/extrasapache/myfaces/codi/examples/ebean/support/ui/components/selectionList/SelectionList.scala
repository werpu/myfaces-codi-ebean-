package org.extrasapache.myfaces.codi.examples.ebean.support.ui.components.selectionList

import javax.faces.component.{UINamingContainer, FacesComponent}
import javax.faces.model.SelectItem
import javax.faces.context.FacesContext
import collection.JavaConversions._
import collection.mutable.{HashMap, Buffer}
import org.extrasapache.myfaces.codi.examples.ebean.support.ui.components.common.{StandardJavascriptComponent, JavascriptComponent, AttributeHandler}

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
class SelectionList extends StandardJavascriptComponent {

  import SelectionList._

  /**
   * we use the decode phase here to parse any passed content
   * to decode the passed values and transform them into the list
   * of select items we have as final value
   */

  override def decode(context: FacesContext) {
    super.decode(context)
    val attr: String = getAttr[String](VALUE_HOLDER, this.getClientId(context)+":"+this.getId + "_valueHolder")


    //attribute found we transform our request params into select items and then set the
    //the component values accordingly
    val requestValue = getReqAttr(attr)
    if (requestValue == null) {
      //no attribute found we return early
      return
    }

    val modelIdx = new HashMap[String, SelectItem]()
    val theModel: Buffer[SelectItem] = getAttr[java.util.ArrayList[SelectItem]]("model", null)
    theModel.foreach(item => {
      modelIdx.put(item.getValue.toString, item)
    })

    val value = getAttr[java.util.List[SelectItem]](VALUE, null)
    value.clear()

    for(item <- requestValue.split(",")) {
       value.add(modelIdx.get(item).get)
    }

  }

}