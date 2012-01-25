package org.extrasapache.myfaces.codi.examples.ebean.support.data

/**
 *
 * @author Werner Punz (latest modification by $Author$)
 * @version $Revision$ $Date$
 *
 * marks a class as jsonable, which means it produces
 * one toJSON method which transforms its representation
 * into a valid json representation
 */

abstract trait JSONAble {
    def toJSON:String
}