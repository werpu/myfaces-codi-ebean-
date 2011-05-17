package org.extrasapache.myfaces.codi.examples.ebean.support.ui.components.progressBar

/*
 * Created by IntelliJ IDEA.
 * User: werpu2
 * Date: 22.02.11
 * Time: 21:45
 */
;

/**
 * progressModel
 * with two entries a value
 * and a text to display
 */
class ProgressModel(private var valx: Int = 0) {


  def text:String = value + "%"
  def text_$eq(text: String) = {}
  def value: Int = {
    valx = valx + 1
    valx
  }
  def value_$eq(theVal: Int) = {valx = theVal}

}