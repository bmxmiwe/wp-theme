<footer>
  <div class="row row-wrapper">
    <h1 class="column">
      {{$footer_acf['heading']}}
    </h1>
    @foreach($footer_acf['fields'] as $column)
      <div class="large-4 column">
        <div class="content-column">
          @foreach($column['column_fields'] as $field)
            <h2>{{$field['heading']}}</h2>
            @if ($field['acf_fc_layout'] === 'text')

              {!! $field['text'] !!}

            @elseif($field['acf_fc_layout'] === 'link_list')

              @foreach($field['links'] as $link)
                <a href="{{$link['url']}}">{{$link['text']}}</a><br>
              @endforeach

            @endif
          @endforeach
        </div>
      </div>
    @endforeach

    <a href="#top" class="back-to-top show-for-small-only">
      Takaisin sivun alkuun
    </a>
  </div>
</footer>
