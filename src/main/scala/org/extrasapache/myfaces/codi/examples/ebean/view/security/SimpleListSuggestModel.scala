/*
 * Created by IntelliJ IDEA.
 * User: werpu2
 * Date: 15.02.11
 * Time: 21:28
 */
package org.extrasapache.myfaces.codi.examples.ebean.view.security

import org.extrasapache.myfaces.codi.examples.ebean.support.data.InputSuggestController
import javax.inject.Named
import javax.enterprise.context.Dependent

/**
 * a simple list suggestion model which demonstrates
 * the basic capabilities
 */
@serializable
@Named
@Dependent
class SimpleListSuggestModel extends InputSuggestController[String /*data type for the value*/ , Array[String] /*the list holder*/ ] {
  val initialValues = List[String]("A", "AA", "AAA", "AAAA", "AAAAA")

  def refreshCurrentResults() {
    println(displayValue)
    suggestData = for (item <- initialValues.toArray if item.startsWith(displayValue)) yield item;
    println(suggestData.toString)
  }

  def fromLineToValue() {
    value = initialValues.apply(selectedLine)
  }

}