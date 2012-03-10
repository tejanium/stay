var Stay, isset;
jQuery.fn.stay = function(args) {
  return this.each(function() {
    return new Stay(this, args);
  });
};
jQuery.fn.disable = function() {
  return this.attr("disabled", "disabled");
};
jQuery.fn.enable = function() {
  return this.removeAttr("disabled");
};
isset = function(o) {
  return typeof o !== "undefined";
};
Stay = (function() {
  function Stay(e, args) {
    var activator, canceller, submitter;
    this.hooks = args || {};
    this.stayWrapper = jQuery(e);
    this.stayObjectContainer = this.stayWrapper.find(".stay-object");
    this.stayFormContainer = this.stayWrapper.find(".stay-form");
    this.stayActualForm = this.stayFormContainer.find("form");
    this.stayFormInput = this.stayActualForm.find(".stay-input");
    this.usingTinyMCE = this.stayFormInput.hasClass("stay-tiny-mce");
    activator = this.stayWrapper.data("activator");
    this.usingActivator = isset(activator);
    this.activator = (this.usingActivator ? jQuery(activator) : this.stayObjectContainer);
    submitter = this.stayWrapper.data("submitter");
    if (this.usingSubmitter = isset(submitter)) {
      this.submitter = jQuery(submitter);
      this.submitter.hide();
    } else {
      this.submitter = this.stayFormInput;
    }
    canceller = this.stayWrapper.data("canceller");
    if (this.usingCanceller = isset(canceller)) {
      this.canceller = jQuery(canceller);
      this.canceller.hide();
    }
    this.bindActivator();
    if (this.usingTinyMCE) {
      this.initTinyMCE();
    } else {
      this.initDefault();
    }
    this.bindCallback();
  }
  Stay.prototype.initTinyMCE = function() {
    var stay;
    stay = this;
    return stay.stayFormInput.tinymce({
      theme: stay.stayWrapper.data("tinymce-theme") || "simple",
      setup: function(ed) {
        return ed.onInit.add(function(ed, ev) {
          var doc;
          doc = (tinymce.isGecko ? ed.getDoc() : ed.getWin());
          stay.bindSubmitter(doc);
          return stay.bindCanceller(doc);
        });
      }
    });
  };
  Stay.prototype.initDefault = function() {
    this.bindSubmitter();
    return this.bindCanceller();
  };
  Stay.prototype.bindActivator = function() {
    var stay;
    stay = this;
    return stay.activator.click(function() {
      stay.hideObject();
      if (stay.usingTinyMCE) {
        return stay.stayFormInput.tinymce().focus();
      } else {
        return stay.stayFormInput.focus();
      }
    });
  };
  Stay.prototype.bindSubmitter = function(doc) {
    var stay;
    stay = this;
    if (stay.usingSubmitter) {
      return stay.submitter.click(function() {
        return stay.submitEvent();
      });
    } else {
      if (isset(doc)) {
        return tinymce.dom.Event.add(doc, "blur", function(e) {
          return stay.submitEvent();
        });
      } else {
        return stay.submitter.blur(function() {
          return stay.submitEvent();
        });
      }
    }
  };
  Stay.prototype.bindCanceller = function(doc) {
    var stay;
    stay = this;
    if (stay.usingCanceller) {
      return stay.canceller.click(function() {
        return stay.showObject();
      });
    } else {
      if (isset(doc)) {
        return tinymce.dom.Event.add(doc, "keydown", function(e) {
          return stay.cancelEvent(e);
        });
      } else {
        return stay.stayFormInput.keydown(function(e) {
          return stay.cancelEvent(e);
        });
      }
    }
  };
  Stay.prototype.bindCallback = function() {
    var stay;
    stay = this;
    stay.stayActualForm.bind("ajax:success", function(e, data) {
      stay.processCallback(data);
      if (isset(stay.hooks.onSuccess)) {
        return stay.hooks.onSuccess();
      }
    });
    return stay.stayActualForm.bind("ajax:error", function(e, data) {
      var cb;
      cb = jQuery.parseJSON(data.responseText);
      stay.processCallback(cb);
      if (isset(stay.hooks.onError)) {
        return stay.hooks.onError(cb.errors);
      }
    });
  };
  Stay.prototype.processCallback = function(cb) {
    this.stayFormInput.val(cb.input || "");
    this.stayObjectContainer.html(cb.display || "");
    return this.showObject();
  };
  Stay.prototype.hideObject = function() {
    this.stayFormContainer.show();
    if (this.usingSubmitter) {
      this.submitter.show();
    }
    if (this.usingCanceller) {
      this.canceller.show();
    }
    return this.stayObjectContainer.hide();
  };
  Stay.prototype.showObject = function() {
    this.stayFormContainer.hide();
    if (this.usingSubmitter) {
      this.submitter.hide();
    }
    if (this.usingCanceller) {
      this.canceller.hide();
    }
    this.stayObjectContainer.show();
    return this.stayFormInput.enable();
  };
  Stay.prototype.cancelEvent = function(e) {
    if (e.keyCode === 27) {
      return this.showObject();
    }
  };
  Stay.prototype.submitEvent = function(e) {
    if (isset(this.hooks.beforeSend)) {
      this.hooks.beforeSend();
    }
    this.stayActualForm.submit();
    return this.stayFormInput.disable();
  };
  return Stay;
})();