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

import org.apache.myfaces.extensions.cdi.core.api.scope.conversation.ViewAccessScoped;
import org.extrasapache.myfaces.codi.examples.ebean.business.bo.common.FacadeBase;
import org.extrasapache.myfaces.codi.examples.ebean.business.bo.security.UserFacade;
import org.extrasapache.myfaces.codi.examples.ebean.business.util.FilterEntry;
import org.extrasapache.myfaces.codi.examples.ebean.support.data.PaginationController;

import javax.inject.Inject;
import javax.inject.Named;
import java.io.Serializable;
import java.util.List;

/**
 * @author Werner Punz (latest modification by $Author$)
 * @version $Revision$ $Date$
 */

@Named
@ViewAccessScoped
public class UserListView extends BaseListView implements Serializable {

    @Inject
    UserListSearchModel searchData;

    PaginationController listModel = null;

    @Inject
    UserFacade bo;

    public UserListView() {
    }

    protected void refresh() {
        List<FilterEntry> filters = (searchData != null) ? searchData.toFilterList() : null;
        listModel = bo.loadFromTo(Math.max(searchData.getFrom(), 0), searchData.getPageSize(), filters, null);
    }

    public Class doSearch() {
        refresh();
        return null;
    }


    //begin getters and setters

    public UserListSearchModel getSearchData() {
        return searchData;
    }

    public void setSearchData(UserListSearchModel searchData) {
        this.searchData = searchData;
    }

    public PaginationController getListModel() {
        return listModel;
    }

    public void setListModel(PaginationController listModel) {
        this.listModel = listModel;
    }
}
