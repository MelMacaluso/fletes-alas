<?php

function register_example_post_type() {
	default_register_post_type( 'Example Post Type', 'Example Post Types' );
}

add_action( 'init', 'register_example_post_type' );