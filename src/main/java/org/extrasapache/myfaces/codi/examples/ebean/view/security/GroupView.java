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

package org.extrasapache.myfaces.codi.examples.ebean.view.security;

import org.extrasapache.myfaces.codi.examples.ebean.business.bo.GroupFacade;
import org.extrasapache.myfaces.codi.examples.ebean.orm.security.SecGroup;
import org.extrasapache.myfaces.codi.examples.ebean.business.util.FilterEntry;
import org.extrasapache.myfaces.codi.examples.ebean.support.cdi.logging.Logger;
import org.extrasapache.myfaces.codi.examples.ebean.support.data.PaginationController;
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

    PaginationController listModel = null;

    @Inject
    Logger log;

    SecGroup deta = null;

    String pageMode;

    public void refresh() {
        List<FilterEntry> filters = (searchData != null) ? searchData.toFilterList() : null;
        listModel = groupFacade.loadFromTo(Math.max(searchData.getFrom(), 0), searchData.getPageSize(), filters, null);
    }

    public String doSearchList() {
        refresh();
        return null;
    }

    public String goDeta() {
        return "groupList";
    }

    public String goDelete() {
        return "groupLists";
    }

    public String doSave() {
        log.info("saving group");
        groupFacade.save(deta);
        resetPageModeData();
        return "groupList";
    }

    private void resetPageModeData() {
        pageMode = null;
        deta = null;
    }

    public String doCancel() {
        resetPageModeData();

        return "groupList";
    }

    public String goCreate() {
        log.info("creating group");
        deta = groupFacade.createGroup();
        return "groupList";
    }

    public String doDelete() {
        log.info("deleting group");
        groupFacade.deleteGroup(deta);
        resetPageModeData();
        return "groupList";
    }
    /*setter and getter*/

    public GroupListSearchModel getSearchData() {
        return searchData;
    }

    public void setSearchData(GroupListSearchModel searchData) {
        this.searchData = searchData;
    }

    public PaginationController getListModel() {
        return listModel;
    }

    public void setListModel(PaginationController listModel) {
        this.listModel = listModel;
    }

    public SecGroup getDeta() {
        return deta;
    }

    public void setDeta(SecGroup deta) {
        this.deta = deta;
    }

    public String getPageMode() {
        return pageMode;
    }

    public void setPageMode(String pageMode) {
        this.pageMode = pageMode;
    }
}
