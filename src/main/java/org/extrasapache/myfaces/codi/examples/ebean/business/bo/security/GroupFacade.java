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

package org.extrasapache.myfaces.codi.examples.ebean.business.bo.security;

import com.avaje.ebean.Query;
import com.avaje.ebean.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

import org.apache.myfaces.extensions.cdi.core.api.logging.Logger;
import org.extrasapache.myfaces.codi.examples.ebean.business.bo.common.FacadeBase;
import org.extrasapache.myfaces.codi.examples.ebean.orm.person.Person;
import org.extrasapache.myfaces.codi.examples.ebean.orm.security.SecGroup;

import javax.enterprise.context.Dependent;
import javax.inject.Inject;
import javax.inject.Named;
import java.io.Serializable;
import java.util.Collection;

/**
 * @author Werner Punz (latest modification by $Author$)
 * @version $Revision$ $Date$
 */

@Named
@Dependent
public class GroupFacade extends FacadeBase<SecGroup> implements Serializable {

    @Inject
    Logger log;

    public GroupFacade() {
        super.clazz_$eq(SecGroup.class);
    }

    public SecGroup createGroup() {
        return new SecGroup();
    }

    public List<SecGroup> loadByIdsStr(Collection<String> ids) {
        ArrayList<Long> list = new ArrayList<Long>(ids.size());
        for(String id: ids) {
            list.add(Long.parseLong(id));
        }
        return loadByIds(list);
    }

    public List<SecGroup> loadByIds(Collection<Long> ids) {
        Query query = em().createQuery(clazz());
        query.where().in("id", ids);
        return query.findList();
    }

    @Transactional
    public void saveAll(Collection<SecGroup> groups) {
        for (SecGroup group : groups) {
            em().save(group);
        }
    }

    @Transactional
    public void deleteGroup(SecGroup group) {
        if (group.getId() != null) {
            em().delete(group);
        }
    }

    public void cancel(SecGroup t) {
        if (t.getId() != null) {
            em().refresh(t);
        }
    }

}
