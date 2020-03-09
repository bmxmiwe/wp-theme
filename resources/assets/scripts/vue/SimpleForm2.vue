<template>
  <div class="simple-form-wrapper">

    <!-- loan fields -->
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

    <!-- user fields -->
    <div class="row">
      <div v-for="field in userFields"
           class="large-4 column">

        <!-- text field -->
        <div v-if="field.type === 'text'"
             class="text-input-container"
             :class="{ 'form-group--error': $v.user[field.key].$error }">
          <label class="ar-input-label">{{field.label}}</label>

          <input
            type="text"
            class="form__input"
            v-model="user[field.key]"
            @input="$v.user[field.key].$touch()">

          <template v-if="field.hasOwnProperty('validation')">
            <p v-for="(text, key) in field.validation"
               class="form-group__message info-note"
               v-if="!$v.user[field.key][key] && $v.user[field.key].$dirty">
              {{text}}
            </p>
          </template>
        </div>

        <!-- dropdown -->
        <dropdown v-else-if="field.type === 'dropdown'"
                  v-model="user[field.key]"
                  :options="field.options"
                  :label="field.label"
                  class="dropdown-user">
        </dropdown>

      </div>
    </div>

    <!-- terms etc. -->
    <div class="row toggle-switchers">
      <toggle v-model="ehdot" class="first small-12 medium-6 column">
        <div>Olen tutustunut <a
          target="_blank"
          :href="links.termsLink">palvelukuvauksen</a>.
        </div>
      </toggle>

      <toggle v-model="tarkistus" class="small-12 medium-6 column">
        <div>Lainaneuvos.fi saa lähettää minulle lainatarjouksia sähköpostitse ja tekstiviestitse.
        </div>
      </toggle>
    </div>

    <!-- submit, errors etc. -->
    <div class="row">
      <div class="column submit-wrap">

        <template v-if="this.showFormErrors">
          <p class="form-group__message info-note"
             v-for="field in userFields"
             v-if="!$v.user[field.key].required">
            {{field.label}} on pakollinen tieto.
          </p>

          <div v-if="termsNotice"
               class="info-note">
            {{text.acceptEverythingNote}}
          </div>
        </template>

        <div v-if="successFullySubmitted" class="padding text-center">
          <h2>{{text.successHeading}}</h2>
        </div>

        <button class="submit"
                @click="submit">Hae luottopäätös
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

  export default {
    data() {
      return {
        valid: false,
        ehdot: '',
        tarkistus: '',
        loanAmount: 4000,
        loanPeriod: 4,
        currencyIcon: 'fa fa-euro',
        calendarIcon: 'fa fa-calendar-o',
        interestRate: 10.9,
        user: {
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          employment: '',
          grossIncome: '',
        },
        userLastName: '',
        links: {
          successLink: '',
          rejectedLink: '',
          errorLink: '',
          termsLink: 'https://lainaneuvos.fi/wp-content/themes/arkiraha-theme/resources/assets/pdf/palvelukuvaus.pdf',
          marketingLink: 'https://lainaneuvos.fi/wp-content/themes/arkiraha-theme/resources/assets/pdf/palvelukuvaus.pdf'
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
          acceptEverythingNote: 'Hyväksy palvelun ehdot.',
          sendFailNote: 'Lomakkeen lähetys epäonnistui',
          successHeading: 'Lomake lähetetty onnistuneesti!',
        },
        showFormErrors: false,
        successFullySubmitted: false,
        sentWithInvalid: false,
        userFields: [
          {
            type: 'text',
            key: 'firstName',
            label: 'Etunimi',
          },
          {
            type: 'text',
            key: 'lastName',
            label: 'Sukunimi',
          },
          {
            type: 'text',
            key: 'email',
            label: 'Sähköpostiosoite',
            validation: {
              email: 'Oikea sähköpostiosoite vaaditaan',
            },
          },
          {
            type: 'text',
            key: 'phone',
            label: 'Puhelin',
            validation: {
              minLength: 'Puhelinnumeron oltava vähintään 8 numeroa ilman välilyöntejä.',
              maxLength: 'Puhelinnumero saa olla enintään 14 numeroa ilman välilyöntejä.',
              numeric: 'Puhelinnumero saa sisältää ainoastaan numeroita ilman välilyöntejä.',
            },
          },
          {
            type: 'dropdown',
            key: 'employment',
            label: 'Työsuhde',
            options: [
              {
                value: 'fulltime',
                label: 'Vakituinen työsuhde',
              },
              {
                value: 'entrepreneur',
                label: 'Yrittäjä'
              },
              {
                value: 'freelancer',
                label: 'Freelancer'
              },
              {
                value: 'pensioner',
                label: 'Eläkeläinen'
              },
              {
                value: 'unemployed',
                label: 'Työtön'
              },
              {
                value: 'student',
                label: 'Opiskelija'
              },
              {
                value: 'trial',
                label: 'Koeajalla'
              },
              {
                value: 'parentalleave',
                label: 'Vanhempainloma'
              },
              {
                value: 'farmer',
                label: 'Maanviljelijä'
              },
              {
                value: 'temp_job',
                label: 'Määräaikainen työsuhde',
              },
              {
                value: 'other',
                label: 'Muu'
              },
            ],
          },
          {
            type: 'text',
            key: 'grossIncome',
            label: 'Bruttotulot kuukaudessa',
            validation: {
              numeric: 'Bruttotulot kuukaudessa saa sisältää ainoastaan numeroita'
            }
          },
        ],
      }
    },
    validations: {
      user: {
        firstName: {
          required
        },
        lastName: {
          required
        },
        email: {
          required,
          email
        },
        phone: {
          required,
          minLength: minLength(8),
          maxLength: maxLength(13),
          numeric
        },
        employment: {
          required,
        },
        grossIncome: {
          required,
          numeric,
        }
      },
      ehdot: {
        required,
      },
      tarkistus: {
        required,
      }
    },
    computed: {
      monthlyPayment() {
        const returnValue = calculateInstalment(this.loanAmount, this.interestRate, this.loanPeriod);
        return isNaN(returnValue) || returnValue === Number.POSITIVE_INFINITY ? 0 : returnValue;
      },
      termsNotice() {
        return this.ehdot !== 1 || this.tarkistus !== 1;
      }
    },
    components: {
      Toggle,
      Dropdown
    },
    methods: {
      submit() {
        if (!this.$v.$invalid) {

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
              firstName: this.user.firstName,
              lastName: this.user.lastName,
              grossIncome: this.user.grossIncome,
              employment: this.user.employment,
              email: this.user.email,
              telephone: this.user.phone,
              loanAmount: this.loanAmount,
              loanPeriod: this.loanPeriod,
              terms: this.ehdot,
              marketingPermission: this.tarkistus,
              tid: this.tid
            }
          })
            .then((response) => {

              if (response.status === 200 && response.data.check === 'passed') {
                Cookies.set('sf_gross_income', this.user.grossIncome, {expires: 7});
                Cookies.set('sf_employment', this.user.employment, {expires: 7});
                Cookies.set('sf_email', this.user.email, {expires: 7});
                Cookies.set('sf_telephone', this.user.phone, {expires: 7});
                Cookies.set('sf_loan_amount', this.loanAmount, {expires: 7});
                Cookies.set('sf_loan_period', this.loanPeriod, {expires: 7});
                Cookies.set('sf_tid', this.tid, {expires: 7});

                window.location = this.links.successLink;
              } else {
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
    }
  }
</script>

<style lang="scss">
  $attention-color: #ff6464;

  .simple-form-wrapper {

    p.centered {
      text-align: center;
      font-size: 16px;
    }

    .dropdown-container.dropdown-large .v-select .dropdown-toggle {
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
