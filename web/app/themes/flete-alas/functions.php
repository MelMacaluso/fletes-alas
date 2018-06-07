<?php

require_all_files( get_template_directory() . '/functions' );

function require_all_files( $directory ) {
	require_array( glob( "$directory/*.php" ) );

	foreach ( glob( "$directory/*", GLOB_ONLYDIR ) as $subdirectory ) {
		require_all_files( $subdirectory );
	}
}

function require_array( $files ) {
	foreach ( $files as $file ) {
		require_once( $file );
	}
}

