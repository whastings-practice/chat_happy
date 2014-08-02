# Compass Configuration

css_dir = 'public/css'
sass_dir = 'public/scss'
output_style = :expanded
sass_options = {
  sourcemap: true
}

add_import_path 'vendor/css'

# Plugins:
require 'sassy-buttons'
