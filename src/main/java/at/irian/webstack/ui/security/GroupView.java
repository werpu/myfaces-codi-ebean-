/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

package at.irian.webstack.ui.security;

import at.irian.webstack.middle.bo.GroupFacade;
import at.irian.webstack.middle.orm.SecGroup;
import at.irian.webstack.middle.util.FilterEntry;
import at.irian.webstack.support.cdi.logging.Logger;
import com.avaje.ebean.PagingList;
import org.apache.myfaces.extensions.cdi.core.api.scope.conversation.ViewAccessScoped;

import javax.inject.Inject;
import javax.inject.Named;
import java.io.Serializable;
import java.util.List;

/**
 * @author Werner Punz (latest modification by $Author$)
 * @version $Revision$ $Date$
 */

/*combined list and edit view for the groups*/
@ViewAccessScoped
@Named
public class GroupView implements Serializable {
    SecGroup selectedGroup;

    @Inject
    GroupFacade groupFacade;

    @Inject
    GroupListSearchModel searchData;

    PagingList listModel = null;

    @Inject
    Logger log;

    SecGroup deta = null;

    Long groupId = null;

    String pageMode;

    public void refresh() {
        List<FilterEntry> filters = (searchData != null) ? searchData.toFilterList() : null;
        listModel = groupFacade.loadFromTo(Math.max(searchData.getFrom(), 0), Math.max(searchData.getFrom() + searchData.getPageSize(), 0), filters, null);
    }

    public String doSearchList() {
        refresh();
        return null;
    }

    public String goDeta() {
        deta = groupFacade.loadById(groupId);
        return null;
    }

    public String goDelete() {
        deta = groupFacade.loadById(groupId);
        return null;
    }

    public String doSave() {
        log.info("saving group");
        groupFacade.save(deta);
        return null;
    }

    public String doCancel() {
        deta = null;
        groupId = null;
        pageMode = null;

        return null;
    }

    public String goCreate() {
        log.info("creating group");
        deta = groupFacade.createGroup();
        return "groupList";
    }

    public void doDelete() {
        log.info("deleting group");
        groupFacade.deleteGroup(deta);
        deta = null;
    }
    /*setter and getter*/

    public GroupListSearchModel getSearchData() {
        return searchData;
    }

    public void setSearchData(GroupListSearchModel searchData) {
        this.searchData = searchData;
    }

    public PagingList getListModel() {
        return listModel;
    }

    public void setListModel(PagingList listModel) {
        this.listModel = listModel;
    }

    public SecGroup getDeta() {
        return deta;
    }

    public void setDeta(SecGroup deta) {
        this.deta = deta;
    }

    public Long getGroupId() {
        return groupId;
    }

    public void setGroupId(Long groupId) {
        this.groupId = groupId;
    }

    public String getPageMode() {
        return pageMode;
    }

    public void setPageMode(String pageMode) {
        this.pageMode = pageMode;
    }
}
