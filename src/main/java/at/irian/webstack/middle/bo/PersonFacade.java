/* Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License
 */
package at.irian.webstack.middle.bo;

import at.irian.webstack.middle.orm.Address;
import at.irian.webstack.middle.orm.Person;
import at.irian.webstack.middle.util.FilterEntry;
import at.irian.webstack.middle.util.OrderEntry;
import at.irian.webstack.support.cdi.logging.Logger;
import com.avaje.ebean.PagingList;
import com.avaje.ebean.Query;
import com.avaje.ebean.annotation.Transactional;

import javax.enterprise.context.Dependent;
import javax.inject.Inject;
import javax.inject.Named;
import java.io.Serializable;
import java.util.List;

//import org.apache.myfaces.extensions.cdi.jpa.api.Transactional;

/**
 * @author werpu2
 */
@Named(value = "personFacade")
/*we inherit the scope from the caller*/
@Dependent
public class PersonFacade extends FacadeBase<Person> implements Serializable {
    public static final String ATTR_ADDRESSES = "addresses";
    public static final String ATTR_FIRSTNAME = "firstName";

    /*now we use cdi to inject a serializable EbeanServer proxy the
    * code for the proxy generation  can be found under at.irian.webstack.support.cdi*/
    @Inject
    Logger logger;

    public PersonFacade() {
        super();
        this.clazz = Person.class;
    }

    public Person create() {
        logger.info("Person create");
        return new Person();
    }

    public Address createAdr() {
        logger.info("Person createAdr");
        Address ret = new Address();
        return ret;
    }


    /**
     * @param from
     * @param to
     * @param filter
     * @param orderBy
     * @return
     */
    public PagingList loadFromTo(int from, int to, List<FilterEntry> filter, List<OrderEntry> orderBy) {
        Query query = em.createQuery(Person.class);
        query.fetch("addresses");
        applyFilters(query, filter, orderBy);
        return getPage(from, to, query);
    }

    @Transactional
    public void delete(Person person) {
        if (person.getId() != null) {
            //just to make sure to have the correct entity we issue a quick find
            person = em.find(Person.class, person.getId());
            em.delete(person);
        }

    }

    public void cancel(Person t) {
        if (t.getId() != null) {
            em.refresh(t);
            em.refreshMany(t, "addresses");
        }
    }
}
