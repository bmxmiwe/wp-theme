<template>
  <div class="monthpicker-container"
       :class="{'invalid-field': value !== null}">
    <label class="ar-input-label" v-if="label">{{label}}</label>
    <div class="toggle" v-on:click="onToggle">x
      <template v-if="value === null">Valitse</template>
      <template v-else>Valitse</template>
    </div>
    <div v-if="displayPicker" class="picker">
      <div v-on:click="onNavigateYears(-1)"> back </div>
      <div> vuosi </div>
      <div v-on:click="onNavigateYears(1)"> fwd </div>
      <div class="year" v-if="currentView === 'year'">
        <div v-for="i in yearsInView"
             v-on:click="onSelectYear(currentYear - i)">
          {{currentYear - i}}
        </div>
      </div>
      <div class="month" v-if="currentView === 'month'">
        <div v-for="i in 12"
             v-on:click="onSelectMonth(i)">
          {{i}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import ApplicationFormData from '../ApplicationFormData.js'

  export default {
    name: "Monthpicker",
    props: {
      value: [String, Number],
      label: String,
      placeholder: String,
      inputType: {
        type: String,
        'default': 'date',
      }
    },
    data() {
      return {
        inputValue: this.value,
        monthPlaceholder: ApplicationFormData.text.general.monthPlaceholder,
        datePlaceholder: ApplicationFormData.text.general.datePlaceholder,
        displayPicker: false,
        currentView: 'year',
        currentYear: (new Date()).getFullYear(),
        year: (new Date()).getFullYear(),
        month: null,
        yearsInView: 10
      };
    },
    methods: {
      onSelectYear(year) {
        this.year = year;
        this.currentView = 'month';
      },
      onSelectMonth(month) {
        this.month = month;
        this.value = year;
        this.displayPicker = false;
      },
      onToggle() {
        this.displayPicker = !this.displayPicker;

        if (this.displayPicker) {
          this.currentView = 'year';
        }
      },
      onNavigateYears(step) {
        this.currentYear = this.currentYear + this.yearsInView * step;
      },
    }
  }
</script>

<style lang="scss">
  $blue: #29ABE2;
  $light-blue: #EBF7FC;
  $light-gray: #D8D8D8;
  $white-gray: #EEEEEE;

  .monthpicker-container {
    margin-bottom: 18px;
    position: relative;

    input {
      font-family: Roboto;
      font-size: 12px;
      border: none !important;
      border-radius: 4px;
      height: 32px;
      background-color: $light-blue !important;
      line-height: 30px;
      padding: 0 10px;
      box-shadow: none;
      margin-bottom: 0;

      &:focus {
        box-shadow: inset 0 1px 2px rgba(10, 10, 10, 0.1);
      }
    }
  }
</style>