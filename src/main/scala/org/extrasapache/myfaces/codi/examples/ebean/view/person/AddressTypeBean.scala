package org.extrasapache.myfaces.codi.examples.ebean.view.person

import javax.faces.bean.{ManagedBean, SessionScoped}
import javax.faces.model.SelectItem
import org.extrasapache.myfaces.codi.examples.ebean.support.data.AddressType
/**
 *
 * @author Werner Punz (latest modification by $Author$)
 * @version $Revision$ $Date$
 */

@ManagedBean
@SessionScoped
@serializable
class AddressTypeBean  {

  val addressTypes: java.util.List[SelectItem] = {
    //we use the foldLeft here because it is faster than map
    AddressType.values.foldLeft(new java.util.LinkedList[SelectItem]) ((target, item) => {
      target.add(new SelectItem(item.getKey, item.getValue.toString))
      target
    })
  }
}