/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package ui.person;

import ejb.bo.PersonFacadeLocal;
import java.io.Serializable;
import java.util.List;
import javax.inject.Inject;
import javax.inject.Named;
import org.apache.myfaces.extensions.cdi.core.api.scope.conversation.ViewAccessScoped;
import ejb.orm.FilterEntry;
import ejb.orm.PagingPage;
import ejb.orm.Person;
import javax.enterprise.event.Observes;
import javax.enterprise.event.Reception;
import org.apache.myfaces.extensions.cdi.core.api.config.view.View;
import org.apache.myfaces.extensions.cdi.jsf.api.config.view.PreRenderView;

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
    PersonFacadeLocal personFacade;
    PagingPage<Person> listModel = null;

    public void preRenderView() {
        System.out.println("----------PrerenderView-------------");
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

    
    private void refresh() {
        System.out.println("refresh=============================");
        List<FilterEntry> filters = (searchData != null) ? searchData.toFilterList() : null;
        listModel = personFacade.loadFromTo(Math.max(searchData.getFrom(), 0), Math.max(searchData.getFrom() + searchData.getPageSize(), 0), filters, null);
    }



    public String doSearchList() {
        refresh();
        return null;
    }

    public PagingPage<Person> getListModel() {
        return listModel;
    }

    public void setListModel(PagingPage<Person> listModel) {
        this.listModel = listModel;
    }

    public PersonListSearchModel getSearchData() {
        return searchData;
    }

    public void setSearchData(PersonListSearchModel searchData) {
        this.searchData = searchData;
    }



}

