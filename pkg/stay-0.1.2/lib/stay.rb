require "stay/helper"
require "stay/controller_extensions"
require "stay/string_extensions"
require "stay/engine"
require "action_view"

module Stay  
  class ActionView::Base
    include Stay::StayHelpers
  end
end
