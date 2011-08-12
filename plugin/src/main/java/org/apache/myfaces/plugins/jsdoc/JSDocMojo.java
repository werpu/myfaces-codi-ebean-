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

import javax.xml.stream.XMLStreamException;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import static org.apache.myfaces.plugins.jsdoc.JSDocMojoConst.*;

/**
 * @author Werner Punz (latest modification by $Author$)
 * @version $Revision$ $Date$
 *          <p/>
 *          A simple jsdoc plugin which should cover our documentation needs
 *          Note this plugin is a simplified tailored derivate from
 *          <p/>
 *          http://www.abiss.gr some code stems from there.
 *          <p/>
 *          since we use jsdoc for now and are not in the reporting part
 *          a simple plugin suffices.
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
    boolean includePrivate;

    /**
     * Include all functions, even undocumented ones. Default is <code>false</code>.
     *
     * @parameter expression="false"
     */
    boolean includeUndocumented;

    /**
     * Include all functions, even undocumented, underscored ones. Default is <code>false</code>.
     *
     * @parameter expression="false"
     */
     boolean includeUndocumentedUnderscored;

    /**
     * template directory used by jsdoc the default is <code>templates/jsdoc</code> under the jsdoc root
     *
     * @parameter expression="templates/jsdoc"
     */
     String templates;

    /**
     * output dir override
     *
     * @parameter expression=""
     */
     String outputDirectory;

    /**
     * the parsed xml filemap containing the single source files
     */
    XMLConfig fileMap;

    JSDocPack unpacker;

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
        unpacker = new JSDocPackResources();

        jsdocTargetPath = projectBuildDir + File.separator + TEMP + File.separator + JSDOC;
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

        String systemJsdocDir = System.getProperty(JSDOC_DIR);
        System.setProperty(JSDOC_DIR, jsdocTargetPath);

        List<String> args = _initArguments();

        getLog().info("[JSDOC] Executing within maven: '" + args.toString().replaceAll(",", "") + "'");

        // tell Rhino to run JSDoc with the provided params
        // without calling System.exit
        org.mozilla.javascript.tools.shell.Main.main(args.toArray(new String[0]));
        if (systemJsdocDir != null) {
            System.setProperty(JSDOC_DIR, systemJsdocDir);
        }
    }

    private final List<String> _initArguments() {
        List<String> args = new ArrayList<String>();
        String runJsPath = jsdocTargetPath + File.separator + APP + File.separator + RUN_JS;
        args.add(runJsPath);

        if (this.includeUndocumented) {
            args.add(PARAM_UNDOCUMENTED);
        }
        if (this.includeUndocumentedUnderscored) {
            args.add(PARAM_UNDOCUMENTED_UNDERSCORED);
        }
        if (this.includePrivate) {
            args.add(PARAM_PRIVATE);
        }
        args.add(PARAM_OUTPUT + EQUALS + this.getOutputDirectory());
        args.add(PARAM_TEMPLATE + EQUALS + getTemplateDirectory());

        args.addAll(getSources());
        //according to the run.js source the last argument
        //must be a -j param pointing to the jsdoc javascripts
        args.add(PARAM_JS_FLAG + EQUALS + runJsPath);
        return args;
    }

    private final String getTemplateDirectory() {
        return (TEMPLATES_JSDOC.equals(this.templates)) ?
                this.jsdocTargetPath + File.separator + this.templates :
                this.templates;
    }

    private final String getOutputDirectory() {
        return (this.outputDirectory == null || this.outputDirectory.equals("")) ?
                projectBuildDir + File.separator + JSDOC :
                this.outputDirectory;

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
