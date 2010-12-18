/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package ejb.bo;

import ejb.orm.Address;
import java.util.List;
import ejb.orm.FilterEntry;
import ejb.orm.OrderEntry;
import ejb.orm.PagingPage;
import ejb.orm.Person;

/**
 *
 * @author werpu2
 */
public interface PersonFacadeLocal {

    void cancel();

    Person create();

    public Person loadById(Long id);

    public PagingPage<Person> loadFromTo(int from, int to, List<FilterEntry> filter, List<OrderEntry> orderBy);

    void save(Person person);

    public Address createAdr();

    public void delete(Person person);
}
