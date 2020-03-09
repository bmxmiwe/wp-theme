@extends('layouts.base')

@section('base-header')
    @include('partials.header')
@endsection

@section('base-content')
    <div class="row">
    <main class="blog-content main columns medium-8">
        @yield('content')
    </main>
    <aside class="blog-sidebar sidebar columns medium-4">
        @include('partials.sidebar')
    </aside>
    </div>
@endsection

@section('base-footer')
    @include('partials.footer')
@endsection
