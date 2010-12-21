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

import com.avaje.ebean.*;
import com.avaje.ebean.annotation.Transactional;
import at.irian.webstack.middle.orm.*;
import at.irian.webstack.middle.util.FilterEntry;
import at.irian.webstack.middle.util.OrderEntry;

import javax.enterprise.context.Dependent;
import javax.inject.Named;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.Serializable;
import java.util.List;

//import org.apache.myfaces.extensions.cdi.jpa.api.Transactional;

/**
 * @author werpu2
 */
@Named(value = "personFacade")
/*we inherit the scope from the caller*/
@Dependent
public class PersonFacade extends FacadeBase<Person> implements Serializable, PersonFacadeLocal {
    public static final String ATTR_ADDRESSES = "addresses";
    public static final String ATTR_FIRSTNAME = "firstName";

    /**
     * The section 4.2 of the ejb3 core spec says passivation cannot happen
     * in case of a non serializable entity manager so we leave it as it is
     * this does not mean however that our referencing scope givers
     * cannot be passivated in certian cluster and cloud situations
     * so we have to deal with it differently
     */
    //@PersistenceContext(unitName = "testPatternPU",type=PersistenceContextType.EXTENDED)
    //transient EntityManager em;
    //@EbeanPersistenceContext(value = "PersonFacade")
    transient EbeanServer em = Ebean.getServer(null);

    //passivation, activation state holder

    public EbeanServer getEm() {
        return em;
    }

    public Person create() {
        Person ret = new Person();
        return ret;
    }

    public Address createAdr() {
        Address ret = new Address();
        return ret;
    }

    //TODO expose the list directly instead of exnapsulating it
    public PagingList loadFromTo(int from, int to) {
        Query query = em.createNamedQuery(Person.class, "person_all");
        return getPage(from, to, query);
    }

    private PagingList getPage(int from, int to, Query query) {
        int pageSize = to - from;
        int page = Math.max(10, to-from);

        PagingList resList = query.findPagingList(to - from);

        return resList;
        /*PagingPage resPage = new PagingPage<Person>(resList.getPage(page).getList(), from, to);
        resPage.setTotal(resList.getTotalRowCount());
        return resPage;   */
    }

    static int noPersons(EbeanServer em) {
        Query query = em.createNamedQuery(Person.class, "person_all");
        return query.findRowCount();
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
        ExpressionList queryBuilder = query.where();


        //ebeans internally maps the values to prepared statemes
        //so doing it this way is save

        //Also the queryBuilder has as default concatenation op an
        //for or you have to use separate subexpressions
        //either way this is way superior to what jpa is doing
        //which is too low level

        for(FilterEntry entry: filter) {

              switch (entry.getOpType()) {
                    case GTE:
                        queryBuilder = queryBuilder.ge(entry.getName(), entry.getValue());
                        break;
                    case GT:
                        queryBuilder = queryBuilder.gt(entry.getName(), entry.getValue());
                        break;
                    case EQ:
                        queryBuilder = queryBuilder.eq(entry.getName(), entry.getValue());
                        break;
                    case LIKE:
                        queryBuilder = queryBuilder.like(entry.getName(), (String) entry.getValue());
                        break;
                    case LT:
                        queryBuilder = queryBuilder.lt(entry.getName(), (String) entry.getValue());
                        break;
                    case LTE:
                        queryBuilder = queryBuilder.le(entry.getName(), (String) entry.getValue());
                        break;
                    default:
                        break;
                }

        }


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

    /**
     * under normal circumstances our person object should be attached
     * but given that the session can be serialized we might have lost the attachment
     * (can happen in the cloud) se we deal with it by either persisting or merging the person object
     * the cascade should do the rest
     *
     * @param person
     */
    @Transactional
    public void save(Person person) {
        //The transaction flushes the current em
        //we merge just to make sure the entity will be reattached
        //in case of accidental passivation or serialisation
        //of the holding bean
        em.save(person);
    }

    public void cancel(Person t) {
        if (t.getId() != null) {
            getEm().refresh(t);
            getEm().refreshMany(t, "addresses");
        }
    }



    @Override
    public Person loadById(Long id) {
        return em.find(Person.class, id);
    }


     private void readObject(ObjectInputStream in) throws IOException, ClassNotFoundException {
        /*we have to get injection up and running to eliminate this code here*/
        em = Ebean.getServer(null);
    }
}
