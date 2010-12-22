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

package at.irian.webstack.middle.bo;

import at.irian.webstack.middle.orm.security.Group;
import at.irian.webstack.support.cdi.logging.Logger;
import com.avaje.ebean.EbeanServer;
import com.avaje.ebean.annotation.Transactional;

import javax.enterprise.context.Dependent;
import javax.inject.Inject;
import javax.inject.Named;
import java.io.Serializable;

/**
 * @author Werner Punz (latest modification by $Author$)
 * @version $Revision$ $Date$
 */

@Named
@Dependent
public class GroupFacade extends FacadeBase<Group> implements Serializable {

    @Inject
    EbeanServer em;
    @Inject
    Logger log;

    public Group createGroup() {
        return new Group();
    }

    @Transactional
    public void deleteGroup(Group group) {
        if (group.getId() != null) {
            em.delete(group);
        }
    }

}
