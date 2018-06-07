<!doctype html>
<html <?php language_attributes(); ?>>

<?php get_template_part( 'templates/head' ); ?>

<body <?php body_class(); ?>>

<?php
do_action( 'get_header' );
get_template_part( 'templates/header', template_base() );
?>

<main class="font-sans">
	<?php include template_path(); ?>
</main>

<?php
do_action( 'get_footer' );
get_template_part( 'templates/footer', template_base() );
wp_footer();
?>

</body>
</html>
