<?php

function default_register_post_type( $singular_name, $plural_name, $args = [], $labels = [] ) {
	$args = array_merge( array(
		'labels'   => default_get_post_type_labels( $singular_name, $plural_name, $labels ),
		'public'   => true,
		'supports' => array( 'title', 'custom-fields' ),
	), $args );

	add_action( 'init', function() use ( $singular_name, $args ) {
		register_post_type( str_replace( ' ', '_', strtolower( $singular_name ) ), $args );
	} );
}

function default_get_post_type_labels( $singular_name, $plural_name, $override = [] ) {
	return array_merge( array(
		'name'                  => $plural_name,
		'singular_name'         => $singular_name,
		'add_new'               => "Add $singular_name",
		'add_new_item'          => "Add New $singular_name",
		'edit_item'             => "Edit $singular_name",
		'new_item'              => "New $singular_name",
		'view_item'             => "View $singular_name",
		'view_items'            => "View $plural_name",
		'search_items'          => "Search $plural_name",
		'not_found'             => "No $plural_name found.",
		'not_found_in_trash'    => "No $plural_name found in Trash.",
		'parent_item_colon'     => "Parent $singular_name:",
		'all_items'             => "All $plural_name",
		'archives'              => "$singular_name Archives",
		'attributes'            => "$singular_name Attributes",
		'insert_into_item'      => "Insert into " . strtolower( $singular_name ),
		'uploaded_to_this_item' => "Uploaded to this " . strtolower( $singular_name ),
	), $override );
}