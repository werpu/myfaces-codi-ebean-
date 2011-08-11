package org.extrasapache.myfaces.codi.examples.ebean.business.util

/**
 *
 * @author Werner Punz (latest modification by $Author$)
 * @version $Revision$ $Date$
 */

class OrderEntry(var name: String,var asc: Boolean) {
  def this() {
    this (null, false)
  }
}