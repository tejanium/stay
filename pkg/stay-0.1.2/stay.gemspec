# -*- encoding: utf-8 -*-

Gem::Specification.new do |s|
  s.name = "stay"
  s.version = "0.1.2"

  s.required_rubygems_version = Gem::Requirement.new(">= 1.2") if s.respond_to? :required_rubygems_version=
  s.authors = ["Teja Sophista"]
  s.date = "2012-02-04"
  s.description = "Form ajax helper with tinymce support"
  s.email = "tejanium@yahoo.com"
  s.extra_rdoc_files = ["README.md", "README.rdoc", "lib/assets/javascripts/stay.js", "lib/stay.rb", "lib/stay/controller_extensions.rb", "lib/stay/engine.rb", "lib/stay/helper.rb", "lib/stay/string_extensions.rb"]
  s.files = ["Manifest", "README.md", "README.rdoc", "Rakefile", "lib/assets/javascripts/stay.js", "lib/stay.rb", "lib/stay/controller_extensions.rb", "lib/stay/engine.rb", "lib/stay/helper.rb", "lib/stay/string_extensions.rb", "stay.gemspec"]
  s.homepage = "http://github.com/tejanium/stay"
  s.rdoc_options = ["--line-numbers", "--inline-source", "--title", "Stay", "--main", "README.md"]
  s.require_paths = ["lib"]
  s.rubyforge_project = "stay"
  s.rubygems_version = "1.8.10"
  s.summary = "Helper for building ajax form, inspired by best_in_place, with some modifications, support tinymce as editor"

  if s.respond_to? :specification_version then
    s.specification_version = 3

    if Gem::Version.new(Gem::VERSION) >= Gem::Version.new('1.2.0') then
      s.add_runtime_dependency(%q<jquery-rails>, [">= 0"])
      s.add_runtime_dependency(%q<tinymce-rails>, [">= 0"])
    else
      s.add_dependency(%q<jquery-rails>, [">= 0"])
      s.add_dependency(%q<tinymce-rails>, [">= 0"])
    end
  else
    s.add_dependency(%q<jquery-rails>, [">= 0"])
    s.add_dependency(%q<tinymce-rails>, [">= 0"])
  end
end
