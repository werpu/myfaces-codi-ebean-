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

import java.awt.*;
import java.io.*;
import java.net.URL;
import java.util.ArrayList;
import java.util.Enumeration;
import java.util.jar.JarEntry;
import java.util.jar.JarFile;

/**
 * @author Werner Punz (latest modification by $Author$)
 * @version $Revision$ $Date$
 *
 * An unpacker for the jsdoc toolkit
 * Unfortunately we have to unpack the jsdoc toolkit during
 * the build process because we have a set of js files
 * running via rhino which will not work unless we have them
 * on the filesystem instead of the jar.
 *
 * The jsdoc toolkit itself can be streamed in via maven.
 */

public class JSDocUnpackerMaven extends JSDocUnpacker {

    /**
     * constructor
     *

     */
    public JSDocUnpackerMaven() {
        super();
        _jarPath = fetchJarLocation();

    }

    public void unpack(String targetDir, org.apache.maven.plugin.logging.Log log) throws IOException {
        JarFile jarFile = new JarFile(_jarPath);
        _expandJarFile(targetDir, log, jarFile);
    }

    protected String fetchJarLocation() {
        URL markerResourceLocation = this.getClass().getClassLoader().getResource("app/main.js");
        String markerResource = markerResourceLocation.getFile();
        markerResource = markerResource.substring(5);
        markerResource = markerResource.substring(0, markerResource.length()-"!/app/main.js".length());
        return markerResource;
    }

}
