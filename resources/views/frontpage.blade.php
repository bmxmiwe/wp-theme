{{--
  Template Name: Etusivu
--}}

@extends('layouts.page')

@section('hero-content')
  <div class="steps">
    <h1>Lainaa arjen hankintoihin 500 – 50 000€ ilman vakuuksia</h1>
    <div class="step">
      <div class="heading">{{$options_acf['step_1']}}</div>
      <div class="image-container">
        <img src="{{get_bloginfo('template_directory')}}/assets/images/step-1.png"
             width="176"
             height="57">
      </div>
    </div>
    <div class="step">
      <div class="heading">{{$options_acf['step_2']}}</div>
      <div class="image-container">
        <img src="{{get_bloginfo('template_directory')}}/assets/images/step-2.png"
             width="176"
             height="50">
      </div>
    </div>
    <div class="step">
      <div class="heading">{{$options_acf['step_3']}}</div>
      <div class="image-container">
        <img src="{{get_bloginfo('template_directory')}}/assets/images/step-3.png"
             width="181"
             height="53">
      </div>
    </div>
  </div>
@endsection

@section('sections')
  @include('partials.section-info');

  <section class="editor-content">
    <div class="row">
      <div class="column">
        {{ the_content() }}
      </div>
    </div>
  </section>

  @include('partials.requirements')
  @include('partials.contact-and-faq')
@endsection
