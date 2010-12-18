/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package ejb.orm;

/**
 *
 * @author werpu2
 */
public class FilterEntry {

    OpType opType;
    Object value;
    String name;
    Class entryType;

    public FilterEntry(String name, Object value, Class entryType, OpType opType) {
        this.opType = opType;
        this.value = value;
        this.name = name;
        this.entryType = entryType;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public OpType getOpType() {
        return opType;
    }

    public void setOpType(OpType opType) {
        this.opType = opType;
    }

    public Object getValue() {
        return value;
    }

    public void setValue(Object value) {
        this.value = value;
    }

    public Class getEntryType() {
        return entryType;
    }

    public void setEntryType(Class entryType) {
        this.entryType = entryType;
    }
}
