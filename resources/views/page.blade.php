@extends('layouts.page')

@section('hero-content')
  <div class="steps">
    <h1>{!! the_title() !!}</h1>
    <div class="content">
      {!! the_content() !!}
    </div>
  </div>
@endsection

@section('sections')
  @include('partials.requirements')
  @include('partials.contact-and-faq')
@endsection
