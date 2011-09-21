package org.extrasapache.myfaces.codi.examples.ebean.support.ui.components.tree

import javax.faces.bean.{ApplicationScoped, ManagedBean}

/**
 *
 * @author Werner Punz (latest modification by $Author$)
 * @version $Revision$ $Date$
 *
 * A helper for the tree to display several things which in the
 * current facelet flow would break xhtml
 * we offload it to an application singleton
 */
@ManagedBean
@ApplicationScoped
class TreeHelpers {
  val BEGIN_LEVEL = "<ol class=\"collapsibleTree\">"
  val END_LEVEL = "</ol>"
  def fetchBeginLevel(identifier: String) {
     BEGIN_LEVEL
  }

  def fetchEndLevel() {
     END_LEVEL
  }


}