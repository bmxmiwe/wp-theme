<section class="info">
  <div class="row row-wrapper">
    <div class="column">
      <h1>{{$options_acf['info_heading']}}</h1>
      @foreach($options_acf['info_fields'] as $info_field)
        <div class="medium-4 column {{$loop->last ? 'end' : ''}}">
          <div class="info-container">
            <div class="image-container">
              <img
                src="{{$info_field['image']['url']}}"
                height="128"
                alt="{{$info_field['image']['alt']}}"
              >
            </div>
            <h2>{{$info_field['heading']}}</h2>
            <div class="text">
              {!! $info_field['text'] !!}
            </div>
          </div>
        </div>
      @endforeach
    </div>
  </div>
</section>