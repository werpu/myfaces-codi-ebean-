/*
 * Created by IntelliJ IDEA.
 * User: werpu2
 * Date: 14.02.11
 * Time: 21:38
 */
package org.extrasapache.myfaces.codi.examples.ebean.support.data

/**
 * a trait which enables our pagination within a print preview
 *
 */
@serializable
trait InputSuggestController[T, V] {

  var displayValue: String = _
  var selectedLine: Int = 0
  var value: T = _

  var suggestData: V = _

  def lineSelect(newLine: Int) {
    selectedLine = newLine
    fromLineToValue
  }

  def refresh(value: String) {
    this.displayValue = value
    refreshCurrentResults()
  }

  def refreshCurrentResults()

  def fromLineToValue()
}