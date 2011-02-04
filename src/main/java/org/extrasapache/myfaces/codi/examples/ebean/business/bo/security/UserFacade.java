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
import org.extrasapache.myfaces.codi.examples.ebean.business.bo.common.FacadeBase;
import org.extrasapache.myfaces.codi.examples.ebean.business.bo.person.PersonFacade;
import org.extrasapache.myfaces.codi.examples.ebean.business.util.FilterEntry;
import org.extrasapache.myfaces.codi.examples.ebean.business.util.OrderEntry;
import org.extrasapache.myfaces.codi.examples.ebean.orm.person.Person;
import org.extrasapache.myfaces.codi.examples.ebean.orm.security.User;
import org.extrasapache.myfaces.codi.examples.ebean.support.data.PaginationController;

import javax.enterprise.context.Dependent;
import javax.inject.Inject;
import javax.inject.Named;
import java.io.Serializable;
import java.util.List;

/**
 * @author Werner Punz (latest modification by $Author$)
 * @version $Revision$ $Date$
 */

@Named
@Dependent
public class UserFacade extends FacadeBase<User> implements Serializable {

    @Inject
    PersonFacade personBo;

    public UserFacade() {
        super();
        super.clazz_$eq(User.class);
    }

    public User createUser() {
        User ret = new User();
        ret.setPerson(personBo.create());
        return ret;
    }

    @Transactional
    public void deleteUser(User user) {
        if (user.getId() != null) {
            em().delete(user);
        }
    }

    //TODO add search criteria for the list search

    /**
     * @param from
     * @param pageSize
     * @param pageSize
     * @param orderBy
     * @return
     */
    public PaginationController<User> loadFromTo(int from, int pageSize, List<FilterEntry> filter, List<OrderEntry> orderBy) {
        Query query = em().createQuery(User.class);
        query.fetch("person");
        query.fetch("groups");
        applyFilters(query, filter, orderBy);
        return getPage(from, pageSize, query);
    }

    public void cancel(User t) {
        if (t.getId() != null) {
            em().refresh(t);
            em().refreshMany(t, "groups");
        }
    }

}
