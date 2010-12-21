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

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import javax.faces.bean.ManagedBean;

import javax.faces.bean.SessionScoped;
import javax.faces.model.SelectItem;
import at.irian.webstack.support.data.AddressType;

/**
 *
 * @author werpu2
 */
@ManagedBean
@SessionScoped
public class AddressTypeBean implements Serializable {

    List items = null;

    public List<SelectItem> getAddressTypes() {
        if(items == null) {
            items = new ArrayList<SelectItem>(6);
            for(AddressType adrType: AddressType.values()) {
                items.add( new SelectItem(adrType.getKey(), Integer.toString(adrType.getValue()) ));
            }
        }
        return items;
    }

}
