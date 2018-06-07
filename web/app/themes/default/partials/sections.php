<?php

if (have_rows('sections')) {
    while (have_rows('sections')) {
        the_row();
        $layouts = [];

        foreach ($layouts as $layout) {
            if (get_row_layout() == $layout) {
                include("sections/$layout.php");
            }
        }
    }
}