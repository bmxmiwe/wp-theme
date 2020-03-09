{{--
  Template Name: Hylkäyssivu
--}}

@extends('layouts.app')

@section('content')
  @while(have_posts()) @php(the_post())
    @include('partials.page-header')
    @include('partials.content-no-form')
    @endwhile
@endsection
