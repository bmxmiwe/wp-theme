@extends('layouts.base')

@section('base-header')
  @include('partials.header')
@endsection

@section('base-content')
  <main class="main"
        style="background-image: url({{$options_acf['background_image']['url']}})">
    @yield('content')
  </main>
  @if (App\display_sidebar())
    <aside class="sidebar">
      @include('partials.sidebar')
    </aside>
  @endif
@endsection

@section('base-footer')
  @include('partials.footer')
@endsection
