# Compass Configuration

css_dir = 'public/css'
sass_dir = 'public/scss'
output_style = (ENV['NODE_ENV'] == 'production') ? :compressed : :expanded
sass_options = {
  sourcemap: true
}

add_import_path 'vendor/css'

# Plugins:
require 'sassy-buttons'
