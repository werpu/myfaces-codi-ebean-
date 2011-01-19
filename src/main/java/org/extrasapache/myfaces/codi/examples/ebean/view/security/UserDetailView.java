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

import org.apache.myfaces.extensions.cdi.core.api.config.view.ViewConfig;
import org.extrasapache.myfaces.codi.examples.ebean.business.bo.person.PersonFacade;
import org.extrasapache.myfaces.codi.examples.ebean.business.bo.security.UserFacade;
import org.extrasapache.myfaces.codi.examples.ebean.orm.person.Address;
import org.extrasapache.myfaces.codi.examples.ebean.orm.security.User;
import org.extrasapache.myfaces.codi.examples.ebean.view.person.Person;

import javax.inject.Inject;
import javax.inject.Named;
import java.io.Serializable;

/**
 * @author Werner Punz (latest modification by $Author$)
 * @version $Revision$ $Date$
 */

@Named
public class UserDetailView implements Serializable {

    @Inject
    UserFacade bo;

    @Inject
    PersonFacade personBo;

    String pageMode;

    User model;
    Address address;


    boolean newPerson = false;



    public Class goDeta() {

        return Security.UserDetail.class;
    }

    public Class goCreate() {
        model = bo.createUser();
        newPerson = true;
        return Security.UserDetail.class;
    }

    public Class<? extends ViewConfig> addAddress() {
        Address address = personBo.createAdr();
        model.getPerson().getAddresses().add(address);

        return Security.UserDetail.class;
    }

    public Class<? extends ViewConfig> removeAddress() {
        model.getPerson().getAddresses().remove(address);

        return Person.PersonDetail.class;
    }









    public String getPageMode() {
        return pageMode;
    }

    public void setPageMode(String pageMode) {
        this.pageMode = pageMode;
    }

    public User getModel() {
        return model;
    }

    public void setModel(User model) {
        this.model = model;
    }

    public boolean isNewPerson() {
        return newPerson;
    }

    public void setNewPerson(boolean newPerson) {
        this.newPerson = newPerson;
    }

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }
}
