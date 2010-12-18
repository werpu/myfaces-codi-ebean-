/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package ejb.bo;

import java.util.ArrayList;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.Query;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Order;
import javax.persistence.criteria.ParameterExpression;
import javax.persistence.criteria.Path;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import ejb.orm.FilterEntry;
import ejb.orm.OrderEntry;
import ejb.orm.Person;

/**
 *
 * @author werpu2
 */
public abstract class FacadeBase<T> {

    public FacadeBase() {
    }

    protected abstract EntityManager getEm();

    protected Query buildQuery(EntityManager em, List<FilterEntry> filter, Root<T> root, CriteriaBuilder qb, CriteriaQuery c, List<OrderEntry> orderBy) {
        if (filter != null && filter.size() > 0) {
            List<Predicate> criteria = new ArrayList<Predicate>();
            for (FilterEntry entry : filter) {
                String[] propPath = entry.getName().split("\\.");
                Path pathExpr = null;
                boolean first = true;
                for (String prop : propPath) {
                    if (first) {
                        pathExpr = root.get(prop);
                        first = false;
                    } else {
                        pathExpr = (Path) pathExpr.get(prop);
                    }
                }
                switch (entry.getOpType()) {
                    case GTE:
                        ParameterExpression p = qb.parameter(entry.getEntryType(), entry.getName().replaceAll("\\.", "_"));
                        criteria.add(qb.ge(pathExpr, p));
                        break;
                    case GT:
                        ParameterExpression p2 = qb.parameter(entry.getEntryType(), entry.getName().replaceAll("\\.", "_"));
                        criteria.add(qb.gt(pathExpr, p2));
                        break;
                    case EQ:
                       
                        ParameterExpression p3 = qb.parameter(entry.getEntryType(), entry.getName().replaceAll("\\.", "_"));
                        criteria.add(qb.equal(pathExpr, p3));
                       
                        break;
                    case LIKE:
                        ParameterExpression p3_1 = qb.parameter(entry.getEntryType(), entry.getName().replaceAll("\\.", "_"));
                        criteria.add(qb.like(pathExpr, p3_1));

                        break;
                    case LT:
                        ParameterExpression p4 = qb.parameter(entry.getEntryType(), entry.getName().replaceAll("\\.", "_"));
                        criteria.add(qb.lt(pathExpr, p4));
                        break;
                    case LTE:
                        ParameterExpression p5 = qb.parameter(entry.getEntryType(), entry.getName().replaceAll("\\.", "_"));
                        criteria.add(qb.lessThanOrEqualTo(pathExpr, p5));
                        break;
                    default:
                        break;
                }
            }
            c.where(qb.and(criteria.toArray(new Predicate[criteria.size()])));
        }
        
        if (orderBy != null && orderBy.size() > 0) {
            List<Order> orderBys = new ArrayList<Order>(orderBy.size());
            for (OrderEntry order : orderBy) {
                String[] propPath = order.getName().split("\\.");
                Path pathExpr = null;
                boolean first = true;
                for (String prop : propPath) {
                    if (first) {
                        pathExpr = root.get(prop);
                        first = false;
                    } else {
                        pathExpr = (Path) pathExpr.get(prop);
                    }
                }
                if (order.isAsc()) {
                    orderBys.add(qb.asc(pathExpr));
                } else {
                    orderBys.add(qb.desc(pathExpr));
                }
            }
            if (orderBys.size() > 0) {
                c.orderBy(orderBys);
            }
        }
        Query query = em.createQuery(c);
        if (filter != null) {
            for (FilterEntry entry : filter) {
                if(entry.getEntryType().getName().equals("java.lang.String")) {
                    query.setParameter(entry.getName().replaceAll("\\.", "_"), entry.getValue());
                } else {
                    query.setParameter(entry.getName().replaceAll("\\.", "_"), entry.getValue());
                }
            }
        }
        return query;
    }

    public T loadById(Object identifier) {
        return (T) getEm().find(this.getClass().getTypeParameters()[0].getClass(), identifier);
    }

     public void cancel() {
        getEm().clear();
    }
   

}
