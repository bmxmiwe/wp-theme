<template>
  <div class="datepicker-container"
       :class="{'invalid-field': value === null}">
    <label class="ar-input-label" v-if="label">{{label}}</label>
    <vue-datepicker v-model="inputValue"
                    :placeholder="placeholder"
                    :monday-first="true"
                    :disabled="restrictions"
                    language="fi">
    </vue-datepicker>
  </div>
</template>

<script>
  import ApplicationFormData from '../ApplicationFormData.js';
  import VueDatepicker from 'vuejs-datepicker';

  export default {
    name: "Datepicker",
    props: {
      value: Date,
      label: String,
      dateRestriction: String,
    },
    data() {
      return {
        inputValue: this.value,
        placeholder: ApplicationFormData.text.general.selectPlaceholder,
      };
    },
    watch: {
      inputValue() {
        this.$emit('input', this.inputValue);
      }
    },
    computed: {
      restrictions() {
        if (this.dateRestriction === 'past') {
          return {
            'from': new Date(),
          }
        }
        else if (this.dateRestriction === 'future') {
          return {
            'to': new Date(),
          }
        }
        else {
          return {};
        }
      }
    },
    components: {
      VueDatepicker,
    }
  }
</script>

<style lang="scss">
  $blue: #29ABE2;
  $light-blue: #EBF7FC;
  $light-gray: #D8D8D8;
  $white-gray: #EEEEEE;

  .datepicker-container {
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
      cursor: pointer !important;

      &:focus {
        box-shadow: inset 0 1px 2px rgba(10, 10, 10, 0.1);
      }
    }

    .vdp-datepicker__calendar {
      width: 250px;
    }
  }

  .display-invalid-fields .datepicker-container.invalid-field input {
    background-color: rgba(255, 0, 0, 0.25) !important;
  }
</style>