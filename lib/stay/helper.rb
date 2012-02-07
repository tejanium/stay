module Stay
  module FormHelper   
    def generate_form(object, field, type = :text_field)
      form_for(object, remote: true, format: :json) do |f|
        if type == :tiny_mce || type.is_a?(Array)
          f.send(:text_area, field, class: "stay-input stay-tiny-mce")
        else
          f.send(type, field, class: "stay-input")
        end
      end
    end
  end
  
  ActionView::Helpers::FormHelper.send(:include, FormHelper)
  
  module StayHelpers
    def stay(record, field, opts = {})
      html = "<span class='stay' "
      html << "data-activator='#{ opts[:activator] }' " if opts[:activator]
      html << "data-submitter='#{ opts[:submitter] }' " if opts[:submitter]
      html << "data-tinymce-theme='simple' " if opts[:type] == :tiny_mce
      html << "data-tinymce-theme='#{ opts[:type][1] }' " if opts[:type].is_a?(Array)
      html << ">"
        html << "<span class='stay-object'>"
          html << (record.is_a?(Array) ? record.last : record).send(field).try(:to_html)
        html << "</span>"
        html << "<span class='stay-form' style='display:none'>"
          html << generate_form(record, field, opts[:type])
        html << "</span>"
      html << "</span>"
      html.html_safe
    end
  end
end
