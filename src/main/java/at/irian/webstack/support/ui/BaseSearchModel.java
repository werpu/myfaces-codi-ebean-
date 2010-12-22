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

package at.irian.webstack.support.ui;

import at.irian.webstack.middle.util.FilterEntry;
import at.irian.webstack.middle.util.OpType;

import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

/**
 * @author Werner Punz (latest modification by $Author$)
 * @version $Revision$ $Date$
 */

public class BaseSearchModel {
    Map<String, Object> searchMap = new HashMap<String, Object>();
    int from = -1;
    int pageSize = -1;
    boolean searchPerformed = false;

    public List<FilterEntry> toFilterList() {
        List<FilterEntry> ret = new LinkedList<FilterEntry>();
        for (String key : searchMap.keySet()) {
            transformStrToFilter(ret, key);
        }

        searchPerformed = true;
        return ret;
    }

    private void transformStrToFilter(List<FilterEntry> ret, String strAttr) {
        if (searchMap.get(strAttr) != null && !((String) searchMap.get(strAttr)).isEmpty()) {
            ret.add(new FilterEntry(strAttr, searchMap.get(strAttr) + "%", String.class, OpType.LIKE));
        }
    }

    public Map<String, Object> getSearchMap() {
        return searchMap;
    }

    public void setSearchMap(Map<String, Object> searchMap) {
        this.searchMap = searchMap;
    }

    public int getFrom() {
        return from;
    }

    public void setFrom(int from) {
        this.from = from;
    }

    public int getPageSize() {
        return pageSize;
    }

    public void setPageSize(int pageSize) {
        this.pageSize = pageSize;
    }

    public boolean isSearchPerformed() {
        return searchPerformed;
    }

    public void setSearchPerformed(boolean searchPerformed) {
        this.searchPerformed = searchPerformed;
    }
}
