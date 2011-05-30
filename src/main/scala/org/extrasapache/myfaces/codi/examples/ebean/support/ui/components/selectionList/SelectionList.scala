package org.extrasapache.myfaces.codi.examples.ebean.support.ui.components.selectionList

import javax.faces.component.{UINamingContainer, FacesComponent}
import org.extrasapache.myfaces.codi.examples.ebean.support.ui.components.common.{AttributeHandler, RequestHandler}
import javax.faces.model.SelectItem
import javax.faces.context.FacesContext
import collection.JavaConversions._
import collection.mutable.{ArrayBuffer, HashMap, Buffer}

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
class SelectionList extends UINamingContainer with AttributeHandler with RequestHandler {

  import SelectionList._

  /**
   * we use the decode phase here to parse any passed content
   * to decode the passed values and transform them into the list
   * of select items we have as final value
   */

  override def decode(context: FacesContext) {
    import java.util.Map

    super.decode(context)
    val attr: String = getAttr[String](VALUE_HOLDER, this.getClientId(context) + "_valueHolder")
    if (attr == null) {
      //no attribute found we return early
      return
    }

    //attribute found we transform our request params into select items and then set the
    //the component values accordingly
    val requestValue = getReqAttr(attr)

    val modelIdx = new HashMap[String, SelectItem]()

    getAttr[Buffer[SelectItem]]("model", null).foreach(item => {
      modelIdx.put(item.getLabel, item)
    })

    val resBuffer = requestValue.split(",").map(item => {
       modelIdx.get(item).get
    }).toBuffer[SelectItem]

    setAttr[java.util.List[SelectItem]](VALUE, resBuffer)
  }

}