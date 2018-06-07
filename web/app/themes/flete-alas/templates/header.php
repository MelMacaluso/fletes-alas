<header>
    <div>
        <a href="<?= esc_url( home_url( '/' ) ); ?>"><?php bloginfo( 'name' ); ?></a>
        <nav>
			<?php
			if ( has_nav_menu( 'primary_navigation' ) ) :
				wp_nav_menu( [ 'theme_location' => 'primary_navigation' ] );
			endif;
			?>
        </nav>
    </div>

    <div></div>
</header>
