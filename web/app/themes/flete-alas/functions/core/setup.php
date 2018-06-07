<?php

function setup() {
	register_nav_menus( [
		'primary_navigation' => 'Primary Navigation'
	] );
}

add_action( 'after_setup_theme', 'setup' );

function assets() {
	wp_enqueue_style( 'css', asset_path( 'public/css/main.css' ) );
	wp_enqueue_script( 'js', asset_path( 'public/js/main.js' ), [], false, true );
}

add_action( 'wp_enqueue_scripts', 'assets', 100 );

function asset_path( $asset ) {
	return get_template_directory_uri() . '/' . $asset;
}
