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

package org.extrasapache.myfaces.codi.examples.ebean.support.data;

import com.avaje.ebean.Page;
import com.avaje.ebean.PagingList;

import java.util.*;
import java.util.concurrent.Future;

/**
 * @author Werner Punz (latest modification by $Author$)
 * @version $Revision$ $Date$
 */

public class PaginationController<T> implements List<T>{
    PagingList<T> _delegate;
    int lastPageAccessed = 0;

    int pagingWindowSize = 8;

    public PaginationController(PagingList<T> delegate) {

        _delegate = delegate;
    }

    public void refresh() {
        _delegate.refresh();
    }

    public PagingList<T> setFetchAhead(boolean b) {
        return _delegate.setFetchAhead(b);
    }

    public Future<Integer> getFutureRowCount() {
        return _delegate.getFutureRowCount();
    }

    public List<T> getAsList() {
        return _delegate.getAsList();
    }

    public int getPageSize() {
        return _delegate.getPageSize();
    }

    public int getTotalRowCount() {
        return _delegate.getTotalRowCount();
    }

    public int getTotalPageCount() {
        return _delegate.getTotalPageCount();
    }

    public Page<T> getPage(int i) {
        lastPageAccessed = i;
        return _delegate.getPage(i);
    }

    public Page<T> fetchPage() {
        return _delegate.getPage(lastPageAccessed);
    }

    public int getLastPageAccessed() {
        return lastPageAccessed;
    }

    public void setLastPageAccessed(int lastPageAccessed) {
        this.lastPageAccessed = lastPageAccessed;
    }

    public boolean isInFirstWindow() {
        if(getPageSize() == 0) {
            return true;
        }
        return lastPageAccessed == 0;
    }



    public boolean isInLastWindow() {
        if(getPageSize() == 0) {
            return true;
        }
        return lastPageAccessed >= getTotalPageCount()-1;
    }

    public List<Integer> fetchPagesWindow() {
        List<Integer> ret = new ArrayList<Integer>(getPageSize());

        if(getTotalPageCount() == 1) {
            return ret;
        }

        int pagingWindowPos = (int) Math.floor((double) lastPageAccessed  / (double) pagingWindowSize);

        for (int cnt = pagingWindowPos; cnt < getTotalPageCount(); cnt++) {
            ret.add(cnt);
        }
        return ret;
    }

    
    /*we also have to implement a list interface for the jsf datatable,
    * either that or the table model I prefer the later*/
    
    
    public int size() {
        return fetchPage().getList().size();  
    }

    public boolean isEmpty() {
        return fetchPage().getList().isEmpty();  
    }

    public boolean contains(Object o) {
        return fetchPage().getList().contains(o);  
    }

    public Iterator<T> iterator() {
        return fetchPage().getList().iterator();  
    }

    public Object[] toArray() {
        return fetchPage().getList().toArray();  
    }

    public <T> T[] toArray(T[] ts) {
        return fetchPage().getList().toArray(ts);  
    }

    public boolean add(T t) {
        return fetchPage().getList().add(t);  
    }

    public boolean remove(Object o) {
        return fetchPage().getList().remove(o);  
    }

    public boolean containsAll(Collection<?> objects) {
        return fetchPage().getList().containsAll(objects);  
    }

    public boolean addAll(Collection<? extends T> ts) {
        return fetchPage().getList().addAll(ts);  
    }

    public boolean addAll(int i, Collection<? extends T> ts) {
        return fetchPage().getList().addAll(i, ts);  
    }

    public boolean removeAll(Collection<?> objects) {
        return fetchPage().getList().removeAll(objects);  
    }

    public boolean retainAll(Collection<?> objects) {
        return fetchPage().getList().retainAll(objects);  
    }

    public void clear() {
        fetchPage().getList().clear();
    }

    public T get(int i) {
        return fetchPage().getList().get(i);  
    }

    public T set(int i, T t) {
        return fetchPage().getList().set(i, t);  
    }

    public void add(int i, T t) {
        
        fetchPage().getList().add(i,t);
    }

    public T remove(int i) {
        return fetchPage().getList().remove(i);  
    }

    public int indexOf(Object o) {
        return fetchPage().getList().indexOf(o);
    }

    public int lastIndexOf(Object o) {
        return fetchPage().getList().lastIndexOf(o);
    }

    public ListIterator<T> listIterator() {
        return fetchPage().getList().listIterator();
    }

    public ListIterator<T> listIterator(int i) {
        return fetchPage().getList().listIterator(i);  
    }

    public List<T> subList(int i, int i1) {
        return fetchPage().getList().subList(i, i1);  
    }
}
