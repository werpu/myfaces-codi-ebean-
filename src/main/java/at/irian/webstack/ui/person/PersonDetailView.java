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

import at.irian.webstack.middle.bo.PersonFacadeLocal;
import at.irian.webstack.middle.orm.Address;
import at.irian.webstack.middle.orm.Person;

import java.io.Serializable;
import javax.inject.Inject;
import javax.inject.Named;

import org.apache.myfaces.extensions.cdi.core.api.scope.conversation.ViewAccessScoped;

/**
 * @author werpu2
 */
@Named
@ViewAccessScoped
public class PersonDetailView implements Serializable {
    public static final String NAV_DETAIL = "personDetail";
    public static final String NAV_LIST = "personList";
    private static final String MODE_CREATE = "create";
    private static final String MODE_EDIT = "edit";
    private static final String MODE_DELETE = "delete";

    @Inject
    PersonListSearchModel searchData;

    @Inject
    PersonFacadeLocal personFacade;

    Person person;
    Address address;

    Long personId = -1L;

    String viewMode = MODE_CREATE;

    public String goCreate() {
        viewMode = MODE_CREATE;
        person = personFacade.create();

        return NAV_DETAIL;
    }

    public String goDeta() {
        viewMode = MODE_EDIT;
        person = personFacade.loadById(personId);

        return NAV_DETAIL;
    }

    public String goDelete() {
        viewMode = MODE_DELETE;
        person = personFacade.loadById(personId);

        return NAV_DETAIL;
    }

    public String doDelete() {
        personFacade.delete(person);

        return NAV_LIST;
    }

    public String doSave() {

        personFacade.save(person);



        return NAV_LIST;
    }

    public String doCancel() {

        personFacade.cancel(person);

        return NAV_LIST;
    }

    public Long getPersonId() {
        return personId;
    }

    public void setPersonId(Long personId) {
        this.personId = personId;
    }

    public Person getPerson() {
        return person;
    }

    public void setPerson(Person person) {
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

    public String addAddress() {
        address = personFacade.createAdr();
        person.getAddresses().add(address);

        return NAV_DETAIL;
    }

    public String removeAddress() {
        person.getAddresses().remove(address);

        return NAV_DETAIL;
    }

    //now to the tricky part, in clustered situations the detail view or the session
    //Generally can be serialised and deserialised in this case we lose the entity manager
    //connection
    //since per spec the em hosting ejb never is passivated thanks to the em injected
    //We simply restore the person bean from there, the altered data still should be present
    //todo deserialisation, we reload the person object anew
    /*private void readObject(ObjectInputStream in) throws IOException, ClassNotFoundException {
        if(personId != -1L) {
            person = personFacade.loadById(personId);
        }
    } */

}
