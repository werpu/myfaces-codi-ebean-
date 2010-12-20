/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package ejb.bo;

import com.avaje.ebean.Ebean;
import com.avaje.ebean.EbeanServer;
import com.avaje.ebean.PagingList;
import com.avaje.ebean.Query;
import com.avaje.ebean.annotation.Transactional;
import ejb.orm.*;
import ejb.util.FilterEntry;
import ejb.util.OrderEntry;
import ejb.util.PagingPage;

import javax.enterprise.context.Dependent;
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
/*auto transactions are turned off we only use transactions for saving*/

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
    EbeanServer em = Ebean.getServer(null);

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

    public PagingPage<Person> loadFromTo(int from, int to) {
        Query query = em.createNamedQuery(Person.class, "person_all");
        int pageSize = to - from;
        int page = 0;

        PagingList resList = query.findPagingList(to - from);

        PagingPage resPage = new PagingPage<Person>(resList.getPage(page).getList(), from, to);
        resPage.setTotal(resList.getTotalRowCount());
        return resPage;
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
    public PagingPage<Person> loadFromTo(int from, int to, List<FilterEntry> filter, List<OrderEntry> orderBy) {
        /*CriteriaBuilder qb = em.getCriteriaBuilder();
        CriteriaQuery c = qb.createQuery(Person.class);
        Root<Person> pers = c.from(Person.class);
        c.select(pers);
        //c.distinct(true);
        //pers.fetch(ATTR_ADDRESSES);
        c.where(qb.like(pers.<String>get(ATTR_FIRSTNAME),qb.parameter(String.class,ATTR_FIRSTNAME)));
        Query query = em.createQuery(c);
        //Query query = // buildQuery(em, filter, pers, qb, c, orderBy);
        //em.createQuery("select entity from Person entity where 1=1");

        query.setParameter(ATTR_FIRSTNAME, "%");
        query.setFirstResult(0);
        query.setMaxResults(10);
        */

        return loadFromTo(from, to);
        //return new PagingPage<Person>(query.getResultList(), from, to);
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

}
