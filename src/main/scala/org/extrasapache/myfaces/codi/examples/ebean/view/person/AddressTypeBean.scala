package org.extrasapache.myfaces.codi.examples.ebean.view.person

import javax.faces.bean.{ManagedBean, SessionScoped}
import javax.faces.model.SelectItem
import reflect.BeanProperty
import org.extrasapache.myfaces.codi.examples.ebean.support.data.AddressType
import java.io.Serializable

/**
 *
 * @author Werner Punz (latest modification by $Author$)
 * @version $Revision$ $Date$
 */

@ManagedBean
@SessionScoped
class AddressTypeBean extends Serializable {
  @BeanProperty val addressTypes: java.util.List[SelectItem] = {
    AddressType.values.foldLeft(new java.util.LinkedList[SelectItem]) ((target, item) => {
      target.add(new SelectItem(item.getKey, item.getValue.toString))
      target
    })
  }
}