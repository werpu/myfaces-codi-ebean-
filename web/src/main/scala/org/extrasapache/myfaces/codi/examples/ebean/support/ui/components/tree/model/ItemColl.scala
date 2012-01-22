package org.extrasapache.myfaces.codi.examples.ebean.support.ui.components.tree.model

import java.util.ArrayList
import scala.collection.mutable.HashMap

/**
 *
 * @author Werner Punz (latest modification by $Author$)
 * @version $Revision$ $Date$
 */
@serializable
class ItemColl[S, T] {
    var childs = new ArrayList[T]
    var childIdx = new HashMap[String, Int]

    def hashChilds: Boolean = childs.isEmpty()

    def set(child: T) {
        child match {
            case child2: TreeItem[S] => {
                val label = child2.label;
                if (childIdx.get(label) == None) {
                    childs.add(child)
                    childIdx.put(label, childs.size() - 1)
                } else {
                    childs.set(childIdx.get(label).get, child)
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

    def down(child: T) {
        child match {
            case child2: TreeItem[S] => {
                val label = child2.label;
                val pos = childIdx.get(label).get;
                if (pos == childs.size() - 1) return;
                for {cnt <- 0 until childs.size();
                     if cnt == pos} {
                    val replacement = childs.get(pos - 1)
                    val orig = childs.get(pos);
                    childs.set(pos, replacement)
                    childs.set(pos + 1, orig)
                    childIdx.put(replacement.asInstanceOf[TreeItem[_]].label, pos)
                    childIdx.put(child2.label, pos + 1)
                    return;
                }
            }
            case _ => throw new ClassCastException
        }
    }


    def up(child: T) {
        child match {
            case child2: TreeItem[S] => {
                val label = child2.label;
                val pos = childIdx.get(label).get;
                if (pos == 0) return;
                for {cnt <- 0 until childs.size();
                     if cnt == pos} {
                    val replacement = childs.get(pos - 1)
                    val orig = childs.get(pos);
                    childs.set(pos, replacement)
                    childs.set(pos - 1, orig)
                    childIdx.put(replacement.asInstanceOf[TreeItem[_]].label, pos)
                    childIdx.put(child2.label, pos - 1)
                    return;
                }
            }
            case _ => throw new ClassCastException
        }
    }

    def remove(child: T) {
        child match {
            case child2: TreeItem[S] => {
                val label = child2.label;

                if (childIdx.get(label) != None) {
                    val pos = childIdx.get(label).get;
                    childs.remove(pos)
                    val newMap = new HashMap[String, Int]
                    for (elem <- childIdx) {
                        var (key, value) = elem;
                        value = if (value > pos) value - 1 else value
                        newMap.put(key, value)
                    }
                    childIdx = newMap
                }
            }
            case _ => throw new ClassCastException
        }
    }

}