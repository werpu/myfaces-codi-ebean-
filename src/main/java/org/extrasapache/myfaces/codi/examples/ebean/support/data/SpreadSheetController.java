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

import javax.enterprise.context.Dependent;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * @author Werner Punz (latest modification by $Author$)
 * @version $Revision$ $Date$
 *          <p/>
 *          controller which keeps track of the spreadsheeting state
 */

@Dependent
public class SpreadSheetController implements Serializable {
    Set<Comparable> _editable = new HashSet<Comparable>();

    public SpreadSheetController() {

    }

    public void clear() {
        _editable.clear();
    }

    public void enableEdit(Identifyable instance) {
        _editable.add(instance.getId());
    }

    public void disableEdit(Identifyable instance) {
        _editable.remove(instance.getId());
    }

    public Boolean isEditable(Identifyable instance) {
        return _editable.contains(instance.getId());
    }

    public boolean isEmpty() {
        return _editable.isEmpty();
    }
}
