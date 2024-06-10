<?php
/**
 * Plugin Name: Literati Example
 * Description: A custom plugin for Literati exercise.
 * Version: 0.1
 * Author: Your Name
 */

if (!defined('ABSPATH')) {
    exit;
}

// Include custom post type and meta box functionality
include_once plugin_dir_path(__FILE__) . 'includes/custom-post-type.php';


function literati_enqueue_frontend_assets() {
    wp_enqueue_script(
        'literati-frontend-script',
        plugins_url('blocks/carousel/build/frontend.js', __FILE__),
        array(),
        null,
        true
    );
    wp_enqueue_style(
        'literati-frontend-styles',
        plugins_url('blocks/carousel/build/promotion-styles.css', __FILE__)
    );
}

// Enqueue block editor assets
function literati_enqueue_block_editor_assets() {
    wp_enqueue_script(
        'literati-block-editor-script',
        plugins_url('blocks/carousel/build/index.js', __FILE__),
        array('wp-blocks', 'wp-element', 'wp-editor', 'wp-components', 'wp-i18n')
    );
}
add_action('enqueue_block_editor_assets', 'literati_enqueue_block_editor_assets');
add_action('wp_enqueue_scripts', 'literati_enqueue_frontend_assets','enqueue_block_editor_assets', 'literati_enqueue_block_assets');

// Fetch and display all promotion posts
function literati_fetch_promotion_posts() {
    $args = array(
        'post_type' => 'promotion',
        'posts_per_page' => -1
    );

    $query = new WP_Query($args);
    
    if ($query->have_posts()) {
        $output = '<ul>';
        while ($query->have_posts()) {
            $query->the_post();
            $output .= '<li><a href="' . get_permalink() . '">' . get_the_title() . '</a></li>';
        }
        $output .= '</ul>';
        wp_reset_postdata();
    } else {
        $output = '<p>No promotion posts found.</p>';
    }

    return $output;
}

// Create shortcode to display promotion posts
function literati_promotion_posts_shortcode() {
    return literati_fetch_promotion_posts();
}
add_shortcode('literati_promotion_posts', 'literati_promotion_posts_shortcode');

// Hook to display promotion posts on the front end via a custom action
function literati_display_promotion_posts() {
    echo literati_fetch_promotion_posts();
}
add_action('wp_footer', 'literati_display_promotion_posts');
?>
