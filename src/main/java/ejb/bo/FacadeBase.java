/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package ejb.bo;

import com.avaje.ebean.EbeanServer;

/**
 *
 * @author werpu2
 */
public abstract class FacadeBase<T> {

    public FacadeBase() {
    }

    protected abstract EbeanServer getEm();


    public T loadById(Object identifier) {
        return (T) getEm().find(this.getClass().getTypeParameters()[0].getClass(), identifier);
    }


   

}
