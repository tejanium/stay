module Stay
  module StringExtensions
    def to_html
      html = self.gsub("  ", "&nbsp;&nbsp;").gsub("\n", "<br />")
      html
    end
  end
end
