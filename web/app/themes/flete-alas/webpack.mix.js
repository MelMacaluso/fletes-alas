let mix = require('laravel-mix');
require('tailwindcss');
require('laravel-mix-tailwind');
require('dotenv').config({path: '../../../../.env'});

mix.js('assets/js/main.js', 'public/js/main.js')
    .sass('assets/scss/main.scss', 'public/css')
    .tailwind()
    .copy('assets/fonts', 'public/fonts')
    .copy('assets/img', 'public/img')
    .browserSync({
        proxy: process.env.MIX_WP_HOME,
        https: false,
        files: [{
            match: ['**/*.php', 'assets/**/*.js', 'assets/**/*.css', 'public/css/*.css'],
        }]
    })