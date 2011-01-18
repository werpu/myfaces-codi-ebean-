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

package org.extrasapache.myfaces.codi.examples.ebean.support.ui;

import org.extrasapache.myfaces.codi.examples.ebean.support.data.PaginationController;

import javax.faces.component.FacesComponent;
import javax.faces.component.UIComponent;
import javax.faces.component.UINamingContainer;
import javax.faces.component.html.HtmlDataTable;
import javax.faces.context.FacesContext;
import javax.faces.event.AbortProcessingException;
import javax.faces.event.ComponentSystemEvent;
import javax.faces.event.SystemEvent;
import javax.faces.event.SystemEventListener;
import java.io.IOException;

/**
 * @author Werner Punz (latest modification by $Author$)
 * @version $Revision$ $Date$
 */

@FacesComponent("at.irian.PaginatorComponent")
public class PaginatorComponent extends UINamingContainer {
    private static final String PAGING_CONTROLLER = "pagingController";

    enum PropertyKeys {forTable, value, forTableClientId, enclosingContainerClientId}

    public PaginationController getValue() {
        return (PaginationController) getStateHelper().eval(
                PropertyKeys.value, null);
    }

    public void setValue(PaginationController value) {
        getStateHelper().put(PropertyKeys.value, value);
    }

    public String getForTable() {
        return (String) getStateHelper().eval(
                PropertyKeys.forTable, "");
    }

    public void setForTable(String collapsed) {
        getStateHelper().put(PropertyKeys.forTable, collapsed);
    }

    public String getForTableClientId() {
        return (String) getStateHelper().eval(
                PropertyKeys.forTableClientId, "");

    }

    public void setForTableClientId(String collapsed) {
        getStateHelper().put(PropertyKeys.forTableClientId, collapsed);
    }

    public String getEnclosingContainerClientId() {
        return (String) getStateHelper().eval(
                PropertyKeys.enclosingContainerClientId, "");

    }

    private void initData() {

        HtmlDataTable forTable = (HtmlDataTable) this.getParent().findComponent(getForTable());
        //setValue((PaginationController)forTable.getValue());
        //TODO improve the for handling for this case because currently our component and our table
        //need the same parent
        setForTableClientId(forTable.getClientId());
        setEnclosingContainerClientId(this.findComponent(PAGING_CONTROLLER).getClientId());

    }

    public void setEnclosingContainerClientId(String collapsed) {
        getStateHelper().put(PropertyKeys.enclosingContainerClientId, collapsed);
    }

    public PaginatorComponent() {
        super();    //To change body of overridden methods use File | Settings | File Templates.
    }

    public void beforeEncode(ComponentSystemEvent event) {
        initData();
    }


}
