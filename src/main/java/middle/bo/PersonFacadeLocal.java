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
package middle.bo;

import com.avaje.ebean.PagingList;
import middle.orm.*;
import middle.util.FilterEntry;
import middle.util.OrderEntry;

import java.util.List;

/**
 *
 * @author werpu2
 */
public interface PersonFacadeLocal {

    void cancel(Person pers);

    Person create();

    public Person loadById(Long id);

    public PagingList loadFromTo(int from, int to, List<FilterEntry> filter, List<OrderEntry> orderBy);

    void save(Person person);

    public Address createAdr();

    public void delete(Person person);
}
