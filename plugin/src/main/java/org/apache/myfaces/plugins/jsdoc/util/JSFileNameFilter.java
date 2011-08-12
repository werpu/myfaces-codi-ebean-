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

package org.apache.myfaces.plugins.jsdoc.util;

import org.apache.commons.io.FilenameUtils;
import org.apache.commons.io.filefilter.IOFileFilter;

import java.io.File;

/**
 * @author Werner Punz (latest modification by $Author$)
 * @version $Revision$ $Date$
 *
 * A javascript filename filter which can be used within the context of commons-io
 */
public class JSFileNameFilter implements IOFileFilter {

    XMLConfig _fileMap = null;

    public JSFileNameFilter(XMLConfig fileMap) {
        this._fileMap = fileMap;
    }

    private boolean matchNames(String fileName) {
        for (String matchPattern : _fileMap.getFileNames()) {
            boolean ret = FilenameUtils.wildcardMatch(fileName, matchPattern);
            if (ret) return ret;
        }
        return false;
    }

    @Override
    public boolean accept(File file) {

        //no js file no match
        if (!file.getName().endsWith(".js")) return false;

        return matchNames(file.getAbsolutePath());
    }

    @Override
    public boolean accept(File file, String s) {
        if (!s.endsWith(".js")) return false;
        return matchNames(file.getAbsolutePath() + "/" + s);  //To change body of implemented methods use File | Settings | File Templates.
    }
}


