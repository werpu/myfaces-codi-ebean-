package org.extrasapache.myfaces.codi.examples.ebean.view.security

import javax.faces.bean.ApplicationScoped
import javax.inject.Named
import java.util._
import javax.faces.model.SelectItem
import reflect.BeanProperty
import org.extrasapache.myfaces.codi.examples.ebean.orm.security.SecGroupConst._
import collection.mutable.ArrayBuffer

import collection.JavaConversions._

/**
 *
 * @author Werner Punz (latest modification by $Author$)
 * @version $Revision$ $Date$
 */

@ApplicationScoped
@Named
@serializable
class GroupTypes {
  @BeanProperty
  var allGroupTypes: List[SelectItem] =  ArrayBuffer[SelectItem](
    new SelectItem(GRP_TYPE_SYSTEM, "System"),
    new SelectItem(GRP_TYPE_USER, "User"),
    new SelectItem(GRP_TYPE_OTHER, "Other")
  )
}