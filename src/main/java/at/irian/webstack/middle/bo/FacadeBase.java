/* Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License
 */

package at.irian.webstack.middle.bo;

import at.irian.webstack.support.cdi.util.Name;
import com.avaje.ebean.EbeanServer;

import javax.inject.Inject;
import javax.persistence.PersistenceContext;

/**
 * @author werpu2
 */
public abstract class FacadeBase<T> {

    /**
     * not we have added
     * a serializable proxy to the ebean
     * server, so that in the passivation
     * activation case the server
     * can be dropped and restored
     * due to being non serializabe in its
     * implementation
     */
    @Inject
    EbeanServer em;

    public FacadeBase() {
    }

    public T loadById(Object identifier) {
        return (T) em.find(this.getClass().getTypeParameters()[0].getClass(), identifier);
    }

}
