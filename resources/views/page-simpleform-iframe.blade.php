{{--
Template Name: Salus iFrame lomake
--}}

@extends('layouts.app')

@section('content')
  @while(have_posts()) @php(the_post())
  @include('partials.page-header')
  @include('partials.content-simpleform-iframe')
  @include('partials.requirements')
  @include('partials.contact-and-faq')
  @endwhile
@endsection
