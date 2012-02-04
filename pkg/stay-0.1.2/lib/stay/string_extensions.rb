module Stay
  module StringExtensions
    def to_html
      html = "<p>"
      html << self.gsub(" ", "&nbsp;").gsub("\n", "<br />").gsub("<p>", "").gsub("</p>","")
      html << "</p>"
      html
    end
  end
end
