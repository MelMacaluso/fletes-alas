<footer class="footer absolute pin-x pin-b min-h-8 bg-grey-darker">

    <div class="p-4">

        <div class="flex flex-row">

            <nav class="footer__menu w-1/3">
                <h3>Footer menu 1</h3>
                <?php
                if ( has_nav_menu( 'footer_navigation' ) ) :
                    wp_nav_menu( [ 
                        'theme_location' => 'footer_navigation',
                        'menu_class' => 'flex flex-col list-reset'
                        ] );
                endif;
                ?>
            </nav>
            
            <div class="w-1/3">
            </div>

            <div class="w-1/3">
            </div>

        </div>

    </div>

</footer>
