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

import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.Serializable;
import java.util.ResourceBundle;
import java.util.logging.Filter;
import java.util.logging.Handler;
import java.util.logging.Level;
import java.util.logging.LogRecord;

/**
 * @author Werner Punz (latest modification by $Author$)
 * @version $Revision$ $Date$

 */

public class Logger implements Serializable {
    private static final int MIN_TRACE_DEPTH = 3;
    private static final String PACKAGE_ID = "at.irian.webstack.support.cdi.logging";
    transient java.util.logging.Logger logger;

    String loggerName = null;

    public Logger(String loggerName) {
        this.logger = java.util.logging.Logger.getLogger(loggerName);
        this.loggerName = loggerName;
    }

    protected Logger(java.util.logging.Logger logger) {
        this.logger = logger;
    }

    public static Logger getLogger(String s) {
        return new Logger(java.util.logging.Logger.getLogger(s));
    }

    public static Logger getLogger(String s, String s1) {
        return new Logger(java.util.logging.Logger.getLogger(s, s1));
    }

    public static Logger getAnonymousLogger() {
        return new Logger(java.util.logging.Logger.getAnonymousLogger());
    }

    public static java.util.logging.Logger getAnonymousLogger(String s) {
        return java.util.logging.Logger.getAnonymousLogger(s);
    }

    public ResourceBundle getResourceBundle() {
        return logger.getResourceBundle();
    }

    public String getResourceBundleName() {
        return logger.getResourceBundleName();
    }

    public void setFilter(Filter filter) throws SecurityException {
        logger.setFilter(filter);
    }

    public Filter getFilter() {
        return logger.getFilter();
    }

    public void log(LogRecord logRecord) {
        logger.log(logRecord);
    }

    public void log(Level level, String s) {
        if (!logger.isLoggable(level)) {
            return;
        }
        StackTraceElement traceElement = getCaller();

        logger.logp(level, traceElement.getClassName(), traceElement.getFileName(), s);
    }

    private StackTraceElement getCaller() {
        StackTraceElement[] trace = Thread.currentThread().getStackTrace();

        StackTraceElement elem = trace[Math.max(Math.min(trace.length - 1, MIN_TRACE_DEPTH), 0)];
        int cnt = MIN_TRACE_DEPTH + 1;
        //in case of a pattern still present we have to walk higher than the min height
        while (elem.getClassName().startsWith(PACKAGE_ID) && cnt < trace.length) {
            elem = trace[Math.max(Math.min(trace.length - 1, cnt), 0)];
        }
        return elem;
    }

    public void log(Level level, String s, Object o) {
        if (!logger.isLoggable(level)) {
            return;
        }
        StackTraceElement traceElement = getCaller();

        logger.logp(level, traceElement.getClassName(), traceElement.getMethodName(), s, o);
    }

    public void log(Level level, String s, Object[] objects) {
        if (!logger.isLoggable(level)) {
            return;
        }

        StackTraceElement traceElement = getCaller();

        logger.logp(level, traceElement.getClassName(), traceElement.getMethodName(), s, objects);
    }

    public void log(Level level, String s, Throwable throwable) {
        if (!logger.isLoggable(level)) {
            return;
        }

        StackTraceElement traceElement = getCaller();

        logger.logp(level, traceElement.getClassName(), traceElement.getMethodName(), s, throwable);
    }

    public void logp(Level level, String s, String s1, String s2) {
        //no level check here, we do not do anything here so no pre performance check is needed
        logger.logp(level, s, s1, s2);
    }

    public void logp(Level level, String s, String s1, String s2, Object o) {
        logger.logp(level, s, s1, s2, o);
    }

    public void logp(Level level, String s, String s1, String s2, Object[] objects) {
        logger.logp(level, s, s1, s2, objects);
    }

    public void logp(Level level, String s, String s1, String s2, Throwable throwable) {
        logger.logp(level, s, s1, s2, throwable);
    }

    public void logrb(Level level, String s, String s1, String s2, String s3) {
        logger.logrb(level, s, s1, s2, s3);
    }

    public void logrb(Level level, String s, String s1, String s2, String s3, Object o) {
        logger.logrb(level, s, s1, s2, s3, o);
    }

    public void logrb(Level level, String s, String s1, String s2, String s3, Object[] objects) {
        logger.logrb(level, s, s1, s2, s3, objects);
    }

    public void logrb(Level level, String s, String s1, String s2, String s3, Throwable throwable) {
        logger.logrb(level, s, s1, s2, s3, throwable);
    }

    public void entering(String s, String s1) {
        StackTraceElement traceElement = getCaller();

        logger.entering(traceElement.getClassName(), traceElement.getMethodName());
    }

    public void entering(String s, String s1, Object o) {
        StackTraceElement traceElement = getCaller();

        logger.entering(traceElement.getClassName(), traceElement.getMethodName(), o);
    }

    public void entering(String s, String s1, Object[] objects) {
        StackTraceElement traceElement = getCaller();

        logger.entering(traceElement.getClassName(), traceElement.getMethodName(), objects);
    }

    public void exiting(String s, String s1) {
        StackTraceElement traceElement = getCaller();

        logger.exiting(traceElement.getClassName(), traceElement.getMethodName());
    }

    public void exiting(String s, String s1, Object o) {
        StackTraceElement traceElement = getCaller();

        logger.exiting(traceElement.getClassName(), traceElement.getMethodName(), o);
    }

    public void throwing(String s, String s1, Throwable throwable) {
        logger.throwing(s, s1, throwable);
    }

    public void severe(String s) {
        if (!logger.isLoggable(Level.SEVERE)) {
            return;
        }

        StackTraceElement traceElement = getCaller();

        logger.logp(Level.SEVERE, traceElement.getClassName(), traceElement.getMethodName(), s);
    }

    public void warning(String s) {
        if (!logger.isLoggable(Level.WARNING)) {
            return;
        }

        StackTraceElement traceElement = getCaller();

        logger.logp(Level.WARNING, traceElement.getClassName(), traceElement.getMethodName(), s);
    }

    public void info(String s) {
        if (!logger.isLoggable(Level.INFO)) {
            return;
        }

        StackTraceElement traceElement = getCaller();

        logger.logp(Level.INFO, traceElement.getClassName(), traceElement.getMethodName(), s);
    }

    public void config(String s) {
        logger.config(s);
    }

    public void fine(String s) {
        if (!logger.isLoggable(Level.FINE)) {
            return;
        }

        StackTraceElement traceElement = getCaller();

        logger.logp(Level.FINE, traceElement.getClassName(), traceElement.getMethodName(), s);
    }

    public void finer(String s) {
        if (!logger.isLoggable(Level.FINER)) {
            return;
        }

        StackTraceElement traceElement = getCaller();

        logger.logp(Level.FINER, traceElement.getClassName(), traceElement.getMethodName(), s);
    }

    public void finest(String s) {
        if (!logger.isLoggable(Level.FINEST)) {
            return;
        }

        StackTraceElement traceElement = getCaller();

        logger.logp(Level.FINEST, traceElement.getClassName(), traceElement.getMethodName(), s);
    }

    public void setLevel(Level level) throws SecurityException {
        logger.setLevel(level);
    }

    public Level getLevel() {
        return logger.getLevel();
    }

    public boolean isLoggable(Level level) {
        return logger.isLoggable(level);
    }

    public String getName() {
        return logger.getName();
    }

    public void addHandler(Handler handler) throws SecurityException {
        logger.addHandler(handler);
    }

    public void removeHandler(Handler handler) throws SecurityException {
        logger.removeHandler(handler);
    }

    public Handler[] getHandlers() {
        return logger.getHandlers();
    }

    public void setUseParentHandlers(boolean b) {
        logger.setUseParentHandlers(b);
    }

    public boolean getUseParentHandlers() {
        return logger.getUseParentHandlers();
    }

    public java.util.logging.Logger getParent() {
        return logger.getParent();
    }

    public void setParent(java.util.logging.Logger logger) {
        this.logger.setParent(logger);
    }

    /**
     * since logger is a class not an interface in jul we have to delegate fully blown
     *
     * @param in
     * @throws IOException
     * @throws ClassNotFoundException
     */
    private void readObject(ObjectInputStream in) throws IOException, ClassNotFoundException {
        /*we have to get injection up and running to eliminate this code here*/
        in.defaultReadObject();
        logger = java.util.logging.Logger.getLogger(loggerName);
    }

}
