package org.extrasapache.myfaces.codi.examples.ebean.support.ui.components.tree.model

import java.util.ArrayList
import scala.collection.mutable.HashMap
import javax.faces.model.SelectItem

/**
 *
 * @author Werner Punz (latest modification by $Author$)
 * @version $Revision$ $Date$
 */
@serializable
class ItemColl[S, T] {
    var childs = new ArrayList[T]
    private var childIdx = new HashMap[String, java.lang.Integer]

    def hashChilds: Boolean = childs.isEmpty()

    def set(child: T) {
        child match {
            case child2: TreeItem[S] => {
                val label = child2.label;

                val item = childIdx.get(label).get;
                if (item == null) {
                    childs.add(child)
                    childIdx.put(label, childs.size() - 1)
                } else {
                    childs.set(childIdx.get(label).get.intValue(), child)
                }
            }

            case _ => throw new ClassCastException
        }


    }

    def iterator = childs.iterator()

    def get(identifier: String): T = {
        val pos = childIdx.get(identifier).get
        childs.get(pos.intValue())
    }

    def remove(child: T) {
        /*val pos = childIdx.get(child.getLabel).get
       if (pos != null)
       {
         childs.remove(pos)
         val newMap = new HashMap[String, Integer]
         for (elem <- childIdx)
         {
           var (key, value) = elem;
           value = if (value > value) value - 1 else value
           newMap.put(key, value)
         }
         childIdx = newMap
       } */
    }

}