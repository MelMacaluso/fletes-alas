<header class="header bg-blue-darker shadow-lg">

    <div class="flex flex-row p-4 justify-between md:justify-start">
    
        <div class="header__brand">
            <a href="<?= esc_url( home_url( '/' ) ); ?>" class="text-white text-2xl visited:text-white"><?php bloginfo( 'name' ); ?></a>
        </div>
        <nav class="header__menu">
			<?php
			if ( has_nav_menu( 'primary_navigation' ) ) :
                wp_nav_menu( [ 
                    'theme_location' => 'primary_navigation'
                 ] );
			endif;
			?>
        </nav>
        <div class="header__burger">
            <a href="#" id="burgerToggle">Menu</a>
        </div>

    </div>

</header>
