/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package ejb.orm;

import java.io.Serializable;
import java.util.Collection;
import java.util.Iterator;
import java.util.List;
import java.util.ListIterator;

/**
 * A paging page with an immutable list as iterator
 * 
 * @author werpu2
 */
public class PagingPage<T> implements Serializable, List<T>{
    List<T> page;

    int from = -1;

    int to = -1;

    int total = -1;

    public PagingPage(List<T> page, int from, int to) {
        this.page = page;
        this.from = from;
        this.to = to;
    }

    public PagingPage(List<T> page, int from, int to, int total) {
        this.page = page;
        this.from = from;
        this.to = to;
        this.total = total;
    }

    public int getFrom() {
        return from;
    }

    public void setFrom(int from) {
        this.from = from;
    }

    public List<T> getPage() {
        return page;
    }

    public void setPage(List<T> page) {
        this.page = page;
    }

    public int getTo() {
        return to;
    }

    public void setTo(int to) {
        this.to = to;
    }

    public int getTotal() {
        return total;
    }

    public void setTotal(int total) {
        this.total = total;
    }


    /**
     * immutable list iterator
     * @param <T>
     */
    class ImmutableListIterator<T> implements Iterator<T> {

        Iterator<T> delegate;

        public ImmutableListIterator(Iterator<T> delegate) {
            this.delegate = delegate;
        }



        @Override
        public boolean hasNext() {
            return delegate.hasNext();
        }

        @Override
        public T next() {
            return delegate.next();
        }

        @Override
        public void remove() {
            throw new UnsupportedOperationException("Not supported yet.");
        }

    }


    @Override
    public Iterator<T> iterator() {
        return new ImmutableListIterator<T>(getPage().iterator());
    }

    @Override
    public int size() {
       return getPage().size();
    }

    @Override
    public boolean isEmpty() {
       return getPage().isEmpty();
    }

    @Override
    public boolean contains(Object o) {
        return getPage().contains(o);
    }

    @Override
    public Object[] toArray() {
        return getPage().toArray();
    }

    @Override
    public <T> T[] toArray(T[] ts) {
        return getPage().toArray(ts);
    }

    @Override
    public boolean add(T e) {
        throw new UnsupportedOperationException("Not supported yet.");
    }

    @Override
    public boolean remove(Object o) {
        throw new UnsupportedOperationException("Not supported yet.");
    }

    @Override
    public boolean containsAll(Collection<?> clctn) {
        return getPage().containsAll(clctn);
    }

    @Override
    public boolean addAll(Collection<? extends T> clctn) {
        throw new UnsupportedOperationException("Not supported yet.");
    }

    @Override
    public boolean addAll(int i, Collection<? extends T> clctn) {
        throw new UnsupportedOperationException("Not supported yet.");
    }

    @Override
    public boolean removeAll(Collection<?> clctn) {
        throw new UnsupportedOperationException("Not supported yet.");
    }

    @Override
    public boolean retainAll(Collection<?> clctn) {
        throw new UnsupportedOperationException("Not supported yet.");
    }

    @Override
    public void clear() {
        throw new UnsupportedOperationException("Not supported yet.");
    }

    @Override
    public T get(int i) {
        return getPage().get(i);
    }

    @Override
    public T set(int i, T e) {
        throw new UnsupportedOperationException("Not supported yet.");
    }

    @Override
    public void add(int i, T e) {
        throw new UnsupportedOperationException("Not supported yet.");
    }

    @Override
    public T remove(int i) {
        throw new UnsupportedOperationException("Not supported yet.");
    }

    @Override
    public int indexOf(Object o) {
        throw new UnsupportedOperationException("Not supported yet.");
    }

    @Override
    public int lastIndexOf(Object o) {
        throw new UnsupportedOperationException("Not supported yet.");
    }

    @Override
    public ListIterator<T> listIterator() {
        throw new UnsupportedOperationException("Not supported yet.");
    }

    @Override
    public ListIterator<T> listIterator(int i) {
        return getPage().listIterator();
    }

    @Override
    public List<T> subList(int i, int i1) {
        throw new UnsupportedOperationException("Not supported yet.");
    }


}
