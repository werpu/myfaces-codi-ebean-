package org.extrasapache.myfaces.codi.examples.ebean.support.ui.components.tree.model

import reflect.BeanProperty
import org.extrasapache.myfaces.codi.examples.ebean.support.data.JSONAble

/**
 * Builder pattern for easier tree creation
 **/


/**
 *
 * @author Werner Punz (latest modification by $Author$)
 * @version $Revision$ $Date$
 *
 * a a tree item, which has the same identifier as the select item it holds
 *
 * <h3>Additional attributes:</h3>
 * <li>childs: an ItemColl holding its children with convenience methods</li>
 * <li>expanded: if set to true then the tree node is expanded</li>
 * <li>identifier: the identifier (equals the label)</li>
 * <li>value: the TreeValueHolder holding the current node value</li>
 */
@serializable
class TreeItem[T <: AnyRef] {
    @BeanProperty
    val childs = new ItemColl[T, TreeItem[T]]()
    @BeanProperty
    var expanded = false
    @BeanProperty
    var label: String = _
    @BeanProperty
    var description: String = _
    @BeanProperty
    var disabled: Boolean = _
    @BeanProperty
    var value: AnyRef = _

    /**
     * determines whether the node is lazy loaded
     * in that case the component gets back
     * a callback which tells the component
     * to load the next node level
     */
    @BeanProperty
    var lazyLoaded = false

    protected var _value: T = _ //setters and getters see below

    def TreeItem() {
    }


    def hasChilds: Boolean = childs.hashChilds

    def getChild(identifier: String): TreeItem[T] = childs.get(identifier)

    def append(label: String, description: String, value: T): TreeItem[T] = {
        val finalValue = new TreeItem[T]
        finalValue.setValue(value)
        finalValue.setLabel(label)
        finalValue.setDescription(description)
        childs.set(finalValue)
        finalValue
    }

  /*  def append(finalValue: TreeItem[T]): TreeItem[T] = {
        childs.set(finalValue)
        finalValue
    }*/

    def remove(identifier: String) {
        val child = childs.get(identifier)
        if (child != null) {
            childs.remove(child)
        }
    }

    def remove(child: TreeItem[T]) {
        childs.remove(child)
    }

    def childIterator: Iterator[TreeItem[T]] = {
        childs.iterator.asInstanceOf[Iterator[TreeItem[T]]]
    }

    def toJSON: String = {
        val jsonBuilder = new StringBuilder
        /*helper to make the jsonify code simpler*/
        def appendJSON(label: String, value: Any) {
            var theValue = value
            jsonBuilder.append(label).append(": ")
            if (theValue == null) theValue = ""

            theValue match {
                case value2: String => {
                    jsonBuilder.append("\"").append(value2.replaceAll("\"", "\\\\\"")).append("\"");
                }
                case _ => jsonBuilder.append(theValue);
            }
            jsonBuilder.append(",");
        }
        jsonBuilder.append("{")
        appendJSON("type", "TreeItem");
        appendJSON("label", label);
        appendJSON("disabled", disabled);
        appendJSON("expanded", expanded);
        appendJSON("description", description);

        val valueFinal = value match {
            case value2: JSONAble => {
                value2.toJSON
            }
            case value3: String => ("\"") + (value3.replaceAll("\"", "\\\\\"")) + ("\"")
            case _ => value
        }
        jsonBuilder.append("value: ").append(valueFinal)

        jsonBuilder.append("}")
        jsonBuilder.toString()
    }


}