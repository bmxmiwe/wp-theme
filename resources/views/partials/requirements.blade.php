<section class="requirements">
  <div class="row row-wrapper">
    <div class="column">
      <h1>{{$options_acf['requirements_heading']}}</h1>
      <div class="requirements-text-container">
        {!! $options_acf['requirements_text'] !!}
      </div>
    </div>
    @if($options_acf['requirements_fields'])
      @foreach($options_acf['requirements_fields'] as $requirement_field)
        <div class="requirement-container large-4 column {{$loop->last ? 'end' : ''}}">
          <img
            src="{{$requirement_field['image']['url']}}"
            width="78"
            height="78"
            alt="{{$requirement_field['image']['alt']}}"
          >
          <div class="text-container">
            <h2>{{$requirement_field['heading']}}</h2>
            <p class="text">{{$requirement_field['text']}}</p>
          </div>
        </div>
      @endforeach
    @endif
  </div>
</section>
