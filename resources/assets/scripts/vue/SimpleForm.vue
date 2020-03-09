<template>
  <div class="simple-form-wrapper">
    <div class="row">
      <dropdown v-model="loanAmount"
                :options="fields.loanAmounts.options"
                :label="fields.loanAmounts.label"
                :placeholder="fields.loanAmounts.placeholder"
                :icon="true"
                :iconClass="currencyIcon"
                class="large-4 column dropdown-large">
      </dropdown>

      <dropdown v-model="loanPeriod"
                :options="fields.loanTime.options"
                :label="fields.loanTime.label"
                :placeholder="fields.loanTime.placeholder"
                :icon="true"
                :iconClass="calendarIcon"
                class="large-4 column dropdown-large">
      </dropdown>

      <div class="text-input-container result-container large-4 column">

        <label class="ar-input-label">Arvioitu kuukausierä *:</label>
        <div class="result-wrap">
          <input type="text" v-model="monthlyPayment" disabled>
          <span class="result-units">€ / kk</span>
        </div>
      </div>

    </div>
    <div class="row">
      <div class="text-input-container large-6 column">
        <div :class="{ 'form-group--error': $v.userEmail.$error }">
          <label class="ar-input-label">Sähköpostiosoite</label>

          <input
            type="text"
            class="form__input"
            v-model="userEmail"
            @input="$v.userEmail.$touch()">

          <p class="form-group__message info-note"
             v-if="!$v.userEmail.email">Oikea sähköposti osoite vaaditaan
          </p>
        </div>
      </div>

      <div class="text-input-container large-6 column">
        <label class="ar-input-label">Puhelin</label>

        <input type="text"
               class="form__input"
               v-model="userPhone"
               @input="$v.userPhone.$touch()">

        <p class="form-group__message info-note"
           v-if="!$v.userPhone.minLength && $v.userPhone.$dirty">
          Puhelinnumeron oltava vähintään 8 numeroa ilman välilyöntejä.
        </p>

        <p class="form-group__message info-note"
           v-if="!$v.userPhone.maxLength && $v.userPhone.$dirty">
          Puhelinnumeron saa olla enintään 14 numeroa ilman välilyöntejä.
        </p>

        <p class="form-group__message info-note"
           v-if="!$v.userPhone.numeric && $v.userPhone.$dirty">
          Puhelinnumero saa sisältää ainoastaan numeroita ilman välilyöntejä.
        </p>
      </div>
    </div>

    <!-- terms etc. -->
    <div class="row toggle-switchers">
      <toggle v-model="ehdot" class="first small-12 medium-6 column">
        <div>Ymmärrän <a
          target="_blank"
          :href="links.termsLink">ehdot ja palvelukuvauksen</a>.
        </div>
      </toggle>

      <toggle v-model="tarkistus" class="small-12 medium-6 column">
        <div>Minä haluan <a
          target="_blank"
          :href="links.marketingLink">saada tarjouksia Freedom Rahoituksen vastaavista palveluista sähköpostitse ja tekstiviestitse.</a>.
        </div>
      </toggle>
    </div>

    <div class="row">
      <div class="column submit-wrap">

        <p class="form-group__message info-note"
           v-if="!$v.userPhone.required && this.showFormErrors">
          Puhelinnumero on pakollinen tieto
        </p>

        <p class="form-group__message info-note"
           v-if="!$v.userEmail.required &&  this.showFormErrors">
          Sähköpostiosoite on pakollinen tieto
        </p>

        <div
          v-if="(!$v.ehdot.required && this.showFormErrors) || (!$v.tarkistus.required && this.showFormErrors)"
          class="info-note">
          {{text.acceptEverythingNote}}
        </div>

        <div v-if="successFullySubmitted" class="padding text-center">
          <h2>{{text.successHeading}}</h2>
        </div>

        <button class="submit"
                @click="submit">Haluan tarjouksia lainoista
        </button>
        <p class="centered"><i class="fa fa-exclamation-circle" aria-hidden="true"></i> Hakemuksen jättäminen on ilmaista, eikä sido sinua mihinkään.</p>
      </div>

    </div>
  </div>
</template>

<script>

  import Toggle from './input/Toggle.vue';
  import Dropdown from './input/Dropdown.vue';
  import calculateInstalment from '../util/calculateInstalment.js';
  import {amounts, years} from '../util/formAmounts'
  import {required, email, minLength, maxLength, numeric} from 'vuelidate/lib/validators';
  import axios from 'axios';
  import * as Cookies from 'js-cookie';
  import { setQueryParams } from '../util/requestUtils.js';

  export default {
    data() {
      return {
        valid: false,
        ehdot: '',
        tarkistus: '',
        loanAmount: 700,
        loanPeriod: 6,
        currencyIcon: 'fa fa-euro',
        calendarIcon: 'fa fa-calendar-o',
        interestRate: 10.9,
        userEmail: '',
        userPhone: '',
        links: {
          successLink: '',
          rejectedLink: '',
          errorLink: '',
          termsLink: 'https://arkiraha.fi/wp-content/themes/arkiraha-theme/resources/assets/pdf/ar_ehdot_palvelukuvaus2.pdf',
          marketingLink: 'https://arkiraha.fi/wp-content/themes/arkiraha-theme/resources/assets/pdf/sat_tietojen_luovutus.pdf'
        },
        tid: '',
        fields: {
          loanAmounts:
            {
              label: 'Valitse lainasumma',
              placeholder: "",
              options: amounts
            },
          loanTime: {
            label: 'Valitse laina-aika',
            placeholder: "",
            options: years
          }
        },
        text: {
          fillAllFieldsNote: 'Täytä puuttuvat kentät.',
          acceptEverythingNote: 'Hyväksy ehdot ja suostumus tietojen luovutukseen.',
          sendFailNote: 'Lomakkeen lähetys epäonnistui',
          successHeading: 'Lomake lähetetty onnistuneesti!',
        },
        showFormErrors: false,
        successFullySubmitted: false,
        termsNotice: false,
        sentWithInvalid: false
      }
    },
    validations: {
      userEmail: {
        required,
        email
      },
      userPhone: {
        required,
        minLength: minLength(8),
        maxLength: maxLength(13),
        numeric
      },
      ehdot: {
        required
      },
      tarkistus: {
        required
      }
    },
    computed: {
      monthlyPayment() {
        const returnValue = calculateInstalment(this.loanAmount, this.interestRate, this.loanPeriod);
        return isNaN(returnValue) || returnValue === Number.POSITIVE_INFINITY ? 0 : returnValue;
      }
    },
    components: {
      Toggle,
      Dropdown
    },
    methods: {
      submit() {
        if (this.ehdot === 0 && this.tarkistus === 0) {
          this.termsNotice = true;

        } else if (!this.$v.$invalid) {

          // get ga client id
          let gaClientId;
          window.ga(function (tracker) {
            gaClientId = tracker.get('clientId');
          });
          this.tid = gaClientId;

          axios({
            method: 'post',
            url: 'https://wl.leadout.io/api/v2/loan/send',
            data: {
              email: this.userEmail,
              telephone: this.userPhone,
              loanAmount: this.loanAmount,
              loanPeriod: this.loanPeriod,
              terms: this.ehdot,
              marketingPermission: this.tarkistus,
              tid: this.tid
            }
          })
            .then((response) => {

              if (response.status === 200 && response.data.check === 'passed') {
                Cookies.set('sf_email', this.userEmail, {expires: 7});
                Cookies.set('sf_telephone', this.userPhone, {expires: 7});
                Cookies.set('sf_loan_amount', this.loanAmount, {expires: 7});
                Cookies.set('sf_loan_period', this.loanPeriod, {expires: 7});
                Cookies.set('sf_tid', this.tid, {expires: 7});
                window.location = this.links.successLink;
              } else {
                localStorage.setItem('loanAmount', this.loanAmount);
                localStorage.setItem('loanPeriod', this.loanPeriod);
                localStorage.setItem('phone', this.userPhone);
                localStorage.setItem('email', this.userEmail);
                window.location = this.links.errorLink;
              }
            })
            .catch((error) => {
              console.error(error);
            });

          // hotjar tag recording
          window.hj('tagRecording', ['Application sent']);
        } else {

          this.showFormErrors = true;
          console.log("form invalid");
        }
      }
    },
    created() {
      const articleBody = document.querySelector('.simpleform-content');
      this.links.successLink = articleBody.getAttribute('data-success-url');
      this.links.errorLink = articleBody.getAttribute('data-fail-url');
    },
    mounted() {
      setQueryParams();
    }
  }
</script>

<style lang="scss">
  $attention-color: #ff6464;

  .simple-form-wrapper {

    p.centered {
      text-align: center;
    }

    .dropdown-container .v-select .dropdown-toggle {
      height: 50px;
      font-size: 24px;
    }


    .toggle-switchers {
      margin-top: 1rem;
    }

    .info-note {
      font-weight: bold;
      margin-bottom: 20px;
      line-height: 20px;
      overflow: hidden;
      color: $attention-color;

      &::before {
        content: "";
        height: 0px;
        width: 00px;
        text-align: center;
        border-radius: 0px;
        margin-right: 5px;
        color: #ffffff;
        background-color: #ffffff;
        float: left;
      }
    }
  }
</style>
