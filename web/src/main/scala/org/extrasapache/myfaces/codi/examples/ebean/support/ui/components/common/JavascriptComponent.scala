package org.extrasapache.myfaces.codi.examples.ebean.support.ui.components.common

import javax.faces.context.FacesContext
import java.util.Locale
import java.io.Serializable
import javax.faces.component.StateHelper

/**
 *
 * @author Werner Punz (latest modification by $Author$)
 * @version $Revision$ $Date$
 *
 * a special trait which adds several helper functions to a composite component
 */

object JavascriptComponent {
    var JAVASCRIPT_VAR = "javascriptVar"
}

trait JavascriptComponent extends AttributeHandler {

    import JavascriptComponent._

    def javascriptVar_$eq(theJSVar: String) {}

    /**
     * returns a unique name for the jsVar
     */
    def javascriptVar: String = {
        val default = this.getClientId(FacesContext.getCurrentInstance).replaceAll(":", "_")
        getAttr[String](JAVASCRIPT_VAR, default)
    }

    def getClientId(context: FacesContext): String

    def getLocale: Locale = FacesContext.getCurrentInstance.getViewRoot.getLocale
}