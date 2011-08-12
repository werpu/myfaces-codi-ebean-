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
import org.apache.commons.io.filefilter.TrueFileFilter;
import org.apache.maven.plugin.AbstractMojo;
import org.apache.maven.plugin.MojoExecutionException;
import org.apache.myfaces.plugins.jsdoc.util.*;
import org.mozilla.javascript.tools.shell.Main;

import javax.xml.stream.XMLStreamException;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

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

    //various jsdoc params, copied over as well as the corresponding snippets from
    /**
     * Whether to include symbols tagged as private. Default is <code>false</code>.
     *
     * @parameter expression="false"
     */
    private boolean includePrivate;

    /**
     * Include all functions, even undocumented ones. Default is <code>false</code>.
     *
     * @parameter expression="false"
     */
    private boolean includeUndocumented;

    /**
     * Include all functions, even undocumented, underscored ones. Default is <code>false</code>.
     *
     * @parameter expression="false"
     */
    private boolean includeUndocumentedUnderscored;

    /**
     * Use the -j option, must be set to <code>false</code> for JSDoc Toolkit 1.x. or
     * <code>true</code> for JSDoc Toolkit version 2.0 and above. Default is <code>true</code>.
     *
     * @parameter expression="true"
     */
    private boolean jArgument;

     /**
     * template directory used by jsdoc the default is <code>templates/jsdoc</code> under the jsdoc root
     * @parameter expression="templates/jsdoc"
     */
    private String templates;

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
            throw new MojoExecutionException(e.toString());
        } catch (FileNotFoundException e) {
            getLog().error(e);
            throw new MojoExecutionException(e.toString());
        }
        //unpacker = new JSDocUnpackerMaven()
        unpacker = new JSDocUnpackerMaven();

        jsdocTargetPath = projectBuildDir + File.separator + "temp" + File.separator + "jsdoc";
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

        String systemJsdocDir = System.getProperty("jsdoc.dir");
        System.setProperty("jsdoc.dir", jsdocTargetPath);

        List<String> args = new ArrayList<String>();
        String runJsPath = jsdocTargetPath +File.separator+"app" + File.separator + "run.js";
        args.add(runJsPath);

        if (this.includeUndocumented) {
            args.add("-a");
        }
        if (this.includeUndocumentedUnderscored) {
            args.add("-A");
        }
        if (this.includePrivate) {
            args.add("-p");
        }
        args.add("-d=" + this.getOutputDirectory());
        args.add("-t=" + getTemplateDirectory());
        args.addAll(getSources());
         //according to the run.js source the last argument
        //must be a -j param pointing to the jsdoc javascripts
        if(this.jArgument){
			args.add("-j=" + runJsPath);
		}
        getLog().info("[JSDOC] Executing within maven: '" + args.toString().replaceAll(",","") + "'");

		// tell Rhino to run JSDoc with the provided params
		// without calling System.exit
		org.mozilla.javascript.tools.shell.Main.main(args.toArray(new String[0]));
        if (systemJsdocDir != null) {
            System.setProperty("jsdoc.dir", systemJsdocDir);
        }
    }

    private String getTemplateDirectory() {
        return jsdocTargetPath + File.separator + this.templates;
    }

    private String getOutputDirectory() {
        return projectBuildDir+File.separator+"jsdoc";
    }

    private List<String> getSources() {
        Iterator<File> it = FileUtils.iterateFiles(new File(buildSourceDirectory), new JSFileNameFilter(fileMap), TrueFileFilter.INSTANCE);
        List toProcess = new ArrayList(40);
        while (it.hasNext()) {
            File currFile = it.next();
            toProcess.add(currFile.getAbsolutePath());

        }
        return toProcess;
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
