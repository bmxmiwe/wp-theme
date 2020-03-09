<?php

namespace App;

use Sober\Controller\Controller;

class App extends Controller
{
  public function siteName()
  {
    return get_bloginfo('name');
  }

  public function footer_acf()
  {
    return array(
      'heading' => get_field('footer_heading', 'options'),
      'fields' => get_field('footer_fields', 'options')
    );
  }

  public function application_form_acf()
  {
    return array(
      'apr' => get_field('application_form_apr', 'options'),
      'image_url' => get_field('application_form_image', 'options'),
      'terms_link' => get_field('application_form_terms_link', 'options'),
      'consent_to_disclosure_link' => get_field('application_form_consent_to_disclosure_link', 'options'),
      'rejected_link' => get_field('application_form_rejected_link', 'options'),
      'error_link' => get_field('application_form_error_link', 'options'),
    );
  }

  public function application_form_text_encoded()
  {
    $heading_page = get_field('page_application_form_heading');
    $heading_global = get_field('application_form_heading', 'options');

    $lead_page = get_field('page_application_form_lead');
    $lead_global = get_field('application_form_lead', 'options');

    $button_open = get_field('application_form_submit_text_open', 'options');
    $button_send = get_field('application_form_submit_text_send', 'options');

    $text_fields = [
      'heading' => $heading_page ? $heading_page : $heading_global,
      'lead' => $lead_page ? $lead_page : $lead_global,
      'button_open' => $button_open ? $button_open : 'Näytä hakemus',
      'button_send' => $button_send ? $button_send : 'Lähetä hakemus',
    ];
    return htmlspecialchars(json_encode($text_fields), ENT_QUOTES, 'UTF-8');
  }

  public static function url_param($name)
  {
    $param = isset($_GET[$name]) ? $_GET[$name] : '';

    return $param;
  }

  /**
   * Return ACF-fields
   *
   * @return array
   */
  public function options_acf()
  {
    // These are not actually just some "general acf options" anymore. More like
    // "page fields that also have a fallback value in acf options".

    $field_names = [
      'background_image',
      'steps_heading',
      'step_1',
      'step_2',
      'step_3',
      'info_heading',
      'info_fields',
      'requirements_heading',
      'requirements_text',
      'requirements_fields',
      'faq_heading',
      'faq_fields',
    ];

    $options_acf = [];
    foreach ($field_names as $field_name) {
      $value = null;
      if (is_page()) {
        global $post;
        $value = get_field($field_name, $post->ID);
      }

      // fall back to options value if value was falsy
      $value = $value ? $value : get_field($field_name, 'options');

      $options_acf[$field_name] = $value;
    }

    return $options_acf;
  }
}
