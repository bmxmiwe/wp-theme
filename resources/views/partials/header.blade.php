<header class="top">
  <div class="row row-wrapper column">
    <a href="{{ home_url('/') }}">
      <img src="{{get_bloginfo('template_directory') . '/assets/images/lv_logot.png'}}"
           class="logo"
           width="250"
           height="39">
    </a>

    @if (wp_get_nav_menu_items('primary_navigation'))
      <a class="toggle-mobile-main-nav" data-toggle="nav-main">
        <i class="fa fa-bars" aria-label="Avaa navigaatio"></i>
      </a>

      <nav id="nav-main" class="main" data-toggler=".open">
        {!! wp_nav_menu(['theme_location' => 'primary_navigation', 'menu_class' => 'nav']) !!}
      </nav>
    @endif

  </div>
</header>
