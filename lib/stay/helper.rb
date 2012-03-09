module Stay
  module FormHelper   
    def generate_form(object, field, type = :text_field)
      form_for(object, remote: true, format: :json) do |f|
        if type == :tiny_mce || type.is_a?(Array)
          if type == :tiny_mce
            w = "100%"
            h = "200px"
          else
            w = type[2] || "100%"
            h = type[3] || "200px"
          end
          object_id = (object.is_a?(Array) ? object.last : object).id
          f.send(:text_area, field, class: "stay-input stay-tiny-mce", id: "stay-mce-#{ object_id }", style: "width:#{w}; height:#{h};")
        else
          f.send(type, field, class: "stay-input")
        end
      end
    end
  end
  
  ActionView::Helpers::FormHelper.send(:include, FormHelper)
  
  module StayHelpers
    def stay(record, field, opts = {})      
      raise ArgumentError, "Can't have Canceller without Submitter" if opts[:canceller] && opts[:submitter].nil?
      opts[:type] ||= :text_field
      html = "<span class='stay' "
      html << "data-activator='#{ opts[:activator] }' " if opts[:activator]
      html << "data-submitter='#{ opts[:submitter] }' " if opts[:submitter]
      html << "data-canceller='#{ opts[:canceller] }' " if opts[:canceller]
      html << "data-tinymce-theme='simple' " if opts[:type] == :tiny_mce
      html << "data-tinymce-theme='#{ opts[:type][1] }' " if opts[:type].is_a?(Array)
      html << ">"
        html << "<span class='stay-object'>"
          val = (record.is_a?(Array) ? record.last : record).send(field)
          if val.nil?
            html << "-"
          else        
            html << val.to_html
          end
        html << "</span>"
        html << "<span class='stay-form' style='display:none'>"
          html << generate_form(record, field, opts[:type])
        html << "</span>"
      html << "</span>"
      html.html_safe
    end
  end
end
