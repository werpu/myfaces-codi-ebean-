/*
 * Created by IntelliJ IDEA.
 * User: werpu2
 * Date: 14.02.11
 * Time: 22:35
 */
package org.extrasapache.myfaces.codi.examples.ebean.view.security

import org.extrasapache.myfaces.codi.examples.ebean.orm.person.Person
import javax.enterprise.context.Dependent
import javax.inject.{Inject, Named}
import org.extrasapache.myfaces.codi.examples.ebean.business.bo.person.PersonFacade
import org.extrasapache.myfaces.codi.examples.ebean.business.util.OrderEntry

import collection.mutable._
import collection.JavaConversions._
import org.extrasapache.myfaces.codi.examples.ebean.support.data.{PaginationController, InputSuggestController}

@Named
@Dependent
class UserInputSuggestModel extends InputSuggestController[Person /*data type for the value*/, PaginationController[Person] /*the list holder*/] {

  @Inject
  var personBo: PersonFacade = _

  def refreshCurrentResults() {
    //TODO refresh our currentmodel with the person facades
    //model
    val res = displayValue.split("\\s+")
    if(res.length == 1) {
      val oldSuggestData = suggestData
      val order = new ArrayBuffer[OrderEntry]()
      order += new OrderEntry("lastName", false)
      order += new OrderEntry("firstName", false)
      suggestData = personBo.loadFromToName(0, suggestData.getPageSize,res.head, order)
    } else {
       //do something else
    }
  }

  def fromLineToValue() {
    value = suggestData.getAsList.get(selectedLine)
    displayValue = value.firstName + " " + value.lastName
  }

}