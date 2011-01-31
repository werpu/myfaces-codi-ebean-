package org.extrasapache.myfaces.codi.examples.ebean.support.ui

;

import scala.reflect.BeanProperty;

trait MapDelegate[K, V] extends java.util.Map[K, V] {
  @BeanProperty
  var searchMap: java.util.HashMap[K, V] = new java.util.HashMap[K, V]

  //delegates to fullfill the map criteria
  def size: Int = searchMap.size
  def isEmpty: Boolean = searchMap.isEmpty
  def containsKey(o: Any): Boolean = searchMap.containsKey(o)
  def containsValue(o: Any): Boolean = searchMap.containsValue(o)
  def get(o: Any): V = searchMap.get(o)
  def put(o: K, v: V): V = searchMap.put(o, v)
  def remove(v: Any): V = searchMap.remove(v)
  def putAll(m: java.util.Map[_ <: K, _ <: V]) = searchMap.putAll(m)
  def clear() = searchMap.clear
  def keySet: java.util.Set[K] = searchMap.keySet
  def values: java.util.Collection[V] = searchMap.values
  def entrySet: java.util.Set[java.util.Map.Entry[K, V]] = searchMap.entrySet
}