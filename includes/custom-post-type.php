<?php
/*
Plugin Name: My Promotion Plugin
Description: A plugin to manage promotions with custom fields and a carousel block.
Version: 1.0
Author: Your Name
*/

// Register Custom Post Type
function literati_register_promotion_post_type() {
    $labels = array(
        'name' => 'Promotions',
        'singular_name' => 'Promotion',
        'menu_name' => 'Promotions',
        'name_admin_bar' => 'Promotion',
        'add_new' => 'Add New',
        'add_new_item' => 'Add New Promotion',
        'new_item' => 'New Promotion',
        'edit_item' => 'Edit Promotion',
        'view_item' => 'View Promotion',
        'all_items' => 'All Promotions',
        'search_items' => 'Search Promotions',
        'parent_item_colon' => 'Parent Promotions:',
        'not_found' => 'No promotions found.',
        'not_found_in_trash' => 'No promotions found in Trash.'
    );

    $args = array(
        'labels' => $labels,
        'public' => true,
        'publicly_queryable' => true,
        'show_ui' => true,
        'show_in_menu' => true,
        'query_var' => true,
        'rewrite' => array('slug' => 'promotion'),
        'capability_type' => 'post',
        'has_archive' => true,
        'hierarchical' => false,
        'menu_position' => null,
        'supports' => array('title', 'editor', 'thumbnail'),
        'register_meta_box_cb' => 'literati_add_promotion_metaboxes',
    );

    register_post_type('promotion', $args);
}
add_action('init', 'literati_register_promotion_post_type');

// Add meta boxes
function literati_add_promotion_metaboxes() {
    add_meta_box('literati_promotion_header', 'Promotion Header', 'literati_promotion_header', 'promotion', 'normal', 'default');
    add_meta_box('literati_promotion_text', 'Promotion Text', 'literati_promotion_text', 'promotion', 'normal', 'default');
    add_meta_box('literati_promotion_button', 'Promotion Button', 'literati_promotion_button', 'promotion', 'normal', 'default');
    add_meta_box('literati_promotion_image', 'Promotion Image', 'literati_promotion_image', 'promotion', 'normal', 'default');
}

function literati_promotion_header() {
    global $post;
    $header = get_post_meta($post->ID, 'promotion_header', true);
    echo '<input type="text" name="promotion_header" value="' . esc_textarea($header)  . '" class="widefat">';
}

function literati_promotion_text() {
    global $post;
    $text = get_post_meta($post->ID, 'promotion_text', true);
    echo '<textarea name="promotion_text" class="widefat">' . esc_textarea($text)  . '</textarea>';
}

function literati_promotion_button() {
    global $post;
    $button = get_post_meta($post->ID, 'promotion_button', true);
    echo '<input type="text" name="promotion_button" value="' . esc_textarea($button)  . '" class="widefat">';
}

function literati_promotion_image() {
    global $post;
    $image = get_post_meta($post->ID, 'promotion_image', true);
    echo '<input type="text" name="promotion_image" value="' . esc_textarea($image)  . '" class="widefat">';
}

function literati_save_promotion_meta($post_id, $post) {
    if ($post->post_type == 'promotion') {
        if (isset($_POST['promotion_header'])) {
            update_post_meta($post_id, 'promotion_header', sanitize_text_field($_POST['promotion_header']));
        }
        if (isset($_POST['promotion_text'])) {
            update_post_meta($post_id, 'promotion_text', sanitize_textarea_field($_POST['promotion_text']));
        }
        if (isset($_POST['promotion_button'])) {
            update_post_meta($post_id, 'promotion_button', sanitize_text_field($_POST['promotion_button']));
        }
        if (isset($_POST['promotion_image'])) {
            update_post_meta($post_id, 'promotion_image', sanitize_text_field($_POST['promotion_image']));
        }
    }
}
add_action('save_post', 'literati_save_promotion_meta', 1, 2);






// Add the template code to display the featured image and other meta data in the custom post type template
function literati_display_promotion_content($content) {
    if (is_singular('promotion') && in_the_loop() && is_main_query()) {
        global $post;
        $header = get_post_meta($post->ID, 'promotion_header', true);
        $text = get_post_meta($post->ID, 'promotion_text', true);
        $button = get_post_meta($post->ID, 'promotion_button', true);
        $image = get_post_meta($post->ID, 'promotion_image', true);

        $custom_content = '';

        if (has_post_thumbnail()) {
            $custom_content .= '<div class="promotion-featured-image">' . get_the_post_thumbnail($post->ID, 'full') . '</div>';
        }

        if ($image) {
            $custom_content .= '<div class="promotion-custom-image"><img style="width:500px" src="' . esc_url($image) . '" alt="' . esc_attr($header) . '"></div>';
        }

        if ($header) {
            $custom_content .= '<h2 class="promotion-header">' . esc_html($header) . '</h2>';
        }

        if ($text) {
            $custom_content .= '<div class="promotion-text">' . wpautop(esc_html($text)) . '</div>';
        }

        if ($button) {
            $custom_content .= '<div class="promotion-button"><a href="' . esc_url($button) . '" ><input type="button" class="button" value="View"></a></div>';
        }

        $custom_content .= '<div class="promotion-full-content">' . $content . '</div>';

        return $custom_content;
    }

    return $content;
}

add_filter('the_content', 'literati_display_promotion_content');


?>