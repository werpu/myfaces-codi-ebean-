package debug

import javax.inject.Named
import org.apache.myfaces.extensions.cdi.core.api.scope.conversation.ViewAccessScoped

/**
 *
 * @author Werner Punz (latest modification by $Author$)
 * @version $Revision$ $Date$
 */
@Named
@ViewAccessScoped
class PatternMatcher(var pattern: String,var value: String)