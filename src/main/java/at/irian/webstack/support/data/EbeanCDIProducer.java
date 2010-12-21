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
package at.irian.webstack.support.data;

import com.avaje.ebean.Ebean;
import com.avaje.ebean.EbeanServer;

import javax.enterprise.inject.Produces;
import javax.enterprise.inject.spi.InjectionPoint;

/**
 * @author Werner Punz (latest modification by $Author$)
 * @version $Revision$ $Date$
 *
 * Producer which issues the correct cdi artifacts based on ajaves ebean
 *
 */
public class EbeanCDIProducer {


    /**
     * produces an ebean server, usually if no parameter is given the default
     * root server is chosen if a value param is given we use the one from the value
     *
     */

    @Produces
    @EbeanPersistenceContext(value="")
    EbeanServer getEbeanServer(InjectionPoint inP) {
        String val = inP.getAnnotated().getAnnotation(EbeanPersistenceContext.class).value();
        //String unitName =  inP.getAnnotated().getAnnotation(EbeanPersistenceContext.class).unitName();

        EbeanServer serv = Ebean.getServer(val);


        //TODO deal with the unit name override

        return serv;
    }

}
