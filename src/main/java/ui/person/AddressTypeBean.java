/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package ui.person;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import javax.faces.bean.ManagedBean;

import javax.faces.bean.SessionScoped;
import javax.faces.model.SelectItem;
import support.data.AddressType;

/**
 *
 * @author werpu2
 */
@ManagedBean
@SessionScoped
public class AddressTypeBean implements Serializable {

    List items = null;

    public List<SelectItem> getAddressTypes() {
        if(items == null) {
            items = new ArrayList<SelectItem>(6);
            for(AddressType adrType: AddressType.values()) {
                items.add( new SelectItem(adrType.getKey(), Integer.toString(adrType.getValue()) ));
            }
        }
        return items;
    }

}
