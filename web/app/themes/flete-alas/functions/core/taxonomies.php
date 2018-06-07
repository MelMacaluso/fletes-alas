<?php

function deafult_register_taxonomy( $singular_name, $plural_name, $object_type, $args = [], $labels = [] ) {
	$args = array_merge( array(
		'labels'             => default_get_taxonomy_labels( $singular_name, $plural_name, $labels ),
		'publicly_queryable' => false,
		'hierarchical'       => true,
		'show_admin_column'  => true
	), $args );

	register_taxonomy( str_replace( ' ', '_', strtolower( $singular_name ) ), $object_type, $args );
}

function default_get_taxonomy_labels( $singular_name, $plural_name, $override = [] ) {
	return array_merge( array(
		'name'                       => $plural_name,
		'singular_name'              => $singular_name,
		'all_items'                  => "All $plural_name",
		'edit_item'                  => "Edit $singular_name",
		'view_item'                  => "View $singular_name",
		'update_item'                => "Update $singular_name",
		'add_new_item'               => "Add New $singular_name",
		'new_item_name'              => "New $singular_name Name",
		'parent_item'                => "Parent $singular_name",
		'search_items'               => "Search $plural_name",
		'popular_items'              => "Popular $plural_name",
		'separate_items_with_commas' => "Separate " . strtolower( $plural_name ) . " with commas",
		'add_or_remove_items'        => "Add or remove " . strtolower( $plural_name ),
		'choose_from_most_used'      => "Choose from the most used " . strtolower( $plural_name ),
		'not_found'                  => "No $plural_name found.",
	), $override );
}

