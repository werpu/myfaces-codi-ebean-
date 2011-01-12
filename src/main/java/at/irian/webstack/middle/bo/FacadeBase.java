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

import at.irian.webstack.middle.util.FilterEntry;
import at.irian.webstack.middle.util.OrderEntry;
import at.irian.webstack.support.data.PaginationController;
import com.avaje.ebean.EbeanServer;
import com.avaje.ebean.ExpressionList;
import com.avaje.ebean.PagingList;
import com.avaje.ebean.Query;
import com.avaje.ebean.annotation.Transactional;

import javax.inject.Inject;
import java.util.List;

/**
 * @author werpu2
 */
public abstract class FacadeBase<T> {

    /**
     * not we have added
     * a serializable proxy to the ebean
     * server, so that in the passivation
     * activation case the server
     * can be dropped and restored
     * due to being non serializabe in its
     * implementation
     */
    @Inject
    EbeanServer em;
    Class clazz = null;



    public T loadById(Object identifier) {
        return (T) em.find(this.getClass().getTypeParameters()[0].getClass(), identifier);
    }

    protected PaginationController<T> getPage(int from, int pageSize, Query query) {
        //query.set(pageSize);
        query.setFirstRow(from);

        PaginationController<T> resList = new PaginationController<T>(query.findPagingList(pageSize));

        return resList;
    }

    public T loadById(Long id) {
        return (T) em.find(clazz, id);
    }

    public PaginationController<T> loadFromTo(int from, int pageSize) {
        Query query = em.createQuery(clazz);
        return getPage(from, pageSize, query);
    }


    protected void applyFilters(Query query, List<FilterEntry> filter, List<OrderEntry> orderBy) {
        ExpressionList queryBuilder = query.where();

        //ebeans internally maps the values to prepared statemes
        //so doing it this way is save

        //Also the queryBuilder has as default concatenation op an
        //for or you have to use separate subexpressions
        //either way this is way superior to what jpa is doing
        //which is too low level

        for (FilterEntry entry : filter) {

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
                    queryBuilder = queryBuilder.lt(entry.getName(),  entry.getValue());
                    break;
                case LTE:
                    queryBuilder = queryBuilder.le(entry.getName(), entry.getValue());
                    break;
                default:
                    break;
            }

        }

        if (orderBy != null) {
            for (OrderEntry entry : orderBy) {
                queryBuilder.orderBy(entry.getName());
            }
        }
    }

      /**
     * @param from
     * @param pageSize
     * @param filter
     * @param orderBy
     * @return
     */
    public PaginationController<T> loadFromTo(int from, int pageSize, List<FilterEntry> filter, List<OrderEntry> orderBy) {
        Query query = em.createQuery(clazz);
        applyFilters(query, filter, orderBy);
        return getPage(from, pageSize, query);
    }

    /**
        * under normal circumstances our person object should be attached
        * but given that the session can be serialized we might have lost the attachment
        * (can happen in the cloud) se we deal with it by either persisting or merging the person object
        * the cascade should do the rest
        *
        * @param entity
        */
       @Transactional
       public void save(T entity) {
           //The transaction flushes the current em
           //we merge just to make sure the entity will be reattached
           //in case of accidental passivation or serialisation
           //of the holding bean
           em.save(entity);
       }



}
