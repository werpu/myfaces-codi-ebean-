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
package at.irian.webstack.ui.person;

import at.irian.webstack.middle.bo.PersonFacade;
import at.irian.webstack.middle.orm.person.Person;
import at.irian.webstack.middle.util.FilterEntry;
import at.irian.webstack.support.data.PaginationController;
import com.avaje.ebean.PagingList;
import org.apache.myfaces.extensions.cdi.core.api.scope.conversation.ViewAccessScoped;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import javax.inject.Named;
import java.io.Serializable;
import java.util.List;

/**
 *
 * @author werpu2
 */
@Named
@ViewAccessScoped
public class PersonListView implements Serializable {

    @Inject
    PersonListSearchModel searchData;
    /**
     * we inject our person facade to handle the raw details
     */
    @Inject
    PersonFacade personFacade;
    PaginationController listModel = null;

    @PostConstruct
    public void postConstruct() {

        if (listModel == null && searchData.isSearchPerformed()) {
            //We run into the page
            System.out.println("refreshing");
            refresh();
        } else {
            if(listModel != null) {
                System.out.println("lostmodel != null");
            }
            if(!searchData.isSearchPerformed()) {
                System.out.println("search not performed");
            }
        }
    }


    public void preRenderView() {

    }

    
    private void refresh() {
        List<FilterEntry> filters = (searchData != null) ? searchData.toFilterList() : null;
        listModel = personFacade.loadFromTo(Math.max(searchData.getFrom(), 0), searchData.getPageSize(), filters, null);
    }



    public String doSearchList() {
        refresh();
        return null;
    }

    public PaginationController getListModel() {
        return listModel;
    }

    public void setListModel(PaginationController listModel) {
        this.listModel = listModel;
    }

    public PersonListSearchModel getSearchData() {
        return searchData;
    }

    public void setSearchData(PersonListSearchModel searchData) {
        this.searchData = searchData;
    }



}

