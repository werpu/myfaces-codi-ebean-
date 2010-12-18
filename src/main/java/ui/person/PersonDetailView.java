/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package ui.person;

import ejb.bo.PersonFacadeLocal;
import ejb.orm.Address;
import ejb.orm.Person;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.Serializable;
import javax.inject.Inject;
import javax.inject.Named;
import org.apache.myfaces.extensions.cdi.core.api.scope.conversation.ViewAccessScoped;

/**
 *
 * @author werpu2
 */
@Named
@ViewAccessScoped
public class PersonDetailView implements Serializable {
    public static final String NAV_DETAIL = "personDetail";
    public static final String NAV_LIST = "personList";

    @Inject
    PersonListSearchModel searchData;


    @Inject
    PersonFacadeLocal personFacade;

    Person person;
    Address address;

    Long personId = -1L;

    String viewMode="create";

    public String goCreate() {
        viewMode = "create";
        person = personFacade.create();

        return NAV_DETAIL;
    }

    public String goDeta() {
        viewMode = "edit";
        person = personFacade.loadById(personId);

        return NAV_DETAIL;
    }

    public String goDelete() {
        viewMode = "delete";
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

        personFacade.cancel();

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
    private void readObject(ObjectInputStream in) throws IOException, ClassNotFoundException {
        if(personId != -1L) {
            person = personFacade.loadById(personId);
        }
    }

 
}
