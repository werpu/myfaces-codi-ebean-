/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package support.ui;

import javax.faces.component.UIComponent;
import javax.faces.context.FacesContext;
import javax.faces.convert.Converter;
import javax.faces.convert.FacesConverter;
import support.data.AddressType;

/**
 *
 * @author werpu2
 */
@FacesConverter(value="addressTypeConverter")
public class AddressTypeConverter implements Converter {

    public Object getAsObject(FacesContext context, UIComponent component, String value) {
        return AddressType.getObject(Integer.parseInt(value));
    }

    public String getAsString(FacesContext context, UIComponent component, Object value) {
        return Integer.toString((int) ((AddressType) value).getValue());
    }

}
