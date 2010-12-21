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

package at.irian.webstack.support.cdi.util;

import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.Serializable;
import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.List;
import java.util.Arrays;

/**
 * @author Werner Punz (latest modification by $Author$)
 * @version $Revision$ $Date$
 *          <p/>
 *          generates a proxy for the ebean server
 */

public class SerializableProxyFactory implements InvocationHandler, Serializable {

    Factory generator = null;

    transient Object delegate = null;

    public static Object newInstance(Factory generator) {

        Object obj = generator.createInstance();
        List<Class<?>> interfaces = new ArrayList<Class<?>>(Arrays.asList(obj.getClass().getInterfaces()));
        interfaces.add(Serializable.class);

        return java.lang.reflect.Proxy.newProxyInstance(
                obj.getClass().getClassLoader(),
                interfaces.toArray(new Class[interfaces.size()]),
                new SerializableProxyFactory(obj, generator));
    }

    private SerializableProxyFactory(Object obj, Factory generator) {
        this.delegate = obj;
        this.generator = generator;
    }



    private void readObject(ObjectInputStream in) throws IOException, ClassNotFoundException {
        /*we have to get injection up and running to eliminate this code here*/
        in.defaultReadObject();
        delegate = generator.createInstance();
    }

    public Object invoke(Object o, Method method, Object[] args) throws Throwable {
        //delegate = generator.createInstance();
        if (!method.getName().equals("readObject") && !method.getName().equals("writeObject")) {
            return method.invoke(delegate, args);
        }
        return null;
    }
}