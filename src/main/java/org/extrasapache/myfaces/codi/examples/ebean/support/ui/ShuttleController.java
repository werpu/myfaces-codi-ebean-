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

package org.extrasapache.myfaces.codi.examples.ebean.support.ui;

import javax.enterprise.context.Dependent;
import javax.faces.model.SelectItem;
import java.io.Serializable;
import java.util.Collection;
import java.util.LinkedList;
import java.util.List;
import java.util.LinkedHashMap;

/**
 * @author Werner Punz (latest modification by $Author$)
 * @version $Revision$ $Date$
 *          <p/>
 *          Shuttle control controller which can be used
 *          by our own ajaxing shuttle control
 */

@Dependent
@SuppressWarnings("unchecked")
public class ShuttleController implements Serializable {

    //TODO I need to implemen a ListMap to roll things
    LinkedHashMap<String, SelectItem> _right = new LinkedHashMap<String, SelectItem>();
    LinkedHashMap<String, SelectItem> _left = new LinkedHashMap<String, SelectItem>();

    //separate idx to determine the current position of a given element
    List<String> _rightIdx = new LinkedList<String>();
    List<String> _leftIdx = new LinkedList<String>();

    List<String> _selectionsLeft = new LinkedList<String>();
    List<String> _selectionsRight = new LinkedList<String>();

    public String shuttleTopLeft() {
        _left = _shuffleTop(_left, _leftIdx, _selectionsLeft);
        return null;
    }

    public String shuttleUpLeft() {
        _left = _shuffleUp(_left, _leftIdx, _selectionsLeft);
        return null;
    }

    public String shuttleTopRight() {
        _right = _shuffleTop(_right, _rightIdx, _selectionsRight);
        return null;
    }

    public String shuttleUpRight() {
        _right = _shuffleUp(_right, _rightIdx, _selectionsRight);
        return null;
    }

    public String shuttleDownLeft() {
        _left = _shuffleDown(_left, _leftIdx, _selectionsLeft);
        return null;
    }

    public String shuttleBottomLeft() {
        _left = _shuffleBottom(_left, _leftIdx, _selectionsLeft);
        return null;
    }

    public String shuttleDownRight() {
        _right = _shuffleDown(_right, _rightIdx, _selectionsRight);
        return null;
    }

    public String shuttleBottomRight() {
        _right = _shuffleBottom(_right, _rightIdx, _selectionsRight);
        return null;
    }

    LinkedHashMap _shuffleTop(LinkedHashMap<String, SelectItem> holder, List<String> idx, List<String> currentItem) {
        int cnt = 0;
        for (String key : currentItem) {
            int pos = idx.indexOf(key);
            idx.remove(key);
            idx.add(cnt, key);
            cnt++;
        }
        return getReorganizedMap(holder, idx);
    }

    LinkedHashMap _shuffleBottom(LinkedHashMap<String, SelectItem> holder, List<String> idx, List<String> currentItem) {
        int cnt = 0;
        for (String key : currentItem) {
            int pos = idx.indexOf(key);
            idx.remove(key);
            idx.add(key);
        }
        return getReorganizedMap(holder, idx);
    }

    LinkedHashMap _shuffleDown(LinkedHashMap<String, SelectItem> holder, List<String> idx, List<String> currentItem) {

        for (String key : currentItem) {
            int pos = idx.indexOf(key);
            idx.remove(key);
            idx.add(Math.min(pos + 1, idx.size() - 1), key);
        }
        return getReorganizedMap(holder, idx);

    }

    private LinkedHashMap getReorganizedMap(LinkedHashMap<String, SelectItem> holder, List<String> idx) {
        LinkedHashMap<String, SelectItem> finalMap = new LinkedHashMap<String, SelectItem>();
        for (String key : idx) {
            finalMap.put(key, holder.get(key));
        }

        return finalMap;
    }

    LinkedHashMap _shuffleUp(LinkedHashMap<String, SelectItem> holder, List<String> idx, List<String> currentItem) {

        for (String key : currentItem) {
            int pos = idx.indexOf(key);
            idx.remove(key);
            idx.add(Math.max(pos - 1, 0), key);
        }
        return getReorganizedMap(holder, idx);

    }

    public String fromRightToLeft() {
        for (String key : _selectionsRight) {
            _left.put(key, _right.remove(key));
            _rightIdx.remove(key);
            _leftIdx.add(key);
        }
        return null;
    }

    public String fromLeftToRight() {
        for (String key : _selectionsLeft) {
            _right.put(key, _left.remove(key));
            _leftIdx.remove(key);
            _rightIdx.add(key);
        }
        return null;
    }

    public Collection<SelectItem> getRight() {
        return _right.values();
    }

    public void setRight(Collection<SelectItem> right) {
        _right = new LinkedHashMap();
        _rightIdx.clear();
        for (SelectItem sourceItem : right) {
            _right.put((String) sourceItem.getValue(), sourceItem);
            _rightIdx.add((String) sourceItem.getValue());
        }
    }

    public Collection<SelectItem> getLeft() {
        return _left.values();
    }

    public void setLeft(List<SelectItem> left) {
        _left = new LinkedHashMap();
        _left.clear();
        for (SelectItem sourceItem : left) {
            _left.put((String) sourceItem.getValue(), sourceItem);
            _leftIdx.add((String) sourceItem.getValue());
        }
    }

    public List<String> getSelectionsLeft() {
        return _selectionsLeft;
    }

    public void setSelectionsLeft(List<String> selectionsLeft) {
        _selectionsLeft = selectionsLeft;
    }

    public List<String> getSelectionsRight() {
        return _selectionsRight;
    }

    public void setSelectionsRight(List<String> selectionsRight) {
        _selectionsRight = selectionsRight;
    }
}
