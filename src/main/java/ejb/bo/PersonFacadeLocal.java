/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package ejb.bo;

import com.avaje.ebean.PagingList;
import ejb.orm.*;
import ejb.util.FilterEntry;
import ejb.util.OrderEntry;

import java.util.List;

/**
 *
 * @author werpu2
 */
public interface PersonFacadeLocal {

    void cancel(Person pers);

    Person create();

    public Person loadById(Long id);

    public PagingList loadFromTo(int from, int to, List<FilterEntry> filter, List<OrderEntry> orderBy);

    void save(Person person);

    public Address createAdr();

    public void delete(Person person);
}
