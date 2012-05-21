require 'rubygems'
require 'rake'
require 'echoe'

Echoe.new('stay', '0.1.4.3') do |p|
  p.description     = "Form ajax helper with tinymce support"
  p.summary         = "Helper for building ajax form, inspired by best_in_place, with some modifications, support tinymce as editor"
  p.url             = "http://github.com/tejanium/stay"
  p.author          = "Teja Sophista"
  p.email           = "tejanium@yahoo.com"
  p.ignore_pattern  = ["tmp/*", "script/*"]
  p.runtime_dependencies = ["jquery-rails", "tinymce-rails"]
end

Dir["#{File.dirname(__FILE__)}/tasks/*.rake"].sort.each { |ext| load ext }
