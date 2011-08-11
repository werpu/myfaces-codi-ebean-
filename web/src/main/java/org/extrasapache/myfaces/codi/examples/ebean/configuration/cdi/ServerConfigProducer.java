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

package org.extrasapache.myfaces.codi.examples.ebean.configuration.cdi;

import com.avaje.ebean.config.AutofetchConfig;
import com.avaje.ebean.config.DataSourceConfig;
import com.avaje.ebean.config.ServerConfig;
import org.extrasapache.myfaces.codi.examples.ebean.orm.person.Address;
import org.extrasapache.myfaces.codi.examples.ebean.orm.person.Entry;
import org.extrasapache.myfaces.codi.examples.ebean.orm.person.Person;
import org.extrasapache.myfaces.codi.examples.ebean.orm.security.SecGroup;
import org.extrasapache.myfaces.codi.examples.ebean.orm.security.User;

/**
 * Producer for the server config, note we use a programmatic configuration approach here
 * for the various configurations like it, deployment etc.. we can use the beans xml
 * switching and alternatives
 *
 * @author Werner Punz (latest modification by $Author$)
 * @version $Revision$ $Date$
 */

//@Named
public class ServerConfigProducer {
    //@Produces
    ServerConfig getDefaultServerConfig() {
        ServerConfig ret = new ServerConfig();

        ret.setDatabasePlatformName("h2");
        ret.setDdlGenerate(true);
        ret.setDdlRun(false);

        ret.setDebugSql(true);
        ret.setLoggingDirectory("logs");

        ret.addClass(Person.class);
        ret.addClass(Address.class);
        ret.addClass(User.class);
        ret.addClass(SecGroup.class);
        ret.addClass(Entry.class);

        return ret;
    }

    /*
    ebean.autofetch.querytuning=true
    ebean.autofetch.profiling=true
    ebean.autofetch.implicitmode=default_off
    ebean.autofetch.profiling.min=1
    ebean.autofetch.profiling.base=10
     */

    //@Produces
    public AutofetchConfig getDefaultAutofetchConfig() {
        AutofetchConfig config = new AutofetchConfig();
        config.setQueryTuning(true);

        config.setProfiling(true);
        config.setProfilingMin(1);
        config.setProfilingBase(10);

        return config;
    }

    /**
     * datasource.h2.username=sa
     * datasource.h2.password=
     * datasource.h2.databaseUrl=jdbc:h2:database/test;AUTO_SERVER=true
     * datasource.h2.databaseDriver=org.h2.Driver
     * datasource.h2.minConnections=1
     * datasource.h2.maxConnections=25
     * datasource.h2.heartbeatsql=select 'x'
     * datasource.h2.isolationlevel=read_committed
     * datasource.h2.capturestacktrace=true
     */
    //@Produces
    public DataSourceConfig getFefaultDatasourceConfig() {
        DataSourceConfig dataSourceConfig = new DataSourceConfig();
        dataSourceConfig.setDriver("org.h2.Driver");
        dataSourceConfig.setUrl("jdbc:h2:database/test;AUTO_SERVER=true");
        dataSourceConfig.setMaxConnections(1);
        dataSourceConfig.setMaxConnections(25);
        dataSourceConfig.setHeartbeatSql("select 'x'");
        dataSourceConfig.setUsername("sa");
        dataSourceConfig.setPassword("");
        dataSourceConfig.setCaptureStackTrace(true);
        return dataSourceConfig;
    }

}
