/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

package at.irian.webstack.middle.orm;

import com.sun.tools.javac.util.List;

import javax.persistence.*;
import java.io.Serializable;

/**
 * @author Werner Punz (latest modification by $Author$)
 * @version $Revision$ $Date$
 */

@Entity
@Table(name="o_secgroup")
public class SecGroup implements Serializable {
    private static final long serialVersionUID = 1L;



    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    Integer groupType;

    String groupName;

    String description;

    @ManyToMany(fetch = FetchType.LAZY, cascade =   {CascadeType.MERGE, CascadeType.REFRESH})
    List<Security> credentialOwners;

    @Version
    Long version;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        id = id;
    }

    public String getGroupName() {
        return groupName;
    }

    public void setGroupName(String groupName) {
        this.groupName = groupName;
    }

    public Integer getGroupType() {
        return groupType;
    }

    public void setGroupType(Integer groupType) {
        this.groupType = groupType;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

   public List<Security> getCredentialOwners() {
        return credentialOwners;
    }

    public void setCredentialOwners(List<Security> credentialOwners) {
        this.credentialOwners = credentialOwners;
    }

    public Long getVersion() {
        return version;
    }

    public void setVersion(Long version) {
        this.version = version;
    }



    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof SecGroup)) {
            return false;
        }
        SecGroup other = (SecGroup) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "orm.SecGroup[id=" + id + "]";
    }
}
