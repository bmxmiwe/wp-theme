<section class="contact-and-faq">
  <div class="row row-wrapper">
    <h1 class="text-center">{{$options_acf['faq_heading']}}</h1>
    @if($options_acf['faq_fields'])
      @foreach($options_acf['faq_fields'] as $faq_field)
        <div class="large-6 column {{$loop->last ? 'end' : ''}}">
          <div class="faq-container">
            <a class="question" data-toggle="answer-{{$loop->index}}">
              <img src="{{get_bloginfo('template_directory')}}/assets/images/question-mark.png"
                   class="question-mark"
                   width="28"
                   height="28">
              <h2>
                {{$faq_field['question']}}
              </h2>
            </a>
            <div id="answer-{{$loop->index}}" class="answer" data-toggler="show">
              {!! $faq_field['answer'] !!}
            </div>
          </div>
        </div>
      @endforeach
    @endif
  </div>
</section>
