package org.extrasapache.myfaces.codi.examples.ebean.view.debug

import javax.inject.Named
import javax.enterprise.context.ApplicationScoped
import org.extrasapache.myfaces.codi.examples.ebean.support.ui.components.progressBar.ProgressModel



/**
 * test case for the progress bar control
 */
@Named
@ApplicationScoped
class ProgressService {
  private[this] var cnt: Int = 0

  def progressModel: ProgressModel = {
    cnt = (cnt + 1) % 100
    return new ProgressModel(cnt)
  }
}