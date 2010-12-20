/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package ejb.util;

import java.io.Serializable;

/**
 *
 * @author werpu2
 */
public class OrderEntry implements Serializable {
    String name;
    boolean asc;

    public boolean isAsc() {
        return asc;
    }

    public void setAsc(boolean asc) {
        this.asc = asc;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

}
