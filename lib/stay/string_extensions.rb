module Stay
  module StringExtensions
    def to_html
      html = self.gsub("  ", "&nbsp;&nbsp;").gsub("\n", "<br />").gsub("<p>", "").gsub("</p>","")
      html
    end
  end
end
