<section class="hero simpleform-section">
  <div class="row row-wrapper">
    <div class="medium-12 column">
      <div class="steps">
        <div class="content simpleform-content"
             data-success-url="{{get_field('success_page')}}"
               data-fail-url="{{get_field('fail_page')}}"
        >
          <h1>{!! the_title() !!}</h1>
          <p class="sub-header">Laske lainan kuukausierä</p>

          <div id="simple-form"></div>
        </div>

        <div class="steps-wrap">
          <div class="row">
            <div class="medium-4 large-4 columns">
              <div class="step-image">
                <img src="{{get_bloginfo('template_directory')}}/assets/images/step-1-alt.png" alt="">
              </div>
            </div>
            <div class="medium-4 large-4 columns">
              <div class="step-image">
                <img src="{{get_bloginfo('template_directory')}}/assets/images/step-2-alt.png" alt="">
              </div>
            </div>

            <div class="medium-4 large-4 columns">
              <div class="step-image">
                <img src="{{get_bloginfo('template_directory')}}/assets/images/step-3-alt.png" alt="">
              </div>
            </div>
          </div>
        </div>

        <div class="content editor-content">
          <div class="monthly-payment-example">
            Esimerkkilaskelma: Todellinen vuosikorko on 10,91 %, kun lainasumma on 10 000 €, takaisinmaksuaika on 5
            vuotta, esimerkkikorko 10,4 %. Takaisinmaksettava summa on tällöin 12 866,64 €, eli 214,4 €/kk. Laina-aika
            1-15 vuotta, todellinen vuosikorko 4,5%-50,5%
          </div>
          {{ the_content() }}
        </div>
      </div>
    </div>
  </div>
</section>

@include('partials.section-info');

