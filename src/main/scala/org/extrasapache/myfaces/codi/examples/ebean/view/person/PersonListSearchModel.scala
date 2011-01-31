package org.extrasapache.myfaces.codi.examples.ebean.view.person

import javax.inject.Named
import org.apache.myfaces.extensions.cdi.core.api.scope.conversation.ViewAccessScoped
import org.extrasapache.myfaces.codi.examples.ebean.support.ui.BaseSearchModel
import java.io.Serializable

/**
 *
 * @author Werner Punz (latest modification by $Author$)
 * @version $Revision$ $Date$
 */
@Named
@ViewAccessScoped
class PersonListSearchModel extends BaseSearchModel with Serializable
