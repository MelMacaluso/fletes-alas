<?php
global $post;

file_exists( get_template_directory() . "/pages/$post->post_name.php" )
	? get_template_part( "pages/$post->post_name" )
	: get_template_part( 'page-default' );