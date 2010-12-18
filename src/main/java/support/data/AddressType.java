/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package support.data;

/**
 *
 * @author werpu2
 */
public enum AddressType {

    PRIVATE(0, "PRIVATE"),
    COMPANY(1, "COMPANY"),
    PRIVATE_SECONDARY(2, "PRIVATE_SECONDARY"),
    COMPANY_SECONDARY(3, "COMPANY_SECONDARY");
    
    int value = 0;
    String key;

    AddressType(int adrType, String key) {
        value = adrType;
    }

    public int getValue() {
        return value;
    }

    public String getKey() {
        return key;
    }

    static public AddressType getObject(int value) {
        switch (value) {
            case 0:
                return PRIVATE;
            case 1:
                return COMPANY;
            case 2:
                return PRIVATE_SECONDARY;
            case 3:
                return COMPANY_SECONDARY;
        }
        throw new IndexOutOfBoundsException("value does not represent a proper address type");
    }
}
