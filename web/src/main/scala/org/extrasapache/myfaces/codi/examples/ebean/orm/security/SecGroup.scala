package org.extrasapache.myfaces.codi.examples.ebean.orm.security

import javax.persistence._
import org.extrasapache.myfaces.codi.examples.ebean.support.data.StdEntity

import java.util._

/**
 *
 * @author Werner Punz (latest modification by $Author$)
 * @version $Revision$ $Date$
 */
object SecGroupConst {
  val GRP_TYPE_SYSTEM = 0
  val GRP_TYPE_USER = 1
  val GRP_TYPE_OTHER = 2
}

@Entity
@Table(name = "o_secgroup")
@serializable
class SecGroup extends StdEntity {


  var groupType: Int = SecGroupConst.GRP_TYPE_SYSTEM


  var groupName: String = _


  var description: String = _

  @ManyToMany(fetch = FetchType.LAZY, cascade = Array(CascadeType.MERGE, CascadeType.REFRESH))
  var credentialOwners: List[User] = _
}

