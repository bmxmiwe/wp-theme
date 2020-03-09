<section class="hero simpleform-section">
  <div class="row row-wrapper">
    <div class="medium-12 column">
      <div class="steps">
        <div
          class="content s-iframe-form"
          data-pubid="{{ get_field('pub_id')}}"
          data-countrycode="{{ get_field('countrycode')}}"
          data-pubidsub1="{{ get_field('pubidsub1')}}"
          data-pubidsub2="{{ get_field('pubidsub2')}}"
          data-pubidsub3="{{ get_field('pubidsub3')}}"
          data-pubidsub4="{{ get_field('pubidsub4')}}"
          data-pubidsub5="{{ get_field('pubidsub5')}}"
        >

          <h1>{!! the_title() !!}</h1>

          <!-- SALUSGROUP IFRAME TAG START -->
          <script src="//cdn.salus.group/forms/salusgroup_forms_min.js"></script>
          <script>
            var formArticleBody = document.querySelector('.s-iframe-form');

            var sFormEmail = document.cookie.replace(/(?:(?:^|.*;\s*)sf_email\s*\=\s*([^;]*).*$)|^.*$/, "$1");
            var sFormPhone = document.cookie.replace(/(?:(?:^|.*;\s*)sf_telephone\s*\=\s*([^;]*).*$)|^.*$/, "$1");
            var sGrossIncome = document.cookie.replace(/(?:(?:^|.*;\s*)sf_gross_income\s*\=\s*([^;]*).*$)|^.*$/, "$1");
            var sEmployment = document.cookie.replace(/(?:(?:^|.*;\s*)sf_employment\s*\=\s*([^;]*).*$)|^.*$/, "$1");
            var sLoanPeriod = document.cookie.replace(/(?:(?:^|.*;\s*)sf_loan_period\s*\=\s*([^;]*).*$)|^.*$/, "$1");
            var sLoanAmount = document.cookie.replace(/(?:(?:^|.*;\s*)sf_loan_amount\s*\=\s*([^;]*).*$)|^.*$/, "$1");
            var sTid = document.cookie.replace(/(?:(?:^|.*;\s*)sf_tid\s*\=\s*([^;]*).*$)|^.*$/, "$1");

            salusgroup.publisher.pubid = formArticleBody.getAttribute('data-pubid');
            salusgroup.countrycode = formArticleBody.getAttribute('data-countrycode');
            salusgroup.publisher.pubidsub1 = formArticleBody.getAttribute('data-pubidsub1');
            salusgroup.publisher.pubidsub2 = formArticleBody.getAttribute('data-pubidsub2');
            salusgroup.publisher.pubidsub3 = formArticleBody.getAttribute('data-pubidsub3');
            salusgroup.publisher.pubidsub4 = formArticleBody.getAttribute('data-pubidsub4');
            salusgroup.publisher.pubidsub5 = formArticleBody.getAttribute('data-pubidsub5');
            salusgroup.publisher.pubid_reference = sTid;

            // these two are conditional in order to keep support for SimpleForm 1
            if (sGrossIncome) {
              salusgroup.prefill['income_before_taxes'] = sGrossIncome;
            }
            if (sEmployment) {
              salusgroup.prefill['occupation_type_1'] = sEmployment;
            }

            salusgroup.prefill['email'] = sFormEmail;
            salusgroup.prefill['loan_amount'] = sLoanAmount;
            salusgroup.prefill['loan_period'] = sLoanPeriod;
            salusgroup.prefill['phone'] = sFormPhone;

            document.write(salusgroup.generateIframe());
          </script>
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
          {{ the_content() }}
        </div>
      </div>
    </div>
  </div>
</section>

@include('partials.section-info');

