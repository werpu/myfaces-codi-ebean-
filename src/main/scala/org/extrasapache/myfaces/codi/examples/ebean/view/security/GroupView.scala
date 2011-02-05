package org.extrasapache.myfaces.codi.examples.ebean.view.security

import org.apache.myfaces.extensions.cdi.core.api.scope.conversation.ViewAccessScoped
import org.extrasapache.myfaces.codi.examples.ebean.business.bo.security.GroupFacade
import javax.inject.{Inject, Named}
import org.apache.myfaces.extensions.cdi.core.api.logging.Logger
import org.extrasapache.myfaces.codi.examples.ebean.orm.security.SecGroup
import reflect.BeanProperty

import java.util._
import scala.math._
import org.extrasapache.myfaces.codi.examples.ebean.business.util.FilterEntry
import org.apache.myfaces.extensions.cdi.core.api.config.view.ViewConfig
import org.extrasapache.myfaces.codi.examples.ebean.support.data.{StdEntity, PaginationController, SpreadSheetController}
import collection.mutable.{Buffer, ArrayBuffer}
import collection.JavaConversions._

/**
 *
 * @author Werner Punz (latest modification by $Author$)
 * @version $Revision$ $Date$
 */

trait GroupViewModel {
  @Inject
  var groupFacade: GroupFacade = _

  @Inject
  @BeanProperty
  var searchData: GroupListSearchModel = _

  @Inject
  @BeanProperty
  var spreadSheetController: SpreadSheetController = _

  @Inject
  var log: Logger = _

  @BeanProperty
  var deta: SecGroup = null

  @BeanProperty
  var pageMode: String = _

  @BeanProperty
  var listModel: PaginationController[SecGroup] = _
}

@Named
@ViewAccessScoped
@serializable
class GroupView extends GroupViewModel {

  def refresh() {
    val filters: List[FilterEntry] = if (searchData != null) searchData.toFilterList else null
    val oldPaginatorPosition: java.lang.Integer = if (listModel != null) listModel.getLastPageAccessed else 0

    listModel = groupFacade.loadFromTo(max(searchData.getFrom, 0), searchData.getPageSize, filters, null);
    listModel.setLastPageAccessed(oldPaginatorPosition);
  }

  def doSearchList: String = {
    resetPageModeData
    refresh
    spreadSheetController.clear
    null
  }

  def goDeta: Class[_ <: ViewConfig] = {
    spreadSheetController.enableEdit(deta);
    null
  }

  def goDelete: Class[_ <: ViewConfig] = {
    null
  }

  def doSave: Class[_ <: ViewConfig] = {
    log.info("saving group")
    groupFacade.save(deta)
    spreadSheetController.disableEdit(deta)
    resetPageModeData
    refresh

    null
  }

  /**
   * resets any temporary page data
   */
  def resetPageModeData() {
    pageMode = null;
    deta = null;
  }

  def doCancel: Class[_ <: ViewConfig] = {
    spreadSheetController.disableEdit(deta)
    resetPageModeData

    null
  }

  def doSaveAll: Class[_ <: ViewConfig] = {
    //We iterate over all entries with enabled edits
    //now this is ugly, we have to add a type def to our
    //spreadsheet controller
    val buf: Buffer[SecGroup] = asBuffer(listModel.getPageAsList)
    val groups: List[SecGroup] = buf.foldLeft(new ArrayBuffer[SecGroup]) {
      (coll, group) => {
        if (spreadSheetController.isEditable(group).booleanValue) {
          coll += group
        }
        coll
      }
    }

    groupFacade.saveAll(groups)

    spreadSheetController.clear
    null
  }

  def doCancelAll: Class[_ <: ViewConfig] = {
    spreadSheetController.clear
    resetPageModeData
    refresh

    null
  }

  def doChangePageSize: Class[_ <: ViewConfig] = {
    refresh
    null
  }

  def goCreate: Class[_ <: ViewConfig] = {
    log.info("creating group")
    deta = groupFacade.createGroup

    null
  }

  def doDelete: Class[_ <: ViewConfig] = {
    log.info("deleting group")
    spreadSheetController.disableEdit(deta)
    groupFacade.deleteGroup(deta)

    resetPageModeData
    refresh

    null
  }

}