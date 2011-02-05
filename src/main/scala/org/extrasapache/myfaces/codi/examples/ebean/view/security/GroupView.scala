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
import org.extrasapache.myfaces.codi.examples.ebean.support.data.{PaginationController, SpreadSheetController}
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

    listModel.setLastPageAccessed(oldPaginatorPosition.intValue);
  }

  def doSearchList: String = {
    resetPageModeData
    refresh
    spreadSheetController.clear
    null
  }

  def goDeta: Class[_] = {
    spreadSheetController.enableEdit(deta);
    null
  }

  def goDelete: Class[_] = {
    null
  }

  def doSave: Class[_] = {
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

  def doCancel: Class[_] = {
    spreadSheetController.disableEdit(deta)
    resetPageModeData

    null
  }

  def doSaveAll: Class[_] = {
    //We iterate over all entries with enabled edits
    val groups: List[SecGroup] = asScalaBuffer(listModel.getPageAsList).filter(spreadSheetController.isEditable(_).booleanValue)
    groupFacade.saveAll(groups)
    spreadSheetController.clear
    null
  }

  def doCancelAll: Class[_] = {
    spreadSheetController.clear
    resetPageModeData
    refresh

    null
  }

  def doChangePageSize: Class[_] = {
    refresh
    null
  }

  def goCreate: Class[_] = {
    log.info("creating group")
    deta = groupFacade.createGroup

    null
  }

  def doDelete: Class[_] = {
    log.info("deleting group")
    spreadSheetController.disableEdit(deta)
    groupFacade.deleteGroup(deta)

    resetPageModeData
    refresh

    null
  }

}