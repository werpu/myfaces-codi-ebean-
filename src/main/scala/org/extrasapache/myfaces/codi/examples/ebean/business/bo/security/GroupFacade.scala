package org.extrasapache.myfaces.codi.examples.ebean.business.bo.security

import org.extrasapache.myfaces.codi.examples.ebean.business.bo.common.FacadeBase
import org.extrasapache.myfaces.codi.examples.ebean.orm.security.SecGroup

import java.util._

import collection.mutable.ArrayBuffer
import com.avaje.ebean.annotation.Transactional
import collection.JavaConversions._
import javax.enterprise.context.Dependent
import javax.inject.Named

/**
 *
 * @author Werner Punz (latest modification by $Author$)
 * @version $Revision$ $Date$
 */

@Named
@Dependent
@serializable
class GroupFacade extends FacadeBase[SecGroup] {
  clazz = classOf[SecGroup]

  def createGroup: SecGroup = new SecGroup

  def loadByIdsStr(ids: Collection[String]): List[SecGroup] = {
    import java.lang.Long._
    val ret: List[Long] = asCollection(ids).foldLeft(new ArrayBuffer[Long]) {
      (coll, item) => {
        coll += parseLong(item)
        coll
      }
    }

    loadByIds(ret)
  }

  def loadByIds(ids: Collection[Long]): List[SecGroup] = {
    val query = em.createQuery(clazz)
    query.where().in("id", ids)
    query.findList
  }

  @Transactional
  def saveAll(groups: Collection[SecGroup]) {
    for (group <- asCollection(groups)) em.save(group)
  }

  def deleteGroup(group: SecGroup) = delete(group)



}