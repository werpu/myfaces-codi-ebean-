package org.extrasapache.myfaces.codi.examples.ebean.support.ui.components.inputDate

import org.extrasapache.myfaces.codi.examples.ebean.support.ui.components.datePicker.DatePicker
import javax.faces.component.FacesComponent
import javax.faces.event.ListenerFor._
import javax.faces.event._

/**
 *
 * @author Werner Punz (latest modification by $Author$)
 * @version $Revision$ $Date$
 */
@FacesComponent("at.irian.InputDate")
@serializable
@ListenersFor(Array(
  new ListenerFor(systemEventClass = classOf[PostRestoreStateEvent]),
  new ListenerFor(systemEventClass = classOf[PostAddToViewEvent])
))
class InputDate extends DatePicker{
  override def processEvent(event: ComponentSystemEvent)  {
    event match {
      case evt: PostAddToViewEvent => {
        datePicker.valHolder.setConverter(valHolder.getConverter)
      }
      case _ => null
    }

    super.processEvent(event)
  }


  def datePicker: DatePicker = {
    findComponent("date_popup").findComponent("date_panel") match {
      case comp:DatePicker=>comp
      case _ => null
    }
  }

}