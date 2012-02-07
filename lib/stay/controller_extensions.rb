module Stay
  module ControllerExtensions
    def stay_response(obj)
      obj.changed? ? response_error(obj) : response_ok(obj)
    end

    private
      def response_ok(obj)
        field = params[obj.class.to_s.underscore].keys.first
        value = obj.send(field.to_sym)
        render json: { :display => value.try(:to_html), :input => value }, status: :ok
      end

      def response_error(obj)
        field = params[obj.class.to_s.underscore].keys.first
        value = obj.send("#{field}_was".to_sym)
        render json: { :display => value.try(:to_html), :input => value }, status: :unprocessable_entity
      end
  end
end
