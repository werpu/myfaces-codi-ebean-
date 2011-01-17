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

import javax.inject.Named;
import java.util.LinkedList;
import java.util.List;


/**
 * @author Werner Punz (latest modification by $Author$)
 * @version $Revision$ $Date$
 */

@Named
public class Tmp {
    List<Integer> _vals = new LinkedList<Integer>();

    public Tmp() {
        for(int cnt = 0; cnt < 100; cnt++) {
            _vals.add(cnt);
        }
    }

    public List<Integer> getVals() {
        return _vals;
    }

    public void setVals(List<Integer> vals) {
        _vals = vals;
    }
}
