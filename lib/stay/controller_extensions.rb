module Stay
  module ControllerExtensions
    def stay_response(obj)
      obj.changed? ? response_error(obj) : response_ok(obj)
    end

    private
      def response_ok(obj)
        field = params[obj.class.to_s.underscore].keys.first
        value = ActionController::Base.helpers.sanitize(obj.send(field.to_sym), tags: %w(p strong em span ul li ol br))
        render json: { :display => (value.nil? ? "-" : value.to_html), :input => value }, status: :ok
      end

      def response_error(obj)
        field = params[obj.class.to_s.underscore].keys.first
        value = ActionController::Base.helpers.sanitize(obj.send("#{field}_was".to_sym), tags: %w(p strong em span ul li ol br))
        render json: { :display => (value.nil? ? "-" : value.to_html), :input => value, :errors => obj.errors }, status: :unprocessable_entity
      end
  end
end
