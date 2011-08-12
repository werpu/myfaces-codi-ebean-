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

package org.apache.myfaces.plugins.jsdoc;

import org.apache.commons.io.FileUtils;
import org.apache.commons.io.FilenameUtils;
import org.apache.commons.io.filefilter.IOFileFilter;
import org.apache.commons.io.filefilter.TrueFileFilter;
import org.apache.maven.plugin.AbstractMojo;
import org.apache.maven.plugin.MojoExecutionException;
import org.apache.myfaces.plugins.jsdoc.util.JSDocUnpacker;
import org.apache.myfaces.plugins.jsdoc.util.JSFileNameFilter;
import org.apache.myfaces.plugins.jsdoc.util.XMLConfig;

import javax.xml.stream.XMLStreamException;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.Iterator;

/**
 * @author Werner Punz (latest modification by $Author$)
 * @version $Revision$ $Date$
 *          <p/>
 *          A simple jsdoc plugin which should cover our documentation needs
 * @goal jsdoc
 */
public class JSDocMojo extends AbstractMojo {

    /**
     * the root project build dir (target directory)
     *
     * @parameter expression="${project.build.directory}"
     */
    String projectBuildDir;

    /**
     * The project source directory
     *
     * @parameter expression="${project.build.directory}/../src/"
     */
    String buildSourceDirectory;

    /**
     * Path to the assembly file containing the file paths to our source javascript files
     *
     * @parameter expression="${project.build.directory}/../src/assembler/jsfscripts-compiler.xml"
     */
    String assemblyFile;

    /**
     * the parsed xml filemap containing the single source files
     */
    XMLConfig fileMap;

    JSDocUnpacker unpacker;

    String jsdocTargetPath = null;

    protected void _setup() throws MojoExecutionException {
        try {
            fileMap = new XMLConfig(assemblyFile);
        } catch (XMLStreamException e) {
            getLog().error(e);
            throw new  MojoExecutionException(e.toString());
        } catch (FileNotFoundException e) {
            getLog().error(e);
            throw new MojoExecutionException(e.toString());
        }

        unpacker = new JSDocUnpacker();

        jsdocTargetPath =  projectBuildDir+ File.separator + "temp" + File.separator+"jsdoc";
        File pathCreator = new File(jsdocTargetPath);
        pathCreator.mkdirs();
    }



    public void _tearDown() {

    }

    protected void _execute() throws MojoExecutionException, IOException {
          getLog().info("[JSDOC] Unpacking jsdoc toolkit for further processing");
          getSources();
          //now we have all files we now can now work on our plugin call
          getLog().info("[JSDOC] Unpacking jsdoc toolkit for further processing");
          unpacker.unpack(jsdocTargetPath, getLog());
          getLog().info("[JSDOC] Unpacking jsdoc toolkit for further processing done");
      }

    private void getSources() {
        Iterator<File> it = FileUtils.iterateFiles(new File(buildSourceDirectory), new JSFileNameFilter(fileMap), TrueFileFilter.INSTANCE);
        StringBuilder toProcess = new StringBuilder();
        while(it.hasNext()) {
            File currFile = it.next();
            toProcess.append(currFile.getAbsolutePath());
            toProcess.append(" ");
        }
    }

    public void execute() throws MojoExecutionException {
        _setup();
        try {
            _execute();
        } catch (IOException e) {
            throw new MojoExecutionException(e.toString());
        }

    }

}
