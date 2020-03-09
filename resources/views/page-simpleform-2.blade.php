{{--
Template Name: Yksinkertainen lomake 2
--}}

@extends('layouts.app')

@section('base-content')
  <main class="main" style="background-image: url({{$options_acf['background_image']['url']}})">

    @while(have_posts()) @php(the_post())
    <section class="hero simpleform-section">
      <div class="row row-wrapper">
        <div class="medium-12 column">
          @include('partials.application-form')
        </div>
      </div>
    </section>

    @include('partials.section-info')

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

    @include('partials.requirements')
    @include('partials.contact-and-faq')
    @endwhile
  </main>
@endsection

@section('base-footer')
  @include('partials.footer')
@endsection
