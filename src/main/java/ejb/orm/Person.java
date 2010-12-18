/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package ejb.orm;

import java.io.Serializable;
import java.util.LinkedList;
import java.util.List;
import java.util.Set;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.OrderBy;
import javax.persistence.Version;

/**
 *
 * @author werpu2
 */
@NamedQueries({
    @NamedQuery(name="person_all", query="select entity from Person entity"),
    @NamedQuery(name="person_count", query="select count(entity) from Person entity")
  
})
@Entity
public class Person implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    String firstName;
    
    String lastName;

    String nickName;


    @Version
    Long version;

    @OneToMany
    Set<Entry> infoEntries;


    @OneToMany(cascade=CascadeType.ALL)
    @OrderBy(value="addressType asc")
    List<Address> addresses = new LinkedList<Address>();


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getNickName() {
        return nickName;
    }

    public void setNickName(String nickName) {
        this.nickName = nickName;
    }

    public Long getVersion() {
        return version;
    }

    public void setVersion(Long version) {
        this.version = version;
    }

    public List<Address> getAddresses() {
        return addresses;
    }

    public void setAddresses(List<Address> addresses) {
        this.addresses = addresses;
    }

    public Set<Entry> getInfoEntries() {
        return infoEntries;
    }

    public void setInfoEntries(Set<Entry> infoEntries) {
        this.infoEntries = infoEntries;
    }

  

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (id != null ? id.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Person)) {
            return false;
        }
        Person other = (Person) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "orm.Person[id=" + id + "]";
    }

}
