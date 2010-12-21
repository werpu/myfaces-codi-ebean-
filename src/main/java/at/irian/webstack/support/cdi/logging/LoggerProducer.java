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
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.slf4j.LoggerFactory;

import javax.enterprise.inject.Produces;
import javax.enterprise.inject.spi.InjectionPoint;
import javax.inject.Named;

/**
 * @author Werner Punz (latest modification by $Author$)
 * @version $Revision$ $Date$
 *
 * Note we only have to proxy jul, both sl4j and
 * commons-logging survive serialisation per default
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
        String val = getValue(inP);

        return (val != null) ? new Logger(val): new Logger(inP.getBean().getBeanClass().getName());
    }

    private String getValue(InjectionPoint inP) {
        Name qualifier = (Name) inP.getAnnotated().getAnnotation(Name.class);

        return (qualifier != null) ?  qualifier.value(): null;
    }

    /*
    @Produces
    public Log getLoggerCL(InjectionPoint inP) {
        return LogFactory.getLog(inP.getBean().getBeanClass());
    }

    @Produces
    @Name
    public Log getLoggerCLWithName(InjectionPoint inP) {
        String val = getValue(inP);
        return (val != null)? LogFactory.getLog(val) :  LogFactory.getLog(inP.getBean().getBeanClass());
    }

    @Produces
    public org.slf4j.Logger getLoggerSL(InjectionPoint inP) {
        return LoggerFactory.getLogger(inP.getBean().getBeanClass());
    }

    @Produces
    @Name
    public org.slf4j.Logger getLoggerSLWithName(InjectionPoint inP) {
        String val = getValue(inP);
        return (val != null)? LoggerFactory.getLogger(val) :  LoggerFactory.getLogger(inP.getBean().getBeanClass());
    }

    */

}
