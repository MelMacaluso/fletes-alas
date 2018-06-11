<?php

if ( have_rows( 'sections' ) ) {
	while ( have_rows( 'sections' ) ) {
		the_row();

		$layouts = find_files('sections');

		foreach ( $layouts as $layout ) {
			if ( get_row_layout() == $layout ) {
				get_template_part( "sections/$layout" );
			}
		}
	}
}