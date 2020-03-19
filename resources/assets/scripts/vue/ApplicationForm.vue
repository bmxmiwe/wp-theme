<template>
  <div class="application-form"
       :class="{'display-invalid-fields': state.displayInvalidFields}"
       :style="{ backgroundImage: 'url(' + other.imageUrl + ')' }">

    <template v-if="state.step !== 3">
      <div class="row column">
        <div class="padding">
          <div class="text-center form-top">
            <h1>{{text.heading}}</h1>
            <p v-html="text.lead"></p>
          </div>

          <div class="row simple-form-wrapper">
            <dropdown v-model="data.loanAmount"
                      :options="fields.loanAmounts.options"
                      :label="fields.loanAmounts.label"
                      :placeholder="fields.loanAmounts.placeholder"
                      :icon="true"
                      iconClass="fa fa-euro"
                      class="large-4 column dropdown-large">
            </dropdown>

            <dropdown v-model="data.loanPeriod"
                      :options="fields.loanTime.options"
                      :label="fields.loanTime.label"
                      :placeholder="fields.loanTime.placeholder"
                      :icon="true"
                      iconClass="fa fa-calendar-o"
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
            <!-- <slider v-model="data.loanAmount"
                    :interval="100"
                    :min="500"
                    :max="50000"
                    :unit="text.general.currencySymbol"
                    :label="text.label.loanAmount"></slider>
            <slider v-model="data.loanPeriod"
                    :min="1"
                    :max="maxLoanPeriod"
                    :unit="'vuotta'"
                    :label="text.label.loanPeriod"></slider> -->
        </div>

        <!--monthly payment-->
        <div class="monthly-payment-container">
          {{text.monthlyPaymentHeading}}
          <span class="monthly-payment-display">
        {{monthlyPayment}} {{text.monthlyPaymentUnit}}
        </span>
        </div>
      </div>

      <div class="padding">
        <div v-if="state.step === 2" class="step-2">
          <!--combine-->
          <toggle v-model="data.loanCombine">{{text.label.loanCombine}}</toggle>
          <slider v-if="data.loanCombine"
                  v-model="data.loanCombineAmount"
                  :interval="100"
                  :min="100"
                  :max="data.loanAmount"
                  :unit="text.general.currencySymbol"
                  :label="text.label.loanCombineAmount">
          </slider>
          <!--person info-->
          <div class="row">
            <component v-for="(key, index) in inputGroup.personInfo"
                       :is="fields[key].type"
                       v-model="data.personInfo[key]"
                       :key="key"
                       v-bind="fields[key]"
                       :class="{end: index === inputGroup.personInfo.length - 1}"
                       class="large-4 column">
            </component>

            <!-- conditional: military service -->
            <Dropdown v-model="data.personInfo.militaryService"
                    v-bind="fields.militaryService"
                    class="large-4 column">
            </Dropdown>
          </div>

          <!-- employment and education -->
          <div class="row">
            <dropdown v-model="data.personEmployment.education"
                      :options="fields.education.options"
                      :label="fields.education.label"
                      :placeholder="text.general.selectPlaceholder"
                      class="large-4 column">
            </dropdown>
            <dropdown v-model="data.personEmployment.employment"
                      :options="fields.employment.options"
                      :label="fields.employment.label"
                      :placeholder="text.general.selectPlaceholder"
                      class="large-4 column end">
            </dropdown>

            <div v-if="!validEmployment"
                 class="column">
              {{text.invalidEmploymentMessage}}
            </div>
          </div>

          <!-- rest of the form is only displayed if employment is valid (null is considered valid) -->
          <template v-if="validEmployment">

            <!-- don't display if employment is null -->
            <div v-if="data.personEmployment.employment !== null"
                 class="row">
              <component v-for="(key, index) in reactiveArraysOfOptions.employmentDetails"
                         :is="fields.employmentDetails[key].type"
                         :key="key"
                         v-model="data.personEmploymentDetails[key]"
                         v-bind="fields.employmentDetails[key]"
                         :validation-data="{grossIncome: data.personEmploymentDetails.grossIncome}"
                         :class="{end: index === inputGroup.employmentDetails[data.personEmployment.employment].length - 1}"
                         class="large-4 column">
              </component>
            </div>

            <!-- household -->
            <div class="row">
              <component v-for="(key, index) in inputGroup.household"
                         :is="fields.household[key].type"
                         :key="key"
                         v-model="data.household[key]"
                         v-bind="fields.household[key]"
                         :class="{end: index === inputGroup.household.length - 1}"
                         class="large-4 column">
                {{fields.household[key].slot}}
              </component>

              <!-- rent -->
              <text-input v-if="hasRent"
                          v-model="data.household.rent"
                          v-bind="fields.household.rent"
                          class="large-4 column end">
              </text-input>
            </div>

            <!-- loans and credit cards -->
            <div class="row">
              <toggle v-model="data.hasLoans"
                      v-bind="fields.hasLoans"
                      class="column">
                {{fields.hasLoans.slot}}
              </toggle>

              <div v-show="data.hasLoans === fields.hasLoans.checked" class="loans-and-credit-cards">
                <!-- credit cards -->
                <h2 class="column">{{text.headingCreditCards}}</h2>
                <component v-for="(key, index) in inputGroup.creditCards"
                           :is="fields[key].type"
                           :key="key"
                           v-model="data.creditCards[key]"
                           v-bind="fields[key]"
                           :class="{end: index === inputGroup.creditCards.length - 1}"
                           class="large-4 column">
                  {{fields[key].slot}}
                </component>

                <!-- loans -->
                <h2 class="column">{{text.headingLoans}}</h2>
                <dropdown v-model="data.AppPurposeId"
                          v-bind="fields.AppPurposeId"
                          class="large-4 column end">
                </dropdown>
                <dropdown v-model="data.numberOfLoans"
                          v-bind="fields.numberOfLoans"
                          class="large-4 column end">
                </dropdown>
                <template v-if="data.numberOfLoans > 0">
                  <div class="column loan-column-headings">
                    <div class="row">
                      <div class="hide-for-medium-only hide-for-small-only large-4 column">{{text.loans.typeHeading}}</div>
                      <div class="large-8 column">
                        <div class="row">
                          <div class="hide-for-medium-only hide-for-small-only large-4 column">{{text.loans.totalAmountHeading}}</div>
                          <div class="hide-for-medium-only hide-for-small-only large-4 column">{{text.loans.monthlyAmountHeading}}</div>
                          <div class="hide-for-medium-only hide-for-small-only large-4 column">{{text.loans.combineHeading}}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <loan v-for="(loan, index) in data.loans"
                        v-model="data.loans[index]"
                        :key="data.loans[index].loanNumber">
                  </loan>
                </template>
                <dropdown v-model="data.banks"
                          v-bind="fields.banks"
                          class="large-4 column end"
                >
                </dropdown>
                <toggle
                  v-model="data.electronicIdentification"
                  v-bind="fields.electronicIdentification"
                  class="large-4 column end"
                >
                  {{fields.electronicIdentification.slot}}
                </toggle>
              </div>
            </div>

            <!-- extra person -->
            <div class="row">
              <toggle v-model="data.extraPerson"
                      v-bind="fields.extraPerson"
                      class="column">{{fields.extraPerson.slot}}
              </toggle>
            </div>
            <template v-if="data.extraPerson === this.fields.extraPerson.checked">
              <div class="row">
                <h2 class="column">{{text.headingExtraPerson}}</h2>

                <component v-for="(key, index) in reactiveArraysOfOptions.extraPersonInfo"
                           :is="fields[key].type"
                           :key="key"
                           v-model="data.extraPersonInfo[key]"
                           v-bind="fields[key]"
                           :class="{end: index === inputGroup.extraPersonInfo.length - 1, 'large-4': fields[key].type != 'Toggle'}"
                           class="column">
                  {{fields[key].slot}}
                </component>
              </div>

              <!-- extra person address -->
              <template v-if="data.extraPersonInfo.extraPersonSameAddress === fields.extraPersonSameAddress.unchecked">
                <div class="row">
                  <component v-for="(key, index) in inputGroup.extraPersonAddress"
                             :is="fields[key].type"
                             :key="key"
                             v-model="data.extraPersonInfo[key]"
                             v-bind="fields[key]"
                             :class="{end: index === inputGroup.extraPersonInfo.length - 1}"
                             class="large-4 column">
                    {{fields[key].slot}}
                  </component>
                </div>
              </template>

              <!-- extra person employment -->
              <div class="row">
                <div v-for="(key, index) in inputGroup.extraPersonEmployment"
                     :is="fields[key].type"
                     :key="key"
                     v-model="data.extraPersonEmployment[key]"
                     v-bind="fields[key]"
                     :class="{end: index === inputGroup.extraPersonEmployment.length - 1}"
                     class="large-4 column">
                  {{fields[key].slot}}
                </div>
              </div>

              <!-- extra person employment details -->
              <div v-if="data.extraPersonEmployment.employment !== null"
                   class="row">
                <component v-for="(key, index) in inputGroup.extraPersonEmploymentDetails[data.extraPersonEmployment.employment]"
                           :is="fields.employmentDetails[key].type"
                           :key="key"
                           v-model="data.extraPersonEmploymentDetails[key]"
                           :validation-data="{grossIncome: data.extraPersonEmploymentDetails.grossIncome}"
                           v-bind="fields.employmentDetails[key]"
                           :class="{end: index === inputGroup.extraPersonEmploymentDetails[data.extraPersonEmployment.employment].length - 1}"
                           class="large-4 column">
                </component>
              </div>

              <!-- extra person loans -->
              <div class="row">
                <toggle v-model="data.extraPersonHasLoans"
                        v-bind="fields.extraPersonHasLoans"
                        class="column">
                  {{fields.extraPersonHasLoans.slot}}
                </toggle>

                <div v-show="data.extraPersonHasLoans === fields.extraPersonHasLoans.checked" class="loans-and-credit-cards">
                  <!-- loans -->
                  <dropdown v-model="data.extraPersonNumberOfLoans"
                            v-bind="fields.numberOfLoans"
                            class="large-4 column end">
                  </dropdown>
                  <template v-if="data.extraPersonNumberOfLoans > 0">
                    <div class="column loan-column-headings">
                      <div class="row">
                        <div class="hide-for-medium-only hide-for-small-only large-4 column">{{text.loans.typeHeading}}</div>
                        <div class="hide-for-medium-only hide-for-small-only large-4 column">{{text.loans.totalAmountHeading}}</div>
                        <div class="hide-for-medium-only hide-for-small-only large-4 column end">{{text.loans.monthlyAmountHeading}}</div>
                      </div>
                    </div>
                    <loan v-for="(loan, index) in data.extraPersonLoans"
                          v-model="data.extraPersonLoans[index]"
                          :with-refinance="false"
                          :key="data.extraPersonLoans[index].loanNumber">
                    </loan>
                  </template>
                </div>
              </div>

            </template>
            <!-- extra person end -->

            <!-- terms etc. -->
            <div class="row">
              <toggle v-model="data.ehdot" class="column">
                <div v-html="fields.acceptTerms.slotHtml"></div>
              </toggle>

              <toggle v-model="data.tarkistus" class="column">
                <div v-html="fields.consentToDisclosure.slotHtml"></div>
              </toggle>
            </div>
            <div class="row">
              <toggle v-model="data.userAgreementVersion"
                      v-bind="fields.userAgreementVersion"
                      class="column">
                <p v-if="data.extraPerson === 'Kyllä'">{{fields.userAgreementVersion.slotForExtraPerson}}</p>
                <p v-if="data.extraPerson === 'Ei'">{{fields.userAgreementVersion.slot}}</p>
              </toggle>
            </div>
            <div class="row">
              <toggle v-model="data.userAgreementUserTerms"
                      v-bind="fields.userAgreementUserTerms"
                      class="column">
                <p v-if="data.extraPerson === 'Kyllä'">{{fields.userAgreementUserTerms.slotForExtraPerson}}</p>
                <p v-if="data.extraPerson === 'Ei'">{{fields.userAgreementUserTerms.slot}}</p>
              </toggle>
            </div>

          </template>
        </div>

        <div class="row ">

          <div class="column">

            <div v-if="state.displayInvalidFields && !combinedLoansTotalValid"
                 class="info-note">
              {{text.invalidCombinedLoansTotalNote}}
            </div>

            <div v-if="state.displayInvalidFields && !validData"
                 class="info-note">
              {{text.fillAllFieldsNote}}
            </div>

            <div v-if="state.displayInvalidFields && !allTermsAccepted"
                 class="info-note">
              {{text.acceptEverythingNote}}
            </div>

            <div v-if="state.sendFailed && !state.loadingRequest"
                 class="info-note">
              {{text.sendFailNote}}
            </div>

            <div class="text-center">
              <button disabled v-if="state.loadingRequest" class="submit">{{text.general.loading}}</button>
              <button v-else @click="submit" class="submit">
                {{state.step === 1 ? text.buttonOpen : text.buttonSend}}
              </button>

              <div class="monthly-payment-example">
                {{text.monthlyPaymentExample}}
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <div v-else class="padding text-center">
      <h1>{{text.successHeading}}</h1>
    </div>
  </div>
</template>

<script>
  import ApplicationFormData from './ApplicationFormData.js'
  import Toggle from './input/Toggle.vue';
  import Slider from './input/Slider.vue';
  import Dropdown from './input/Dropdown.vue';
  import TextInput from './input/TextInput.vue';
  import Datepicker from './input/Datepicker.vue';
  import Loan from './inputGroup/Loan.vue';
  import calculateInstalment from '../util/calculateInstalment.js';
  import hetu from '../util/hetu.js';
  import sendData from '../util/sendData.js';
  import validate from '../util/validate.js';
  import { getQueryParams } from '../util/requestUtils.js';


  export default {
    name: 'ApplicationForm',
    data() {
      let loanAmount = parseInt(localStorage.getItem('loanAmount'), 10);
      let loanPeriod = parseInt(localStorage.getItem('loanPeriod'), 10);
      let phone = localStorage.getItem('phone');
      let email = localStorage.getItem('email');
      if (loanAmount > 0) {
        ApplicationFormData.state.step++;
        ApplicationFormData.data.loanAmount = loanAmount;
      }
      if (loanPeriod > 0) {
        ApplicationFormData.data.loanPeriod = loanPeriod;
      }
      if (null !== phone) {
        ApplicationFormData.data.personInfo.phone = phone;
      }
      if (null !== email) {
        ApplicationFormData.data.personInfo.email = email;
      }
      localStorage.removeItem('loanAmount');
      localStorage.removeItem('loanPeriod');
      localStorage.removeItem('phone');
      localStorage.removeItem('email');
      const reactiveArraysOfOptions = {
        employmentDetails: [],
        extraPersonInfo: ApplicationFormData.inputGroup.extraPersonInfo
      };
      Object.assign(ApplicationFormData, {reactiveArraysOfOptions});
      return ApplicationFormData
    },
    components: {
      Slider,
      Toggle,
      Dropdown,
      TextInput,
      Loan,
      Datepicker,
    },

    mounted() {
      this.setPersonInfoOptions();
    },

    methods: {
      ifEmployedMoreThanYear() {
        this.reactiveArraysOfOptions.employmentDetails = this.inputGroup.employmentDetails[this.data.personEmployment.employment];
        const valuesToRemove = [
          'previousEmployer',
          'previousEmployedSince',
          'previousEmployedTo'
        ];
        const singleDayValue = 24 * 60 * 60 * 1000;
        const startDate = this.data.personEmploymentDetails.startMonth;
        if(startDate) {
          const currentDate = new Date();
          const differenceInDays = Math.round(Math.abs((startDate - currentDate) / singleDayValue));
          if(differenceInDays > 365) {
            this.reactiveArraysOfOptions.employmentDetails = this.getFilteredArray(this.reactiveArraysOfOptions.employmentDetails, valuesToRemove);
          }
        } else {
          this.reactiveArraysOfOptions.employmentDetails = this.getFilteredArray(this.reactiveArraysOfOptions.employmentDetails, valuesToRemove);
        }
      },
      setPersonInfoOptions() {
        this.reactiveArraysOfOptions.extraPersonInfo = this.inputGroup.extraPersonInfo;
        const valuesToRemove = [
          'spousesMonthlyIncome',
          'spousesMonthlyCost',
        ];
        if(!this.areMarriedOrLiveTogether || (this.data.extraPersonInfo.maritalStatusId === null && this.data.extraPersonInfo.extraPersonSameAddress !== 'Kyllä')){
          this.reactiveArraysOfOptions.extraPersonInfo = this.getFilteredArray(this.reactiveArraysOfOptions.extraPersonInfo, valuesToRemove)
        }
      },
      getFilteredArray(baseArray, valuesToRemove) {
        return baseArray.filter(element => {
          return !valuesToRemove.some(valueToRemove => valueToRemove === element)
        })
      },
      submit() {
        let self = this;

        if (this.state.step === 1) {
          this.state.step++;
          return;
        }

        if (this.validData) {
          this.state.loadingRequest = true;

          // get ga client id
          let gaClientId;
          window.ga(function (tracker) {
            gaClientId = tracker.get('clientId');
          });
          this.data.tid = gaClientId;

          // prepare and send data
          let preparedData = this.prepareData();
          sendData(preparedData, this.other.apiUrlRahamarkkinat, success, fail);
        }
        else {
          this.state.displayInvalidFields = true;
        }

        // request successful
        function success(data) {
          switch (data.Status) {
            case 'OK': // ok!
              if (data.Rejected) {
                window.location.href = self.other.rejectedLink;
              }
              else {
                window.location.href = data.RedirectURL;
              }
              break;
            case 'ERRORS': // some fields didn't pass validation
            case 'FAIL': // system error
              window.location.href = self.other.errorLink;
              break;
          }
        }

        // request failed (404 or similar)
        function fail(data) {
          self.state.loadingRequest = false;
          self.state.sendFailed = true;
        }
      },
      prepareData() {
        // deep copy
        let preparedData = JSON.parse(JSON.stringify(this.data));
        // window.console.log(preparedData);
        preparedData.queryString = getQueryParams();
        if (preparedData.personEmployment.employment === 'Eläkeläinen') {
          // set occupation category if occupation is 'retired'
          preparedData.personEmploymentDetails.occupationCategory = 'Eläkeläinen';

          // these have their own fields in the app but are combined in backend
          // insuranceInstitution -> employer
          // retirementStartMonth -> startMonth
          preparedData.personEmploymentDetails.startMonth = preparedData.personEmploymentDetails.retirementStartMonth;
          preparedData.personEmploymentDetails.employer = preparedData.personEmploymentDetails.insuranceInstitution;
        }

        // same for extra person
        if (preparedData.extraPersonEmployment.employment === 'Eläkeläinen') {
          preparedData.extraPersonEmploymentDetails.startMonth = preparedData.extraPersonEmploymentDetails.retirementStartMonth;
          preparedData.extraPersonEmploymentDetails.employer = preparedData.extraPersonEmploymentDetails.insuranceInstitution;
        }

        // add monthly payment
        preparedData.kkera = this.monthlyPayment;

        // combined amount is zero if not combined
        if (!preparedData.loanCombine) {
          preparedData.loanCombineAmount = 0;
        }

        // set co-applicant address information if same address
        if (preparedData.extraPersonInfo.extraPersonSameAddress === this.fields.extraPersonSameAddress.checked) {
          preparedData.extraPersonInfo.postOffice = preparedData.personInfo.postOffice;
          preparedData.extraPersonInfo.postalNumber = preparedData.personInfo.postalNumber;
          preparedData.extraPersonInfo.streetAddress = preparedData.personInfo.streetAddress;
        }

        // prepare dates
        preparedData.personEmploymentDetails.companyRegistrationDate = preparedMonth(preparedData.personEmploymentDetails.companyRegistrationDate, true);
        preparedData.extraPersonEmploymentDetails.companyRegistrationDate = preparedMonth(preparedData.extraPersonEmploymentDetails.companyRegistrationDate, true);

        // prepare months
        preparedData.household.moveInMonth = preparedMonth(preparedData.household.moveInMonth);
        preparedData.personEmploymentDetails.startMonth = preparedMonth(preparedData.personEmploymentDetails.startMonth);
        preparedData.extraPersonEmploymentDetails.startMonth = preparedMonth(preparedData.extraPersonEmploymentDetails.startMonth);
        preparedData.personEmploymentDetails.fixedDurationEndMonth = preparedMonth(preparedData.personEmploymentDetails.fixedDurationEndMonth);
        preparedData.extraPersonEmploymentDetails.fixedDurationEndMonth = preparedMonth(preparedData.extraPersonEmploymentDetails.fixedDurationEndMonth);

        // convert hetu to uppercase
        preparedData.personInfo.socialSecurityNumber = prepareHetu(preparedData.personInfo.socialSecurityNumber);
        preparedData.extraPersonInfo.socialSecurityNumber = prepareHetu(preparedData.extraPersonInfo.socialSecurityNumber);

        // remove spaces from iban
        // (it should never be null at this point but check exist for testing purposes)
        if (preparedData.personInfo.accountNumber !== null) {
          preparedData.personInfo.accountNumber = preparedData.personInfo.accountNumber.replace(/ /g, '');
        }

        // empty the loans array if person has no loans anymore
        // (had loans at some point but user unchecked it)
        if (preparedData.hasLoans === this.fields.hasLoans.unchecked) {
          preparedData.loans = [];
        }

        // same for extra person
        // also empty it in the case that extra person doesn't exist anymore
        // (had extra person at some point but user unchecked it)
        if (preparedData.extraPersonHasLoans === this.fields.hasLoans.unchecked ||
          preparedData.extraPerson === this.fields.extraPerson.unchecked
        ) {
          preparedData.extraPersonLoans = [];
        }
        return preparedData;

        function preparedMonth(date, includeDay) {
          date = date.replace('/','-');
          if (date !== null) {
            if (includeDay) {
              return date.substring(0, 10);
            }

            return date.substring(0, 7);
          }

          return null;
        }

        function prepareHetu(hetu) {
          if (hetu !== null) {
            return hetu.toUpperCase();
          }
        }
      }
    },
    computed: {
      areMarriedOrLiveTogether() {
        const MARRIED = 1;
        return (this.data.extraPersonInfo.maritalStatusId === MARRIED || this.data.extraPersonInfo.extraPersonSameAddress === 'Kyllä')
      },
      monthlyPayment() {
        if (this.data.loanAmount === null || this.data.loanPeriod === null) return 0;
        if (!this.other.apr) this.other.apr = 10.4;
        return calculateInstalment(this.data.loanAmount, this.other.apr, this.data.loanPeriod);
      },
      maxLoanPeriod() {
        let amount = this.data.loanAmount;
        return amount < 30000 ? 12 : 15;
      },
      validEmployment() {
        let employment = this.data.personEmployment.employment;
        return employment !== 'Opiskelija' && employment !== 'Työtön';
      },
      hasRent() {
        let residence = this.data.household.residence;
        return residence === 'Vanhempien luona' || residence === 'Vuokra';
      },
      validHetu() {
        return hetu.valid(this.data.personInfo.socialSecurityNumber);
      },
      validData() {
        // huge mess ahead. sorry.

        // personinfo
        let personInfo = this.data.personInfo;
        for (let key in personInfo) {
          if (personInfo.hasOwnProperty(key)) {
            if (key === 'militaryService') {
              if (invalid(personInfo['militaryService'])) {
                return false;
              }
            }
            else if (invalid(personInfo[key])) {
              return false;
            }
          }
        }

        // personEmployment
        let personEmployment = this.data.personEmployment;
        for (let key in personEmployment) {
          if (personEmployment.hasOwnProperty(key)) {
            if (invalid(personEmployment[key])) {
              return false;
            }
          }
        }

        // make sure that the employment field is actually valid
        if (!this.validEmployment || invalid(this.data.personEmployment.employment)) {
          return false;
        }

        // personEmploymentDetails
        let personEmploymentDetails = this.data.personEmploymentDetails;
        let requiredPersonEmploymentDetails = this.inputGroup.employmentDetails[personEmployment.employment];
        let requiredPersonEmploymentDetailsLength = requiredPersonEmploymentDetails.length;
        for (let i = 0; i < requiredPersonEmploymentDetailsLength; i++) {
          let key = requiredPersonEmploymentDetails[i];

          if (invalid(personEmploymentDetails[key])) {
            return false;
          }
        }

        // household
        let household = this.data.household;
        for (let key in household) {
          if (household.hasOwnProperty(key)) {
            if (key === 'rent') {
              if (this.hasRent && invalid(household['rent'])) {
                return false;
              }
            }
            else if (invalid(household[key])) {
              return false;
            }
          }
        }

        // loans and credit cards
        if (this.data.hasLoans === this.fields.hasLoans.checked) {
          let loans = this.data.loans;
          for (let key in loans) {
            if (loans.hasOwnProperty(key)) {
              if (invalid(loans[key].totalAmount) ||
                invalid(loans[key].monthlyAmount) ||
                invalid(loans[key].loanType)) {
                return false;
              }
            }
          }

          if (invalid(this.data.numberOfLoans)) {
            return false;
          }
        }

        // extra person
        if (this.data.extraPerson === this.fields.extraPerson.checked) {

          // extraPersonInfo
          let extraPersonInfo = this.data.extraPersonInfo;
          for (let key in extraPersonInfo) {
            if (extraPersonInfo.hasOwnProperty(key)) {

              // only check address fields if same address is unchecked
              if (key === 'streetAddress' || key === 'postalNumber' || key === 'postOffice') {
                if (extraPersonInfo.extraPersonSameAddress === this.fields.extraPersonSameAddress.unchecked
                  && invalid(extraPersonInfo[key])) {
                  return false;
                }
              }
              else if (invalid(extraPersonInfo[key])) {
                return false;
              }
            }
          }

          // extraPersonEmployment
          let extraPersonEmployment = this.data.extraPersonEmployment;
          for (let key in extraPersonEmployment) {
            if (extraPersonEmployment.hasOwnProperty(key)) {
              if (invalid(extraPersonEmployment[key])) {
                return false;
              }
            }
          }

          // extraPersonEmploymentDetails
          let extraPersonEmploymentDetails = this.data.extraPersonEmploymentDetails;
          let requiredExtraPersonEmploymentDetails = this.inputGroup.extraPersonEmploymentDetails[extraPersonEmployment.employment];
          let requiredExtraPersonEmploymentDetailsLength = requiredExtraPersonEmploymentDetails.length;
          for (let i = 0; i < requiredExtraPersonEmploymentDetailsLength; i++) {
            let key = requiredExtraPersonEmploymentDetails[i];

            if (invalid(extraPersonEmploymentDetails[key])) {
              return false;
            }
          }

          // extraPersonLoans
          if (this.data.extraPersonHasLoans === this.fields.extraPersonHasLoans.checked) {
            let extraPersonLoans = this.data.extraPersonLoans;
            for (let key in extraPersonLoans) {

              if (extraPersonLoans.hasOwnProperty(key)) {
                if (invalid(extraPersonLoans[key].totalAmount) ||
                  invalid(extraPersonLoans[key].monthlyAmount) ||
                  invalid(extraPersonLoans[key].loanType)) {
                  return false;
                }
              }
            }
            if (invalid(this.data.extraPersonNumberOfLoans)) {
              return false;
            }
          }
        }

        // make sure that the total of combined loans is within loan amount
        if (!this.combinedLoansTotalValid) {
          return false;
        }

        // consent and terms
        if (!this.allTermsAccepted) {
          return false;
        }

        return true;

        function invalid(value) {
          return !validate.filled(value);
        }
      },
      allTermsAccepted() {
        let consent = this.data.tarkistus === 1;
        let terms = this.data.ehdot === 1;
        let userAgreementUserTerms = this.data.userAgreementUserTerms === 1;

        return consent && terms && userAgreementUserTerms;
      },
      combinedLoansTotalValid() {
        const total = this.data.loans.reduce((total, loan) => {
          if (loan.refinance) {
            return total + loan.totalAmount;
          }
          return total;
        }, 0);

        // combined loans total can't be above loan amount
        return total <= this.data.loanAmount;
      },
    },
    watch: {
      'data.personEmploymentDetails.startMonth': function () {
        this.ifEmployedMoreThanYear()
      },
      'data.personEmployment.employment': function () {
        this.ifEmployedMoreThanYear()
      },
      'data.extraPersonInfo.maritalStatusId': function () {
        this.setPersonInfoOptions()
      },
      'data.extraPersonInfo.extraPersonSameAddress': function () {
        this.setPersonInfoOptions()
      },
      // modify loans array when the number of loans changes
      'data.numberOfLoans': function (val, oldVal) {
        if (val < oldVal) {
          this.data.loans.splice(val);
          return;
        } else {
          for (let i = oldVal; i < val; i++) {
            this.data.loans.push({
              loanNumber: i + 1,
              loanType: null,
              monthlyAmount: null,
              totalAmount: null,
              refinance: false,
            });
          }
        }
      },
      'data.extraPersonNumberOfLoans': function (val, oldVal) {
        if (val < oldVal) {
          this.data.extraPersonLoans.splice(val);
          return;
        } else {
          for (let i = oldVal; i < val; i++) {
            this.data.extraPersonLoans.push({
              loanNumber: i + 1,
              loanType: null,
              monthlyAmount: null,
              totalAmount: null,
            });
          }
        }
      }
    }
  }
</script>

<style lang="scss">
  $blue: #29ABE2;
  $orange: #FD8124;
  $light-orange: #FFEDE0;
  $light-blue: #EBF7FC;
  $light-gray: #D8D8D8;
  $border-radius: 4px;
  $placeholder-gray: #929292;
  $placeholder-invalid: #d87575;
  $attention-color: #ff6464;

  .simple-form-wrapper {
    p.centered {
      text-align: center;
    }
    .dropdown-container.dropdown-large .v-select .dropdown-toggle {
      height: 50px;
      font-size: 24px;
    }
  }

  .application-form {
    background-position: top right;
    background-repeat: no-repeat;

    .form-top {
      margin-bottom: 40px;
      margin-top: 20px;
    }

    h1 {
      color: #006cb1;
      font-size: 48px;
      line-height: 60px;
      font-weight: 600;

    }

    h2 {
      font-size: 24px;
      text-align: center;
      font-weight: bold;
      color: #4c4c4c;
      margin-bottom: 16px;
      margin-top: 32px;
      line-height: 1;
    }

    .step-2 {
      margin-bottom: 20px;
    }

    .loans-and-credit-cards {
      margin-bottom: 20px;
    }

    .loan-column-headings {
      font-family: Raleway;
      font-weight: 600;
      font-size: 12px;
      padding-bottom: 8px;
      line-height: 14px;
      text-align: center;
    }

    .monthly-payment-container {
      margin-bottom: 35px;
      background-color: #d9e9f2;
      text-align: center;
      font-size: 24px;
      line-height: 49px;
      padding: 12px 15px;
      font-weight: bold;

      .monthly-payment-display {
        color: #006cb1;
        display: inline-block;
        width: 140px;
        text-align: center;
        white-space: nowrap
      }
    }

    .person-info-dropdown-container {
      margin-bottom: 40px;
    }

    .ar-input-label {
      font-family: Raleway;
      font-weight: 600;
      font-size: 15px;
      padding-bottom: 14px;
      line-height: 14px;
      display: table-cell;
      vertical-align: bottom;
      height: 36px;
    }

    .info-note {
      font-weight: bold;
      margin-bottom: 20px;
      line-height: 20px;
      overflow: hidden;
      color: $attention-color;

      &::before {
        content: "!";
        height: 20px;
        width: 20px;
        text-align: center;
        border-radius: 10px;
        margin-right: 5px;
        color: #ffffff;
        background-color: $attention-color;
        float: left;
      }
    }

    .submit {
      background-color: $orange;
      width: 100%;
      border-radius: $border-radius;
      height: 50px;
      font-family: Raleway;
      color: #FFFFFF;
      font-weight: bold;
      text-transform: uppercase;
      font-size: 18px;
      letter-spacing: 1px;
      margin-bottom: 35px;

      &[disabled] {
        opacity: 0.75;
      }
    }

    .monthly-payment-example {
      text-align: center;
      font-size: 12px;
      line-height: 18px;
    }

    // placeholder colors

    ::-webkit-input-placeholder { /* Chrome */
      color: $placeholder-gray;
    }
    :-ms-input-placeholder { /* IE 10+ */
      color: $placeholder-gray;
    }
    ::-moz-placeholder { /* Firefox 19+ */
      color: $placeholder-gray;
      opacity: 1;
    }
    :-moz-placeholder { /* Firefox 4 - 18 */
      color: $placeholder-gray;
      opacity: 1;
    }

    &.display-invalid-fields .invalid-field,
    .force-display-invalid-field {
      ::-webkit-input-placeholder { /* Chrome */
        color: $placeholder-invalid;
      }
      :-ms-input-placeholder { /* IE 10+ */
        color: $placeholder-invalid;
      }
      ::-moz-placeholder { /* Firefox 19+ */
        color: $placeholder-invalid;
        opacity: 1;
      }
      :-moz-placeholder { /* Firefox 4 - 18 */
        color: $placeholder-invalid;
        opacity: 1;
      }
    }
  }
</style>
