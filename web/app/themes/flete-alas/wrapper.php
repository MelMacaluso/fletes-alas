<!doctype html>
<html <?php language_attributes(); ?>>

<?php get_template_part( 'partials/layout/head' ); ?>

<body <?php body_class(); ?>>

<?php
do_action( 'get_header' );
get_template_part( 'partials/layout/header' );
?>

<main class="h-screen-80 font-sans" id="MainApp">
	<?php include template_path(); ?>
</main>

<?php
do_action( 'get_footer' );
get_template_part( 'partials/layout/footer' );
wp_footer();
?>

</body>
</html>
