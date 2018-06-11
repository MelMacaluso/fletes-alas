<?php

// Output all the file names of a certain extension in a certain directory
function find_files( $directory, $file_extension = 'php' ) {
	$file_paths = glob( get_template_directory() . "/$directory/*.$file_extension" );

	return array_map( function( $file_path ) use ( $file_extension ) {
		return basename( $file_path, ".$file_extension" );
	}, $file_paths );
}