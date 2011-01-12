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

package at.irian.webstack.ui.security;

import at.irian.webstack.middle.orm.credentials.SecGroup;

import javax.enterprise.context.ApplicationScoped;
import javax.faces.model.SelectItem;
import javax.inject.Named;
import java.util.ArrayList;
import java.util.List;

/**
 * @author Werner Punz (latest modification by $Author$)
 * @version $Revision$ $Date$
 */

@Named
@ApplicationScoped
public class GroupTypes {
    List<SelectItem> groupTypes = null;

    public GroupTypes() {
        groupTypes = new ArrayList<SelectItem>(3);
        groupTypes.add(new SelectItem(SecGroup.GRP_TYPE_SYSTEM, "System"));
        groupTypes.add(new SelectItem(SecGroup.GRP_TYPE_USER, "User"));
        groupTypes.add(new SelectItem(SecGroup.GRP_TYPE_OTHER, "Other"));

    }

    public List<SelectItem> getAllGroupTypes() {
        return groupTypes;
    }
}
