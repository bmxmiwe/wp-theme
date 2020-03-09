<!doctype html>
<html @php(language_attributes())>
@include('partials.head')
<body @php(body_class())>

@php(do_action('get_header'))
@yield('base-header')

<div role="document">
    <div class="content">
        @yield('base-content')
    </div>
</div>

@php(do_action('get_footer'))
@yield('base-footer')
@php(wp_footer())

</body>
</html>
