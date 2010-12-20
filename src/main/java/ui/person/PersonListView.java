/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package ui.person;

import com.avaje.ebean.PagingList;
import ejb.bo.PersonFacadeLocal;
import ejb.util.FilterEntry;
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
    PersonFacadeLocal personFacade;
    PagingList listModel = null;

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
        System.out.println("refresh=============================");
        List<FilterEntry> filters = (searchData != null) ? searchData.toFilterList() : null;
        listModel = personFacade.loadFromTo(Math.max(searchData.getFrom(), 0), Math.max(searchData.getFrom() + searchData.getPageSize(), 0), filters, null);
    }



    public String doSearchList() {
        refresh();
        return null;
    }

    public PagingList getListModel() {
        return listModel;
    }

    public void setListModel(PagingList listModel) {
        this.listModel = listModel;
    }

    public PersonListSearchModel getSearchData() {
        return searchData;
    }

    public void setSearchData(PersonListSearchModel searchData) {
        this.searchData = searchData;
    }



}

