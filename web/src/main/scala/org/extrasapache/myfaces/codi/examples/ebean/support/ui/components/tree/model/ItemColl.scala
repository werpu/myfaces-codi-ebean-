package org.extrasapache.myfaces.codi.examples.ebean.support.ui.components.tree.model

import java.util.ArrayList
import scala.collection.mutable.HashMap

/**
 *
 * @author Werner Punz (latest modification by $Author$)
 * @version $Revision$ $Date$
 *
 * the main collection which can hold a number of tree items
 */
@serializable
class ItemColl[S, T] {
    var childs = new ArrayList[T]
    var childIdx = new HashMap[String, Int]

    def hashChilds: Boolean = !childs.isEmpty()

    /**
     * sets a new element after the position given.
     * If the position is the last one the element is just appended
     */
    def set(pos: Int, children: T*) {
        var currentPos = pos
        children.foreach({
            child =>
                child match {
                    case child2: TreeItem[S] => {
                        if (currentPos >= childs.size() - 1) set(child)
                        else if (childIdx.get(child2.getLabel) == None) {
                            childIdx.put(child2.getLabel, currentPos)
                            childs.add(pos, child)
                            for (elem <- childIdx) {
                                var (key, value) = elem;
                                value = if (value > pos) value + 1 else value
                                childIdx.put(key, value)
                            }
                        }
                        currentPos += 1

                    }
                    case _ => throw new ClassCastException
                }
        })
    }

    /**
     * appends the current set of params
     */
    def set(children: T*) {
        children.foreach({
            child =>
                child match {
                    case child2: TreeItem[S] => {
                        val label = child2.getLabel
                        if (childIdx.get(label) == None) {
                            childs.add(child)
                            childIdx.put(label, childs.size() - 1)
                        } else {
                            childs.set(childIdx.get(label).get, child)
                        }
                    }

                    case _ => throw new ClassCastException
                }
        })
    }

    /**
     * returns an iterator on our currently selected childs
     */
    def iterator = childs.iterator()

    /**
     * gets a given element from a given identifier
     */
    def get(identifier: String): T = {
        val pos = childIdx.get(identifier).get
        childs.get(pos.intValue())
    }

    /**
     * moves the given elements one element down
     */
    def down(children: T*) {
        children.foreach({
            child =>
                child match {
                    case child2: TreeItem[S] => {
                        val label = child2.getLabel;
                        val pos = childIdx.get(label).get;
                        if (pos >= childs.size() - 1) return;
                        val replacement = childs.get(pos + 1)
                        val orig = childs.get(pos);
                        childs.set(pos, replacement)
                        childs.set(pos + 1, orig)
                        childIdx.put(replacement.asInstanceOf[TreeItem[_]].getLabel, pos)
                        childIdx.put(child2.getLabel, pos + 1)
                    }
                    case _ => throw new ClassCastException
                }
        })
    }

    /**
     * moves the given elements one element up
     */
    def up(children: T*) {
        children.foreach({
            child =>
                child match {
                    case child2: TreeItem[S] => {
                        val label = child2.getLabel;
                        val pos = childIdx.get(label).get;
                        if (pos == 0) return;
                        val replacement = childs.get(pos - 1)
                        val orig = childs.get(pos);
                        childs.set(pos, replacement)
                        childs.set(pos - 1, orig)
                        childIdx.put(replacement.asInstanceOf[TreeItem[_]].getLabel, pos)
                        childIdx.put(child2.getLabel, pos - 1)
                    }
                    case _ => throw new ClassCastException
                }
        })
    }

    /**
     * removes the given elements from our data structure
     */
    def remove(children: T*) {
        children.foreach({
            child =>
                child match {
                    case child2: TreeItem[S] => {
                        val label = child2.getLabel;

                        if (childIdx.get(label) != None) {
                            val pos = childIdx.get(label).get;
                            childs.remove(pos)
                            childIdx.remove(child2.getLabel)

                            for (elem <- childIdx) {
                                var (key, value) = elem;
                                value = if (value > pos) value - 1 else value
                                childIdx.put(key, value)
                            }
                        }
                    }
                    case _ => throw new ClassCastException
                }
        })
    }
}