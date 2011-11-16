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
class ItemColl[T <: SelectItem]
{
  var childs: ArrayList[T] = new ArrayList[T]
  private var childIdx = new HashMap[String, Int]

  def hashChilds: Boolean = childs.isEmpty()

  def set(child: T)
  {
    if (childIdx.get(child.getLabel()).get == null)
    {
      childs.add(child)
      childIdx.put(child.getLabel(), childs.size() - 1)
    } else
    {
      childs.set(childIdx.get(child.getLabel).get, child)
    }
  }

  def iterator = childs.iterator()

  def get(identifier: String)
  {
    val pos = childIdx.get(identifier).get
    if (pos != null)
    {
      childs.get(pos)
    } else
    {
      null
    }
  }

  def remove(child: T)
  {
    val pos = childIdx.get(child.getLabel).get
    if (pos != null)
    {
      childs.remove(pos)
      val newMap = new HashMap[String, Int]
      for (elem <- childIdx)
      {
        var (key, value) = elem;
        value = if (value > value) value - 1 else value
        newMap.put(key, value)
      }
      childIdx = newMap
    }
  }

}