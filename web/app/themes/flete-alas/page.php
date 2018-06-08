<?php
global $post;

$pages = findPages('/pages', 'php');

in_array($post->post_name, $pages) ? get_template_part("pages/$post->post_name") : get_template_part('page-default');