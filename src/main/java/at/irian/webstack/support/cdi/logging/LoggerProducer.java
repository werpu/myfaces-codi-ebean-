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

package at.irian.webstack.support.cdi.logging;

import at.irian.webstack.support.cdi.util.Name;
import at.irian.webstack.support.cdi.util.SerializableProxyFactory;
import com.avaje.ebean.EbeanServer;

import javax.enterprise.inject.Produces;
import javax.enterprise.inject.spi.InjectionPoint;
import javax.inject.Named;
import javax.inject.Qualifier;
import java.lang.annotation.Annotation;
import java.util.Iterator;

/**
 * @author Werner Punz (latest modification by $Author$)
 * @version $Revision$ $Date$
 */

@Named
public class LoggerProducer {
    @Produces
    public Logger getLogger(InjectionPoint inP) {
        return new Logger(inP.getBean().getBeanClass().getName());
    }

    @Produces
    @Name
    public Logger getLoggerWithName(InjectionPoint inP) {
        Name qualifier = (Name) inP.getAnnotated().getAnnotation(Name.class);

        if (qualifier != null) {
            String val = qualifier.value();
            return new Logger(val);
        }

        return new Logger(inP.getBean().getBeanClass().getName());
    }

}
