package org.extrasapache.myfaces.codi.examples.ebean.view.debug

/*
 * Created by IntelliJ IDEA.
 * User: werpu2
 * Date: 18.02.11
 * Time: 21:33
 */
import javax.inject.Named
import javax.faces.bean.RequestScoped
import org.apache.myfaces.extensions.cdi.jsf.api.config.view.Page
import org.apache.myfaces.extensions.cdi.core.api.config.view.ViewConfig

@serializable
@Named
@RequestScoped
@Page
class TestPage extends ViewConfig {
  val hello = "Hello world"
}

