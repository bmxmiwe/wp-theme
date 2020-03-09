@extends('layouts.app')

@section('content')
  @while(have_posts()) @php(the_post())

  @include('partials.page-header')

  @if(get_field('additional_content'))
    <section class="introduction-small show-for-small-only">
      <div class="row row-wrapper">
        <div class="column">
          <div class="introduction-content">
            {!! get_field('additional_content') !!}
          </div>
        </div>
      </div>
    </section>
  @endif

  <section class="hero">
    <div class="row row-wrapper">
      <div class="medium-6 large-4 column">
        @yield('hero-content')
      </div>
      <div class="medium-6 large-8 column">
        @include('partials.application-form')
      </div>
    </div>
  </section>

  @if(get_field('additional_content'))
    <section class="introduction-medium hide-for-small-only">
      <div class="row row-wrapper">
        <div class="column">
          <div class="introduction-content">
            {!! get_field('additional_content') !!}
          </div>
        </div>
      </div>
    </section>
  @endif

  @yield('sections')

  @endwhile
@endsection
