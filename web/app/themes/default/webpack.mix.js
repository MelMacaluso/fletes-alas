let mix = require('laravel-mix');
require('tailwindcss');
require('laravel-mix-tailwind');

mix.js('assets/js/main.js', 'public/js')
    .sass('assets/scss/main.scss', 'public/css')
    .tailwind();
