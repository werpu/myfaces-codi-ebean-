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
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import javax.annotation.PostConstruct;
import javax.inject.Named;

import at.irian.webstack.middle.util.FilterEntry;
import at.irian.webstack.middle.util.OpType;
import at.irian.webstack.support.ui.BaseSearchModel;
import at.irian.webstack.ui.security.GroupListSearchModel;
import org.apache.myfaces.extensions.cdi.core.api.scope.conversation.ViewAccessScoped;

/**
 * @author werpu2
 */
@Named
@ViewAccessScoped
public class PersonListSearchModel extends BaseSearchModel implements Serializable {
    public static final String FIRST_NAME = "firstName";
    public static final String LAST_NAME = "lastName";
}
