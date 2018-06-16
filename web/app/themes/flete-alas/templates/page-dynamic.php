<?php
/**
 * Template Name: Dynamic sections page
 */
?>
<?php if (have_posts()) : while (have_posts()) : the_post(); ?>
 <?php get_template_part( 'partials/sections' ); ?>
<?php endwhile; endif; ?>