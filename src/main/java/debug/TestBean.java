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

package debug;

import org.extrasapache.myfaces.codi.examples.ebean.orm.person.Person;

import java.util.LinkedList;
import java.util.List;

import javax.faces.bean.ManagedBean;

/**
 * @author Werner Punz (latest modification by $Author$)
 * @version $Revision$ $Date$
 */

@ManagedBean
public class TestBean {
    List<Person> _personList = new LinkedList();
    public TestBean() {
        for(int cnt = 0; cnt < 10; cnt++) {
            Person pers = new Person();
            pers.firstName_$eq("First Name"+cnt);
            pers.lastName_$eq("Last Name"+cnt);
            _personList.add(pers);
        }
    }

    public List<Person> getPersonList() {
        return _personList;
    }

    public void setPersonList(List<Person> personList) {
        _personList = personList;
    }
}
