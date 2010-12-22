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
package at.irian.webstack.support.cdi.ebean;

import at.irian.webstack.support.cdi.util.Factory;
import at.irian.webstack.support.cdi.util.Name;
import at.irian.webstack.support.cdi.util.SerializableProxyFactory;
import com.avaje.ebean.Ebean;
import com.avaje.ebean.EbeanServer;

import javax.enterprise.inject.Produces;
import javax.enterprise.inject.spi.InjectionPoint;
import javax.inject.Named;
import javax.persistence.PersistenceContext;
import java.io.Serializable;

/**
 * @author Werner Punz (latest modification by $Author$)
 * @version $Revision$ $Date$
 *          <p/>
 *          Producer which issues the correct cdi artifacts based on ajaves ebean
 */
@Named
public class EbeanCDIProducer implements Serializable {

    public class EBeanFactory implements Factory {

        String serverName = null;

        public EBeanFactory(String serverName) {
            this.serverName = serverName;
        }

        public Object createInstance() {
            return Ebean.getServer(null);
        }
    }

    /**
     * produces an ebean server, usually if no parameter is given the default
     * root server is chosen if a value param is given we use the one from the value
     */

    @Produces
    public EbeanServer getEbeanServer(InjectionPoint inP) {
        return (EbeanServer) SerializableProxyFactory.newInstance(new EBeanFactory(null));

    }

    /**
     * produces an ebean server, usually if no parameter is given the default
     * root server is chosen if a value param is given we use the one from the value
     */

    @Produces
    @Name
    public EbeanServer getEbeanServerWithName(InjectionPoint inP) {
        Name qualifier = inP.getAnnotated().getAnnotation(Name.class);
        String unitName = (qualifier != null) ? qualifier.value() : null;
        //String val = inP.getAnnotated().getAnnotation()
        if (unitName != null && unitName.isEmpty()) {
            unitName = null;
        }
        EbeanServer serv = (EbeanServer) SerializableProxyFactory.newInstance(new EBeanFactory(null));
        return serv;
    }

    /*@Produces
    @PersistenceContext
    public EbeanServer getEbeanServerFromEM(InjectionPoint inP) {
        PersistenceContext qualifier = inP.getAnnotated().getAnnotation(PersistenceContext.class);
        String unitName = (qualifier != null) ? qualifier.unitName() : null;
        if (unitName != null && unitName.isEmpty()) {
            unitName = null;
        }
        EbeanServer serv = (EbeanServer) SerializableProxyFactory.newInstance(new EBeanFactory(null));
        return serv;
    } */

}
