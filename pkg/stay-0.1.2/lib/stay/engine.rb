module Stay
  class Engine < Rails::Engine
    initializer "setup for rails" do
      ActionView::Base.send(:include, Stay::StayHelpers)
      ActionController::Base.send(:include, Stay::ControllerExtensions)
      String.send(:include, Stay::StringExtensions)
    end
  end
end
