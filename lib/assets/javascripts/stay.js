jQuery.fn.stay = function(){
  this.each(function(){
    new Stay(this);
  });
}

jQuery.fn.disable = function(){
  this.attr("disabled", "")
}

jQuery.fn.enable = function(){
  this.removeAttr("disabled")
}

function Stay(e){
  this.init(e);
}

Stay.prototype = {
  init: function(e){
    var self = this;
    
    self.stayWrapper    = jQuery(e);
    self.stayObject     = self.stayWrapper.find(".stay-object");
    self.stayForm       = self.stayWrapper.find(".stay-form");
    self.stayFormForm   = self.stayForm.find("form");
    self.stayTinyMCE    = self.stayForm.find(".stay-input.stay-tiny-mce")
    self.tinyMCEUsed    = self.stayTinyMCE.length > 0;
    self.stayFormInput  = self.stayFormForm.find(".stay-input");
    
    self.tinyMCETheme   = self.stayWrapper.data("tinymce-theme") || "simple"
        
    self.activator_id   = self.stayWrapper.data("activator")
    self.activator      = (typeof self.activator_id === "undefined") ? self.stayObject : jQuery(self.activator_id)

    self.submitter_id   = this.stayWrapper.data("submitter")
    self.submitter      = (typeof self.submitter_id === "undefined") ? self.stayFormInput : jQuery(self.submitter_id)

    self.canceller_id   = this.stayWrapper.data("canceller")

    if(typeof self.submitter_id !== "undefined"){jQuery(self.submitter_id).hide()}
    if(typeof self.canceller_id !== "undefined"){jQuery(self.canceller_id).hide()}

    if(self.tinyMCEUsed){
      this.stayTinyMCE.tinymce({
        theme: self.tinyMCETheme,
        setup : function(ed) {
                ed.onInit.add(function(ed, evt) {
                  var dom = ed.dom;
                  var doc = tinymce.isGecko ? ed.getDoc() : ed.getWin();
                  if(typeof self.submitter_id === "undefined"){
                    tinymce.dom.Event.add(doc, 'blur', function(e) {
                      self.stayFormForm.submit();
                    });
                  }else{
                    self.submitter.click(function(){
                      self.stayFormForm.submit();
                    });
                  }
                 if(typeof self.canceller_id === "undefined"){
                    tinymce.dom.Event.add(doc, 'keydown', function(e) {
                        if (e.keyCode == 27) {
                            self.reShowObject();
                        }
                    });      
                  }else{
                    jQuery(self.canceller_id).click(function(){
                      self.reShowObject();
                    });
                  }
                });
              }
      });
    }
    self.bindTrigger();
    self.bindCallback();

  },
  
  bindTrigger: function(){
    var self = this;
    
    self.activator.click(function(){
      self.stayObject.hide();
      self.stayForm.show();
      if(typeof self.submitter_id !== "undefined"){jQuery(self.submitter_id).show()}
      if(typeof self.canceller_id !== "undefined"){jQuery(self.canceller_id).show()}
      if(self.tinyMCEUsed){
        self.stayTinyMCE.tinymce().focus();
      }else{
        self.stayFormInput.focus();
      }
    });
    
    if(!self.tinyMCEUsed){
      var ev = (typeof self.submitter_id === "undefined") ? "blur" : "click"
      self.submitter.bind(ev, function(){
        self.stayFormForm.submit();
        self.stayFormInput.disable();
      });
      
      if(typeof self.canceller_id === "undefined"){
        self.stayFormInput.keydown(function(e) {
            if (e.keyCode == 27) {
                self.reShowObject();
            }
        });      
      }else{
        jQuery(self.canceller_id).click(function(){
          self.reShowObject();
        });
      }
    }
  },
  
  bindCallback: function(){
    var self = this;
    
    self.stayFormForm.live("ajax:success", function(event, data, status, xhr){
      self.stayFormInput.val(data.input);
      self.stayObject.html(data.display);
      self.reShowObject();
    });

    self.stayFormForm.live("ajax:error", function(event, data, status, xhr){
      var cb = jQuery.parseJSON(data.responseText);
      self.stayFormInput.val(cb.input || "");
      self.stayObject.html(cb.display || "");
      self.reShowObject();
    });
  },
  
  reShowObject: function(){
    this.stayForm.hide();
    if(typeof this.submitter_id !== "undefined"){jQuery(this.submitter_id).hide()}
    if(typeof this.canceller_id !== "undefined"){jQuery(this.canceller_id).hide()}
    this.stayObject.show();
    this.stayFormInput.enable();
  }
};
