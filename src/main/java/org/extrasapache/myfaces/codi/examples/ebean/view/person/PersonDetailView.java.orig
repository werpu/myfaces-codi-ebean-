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
package org.extrasapache.myfaces.codi.examples.ebean.view.person;

import org.apache.myfaces.extensions.cdi.core.api.config.view.ViewConfig;
import org.extrasapache.myfaces.codi.examples.ebean.business.bo.person.PersonFacade;
import org.extrasapache.myfaces.codi.examples.ebean.orm.person.Address;
import org.apache.myfaces.extensions.cdi.core.api.scope.conversation.ViewAccessScoped;

import javax.inject.Inject;
import javax.inject.Named;
import java.io.Serializable;

/**
 * @author werpu2
 */
@Named
@ViewAccessScoped
public class PersonDetailView implements Serializable {

    private static final String MODE_CREATE = "create";
    private static final String MODE_EDIT = "edit";
    private static final String MODE_DELETE = "delete";

    @Inject
    PersonListSearchModel searchData;

    @Inject
    PersonFacade personFacade;

    org.extrasapache.myfaces.codi.examples.ebean.orm.person.Person person;
    Address address;

    String viewMode = MODE_CREATE;

    public Class goCreate() {
        viewMode = MODE_CREATE;
        person = personFacade.create();

        return Person.PersonDetail.class;
    }

    public Class<? extends ViewConfig> goDeta() {
        viewMode = MODE_EDIT;

        return Person.PersonDetail.class;
    }

    public Class<? extends ViewConfig> goDelete() {
        viewMode = MODE_DELETE;

        return Person.PersonDetail.class;
    }

    public Class<? extends ViewConfig> doDelete() {
        personFacade.delete(person);

        return Person.PersonList.class;
    }

    public Class<? extends ViewConfig> doSave() {

        personFacade.save(person);

        return Person.PersonList.class;
    }

    public Class<? extends ViewConfig> doCancel() {

        personFacade.cancel(person);

        return Person.PersonList.class;
    }

    public Class<? extends ViewConfig> addAddress() {
        address = personFacade.createAdr();
        person.getAddresses().add(address);

        return Person.PersonDetail.class;
    }

    public Class<? extends ViewConfig> removeAddress() {
        person.getAddresses().remove(address);

        return Person.PersonDetail.class;
    }

    //----------------- setter and getter part ------------------

    public org.extrasapache.myfaces.codi.examples.ebean.orm.person.Person getPerson() {
        return person;
    }

    public void setPerson(org.extrasapache.myfaces.codi.examples.ebean.orm.person.Person person) {
        this.person = person;
    }

    public String getViewMode() {
        return viewMode;
    }

    public void setViewMode(String viewMode) {
        this.viewMode = viewMode;
    }

    public PersonListSearchModel getSearchData() {
        return searchData;
    }

    public void setSearchData(PersonListSearchModel searchData) {
        this.searchData = searchData;
    }

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

}
