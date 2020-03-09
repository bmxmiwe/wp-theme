<template>
  <div class="text-input-container"
       :class="{'force-display-invalid-field': forceDisplayInvalidField, 'invalid-field': !filledField}">
    <label class="ar-input-label" v-if="label">{{label}}</label>
    <input v-if="inputType === 'text'"
           type="text"
           v-on:blur="blurred"
           v-model="inputValue"
           :placeholder="placeholder">
    <input v-else-if="inputType === 'number'"
           type="number"
           v-on:blur="blurred"
           v-model="inputValue"
           :placeholder="placeholder">
    <input v-else-if="inputType === 'email'"
           type="email"
           v-on:blur="blurred"
           v-model="inputValue"
           :placeholder="placeholder">

    <div v-if="displayValidationInfo" class="validation-info">
      {{validation.msg}}
    </div>
  </div>
</template>

<script>
  import ApplicationFormData from '../ApplicationFormData.js'
  import Validate from '../../util/validate.js';

  export default {
    name: "TextInput",
    props: {
      value: [String, Number],
      label: String,
      placeholder: String,
      validationId: String,
      validationData: Object,
      inputType: {
        type: String,
        'default': 'text',
      }
    },
    data() {
      return {
        inputValue: this.value,
        userDone: false,
      }
    },
    methods: {
      blurred() {
        this.userDone = true;
      }
    },
    computed: {
      filledField() {
        return Validate.filled(this.inputValue);
      },
      validation() {
        if (this.validationId) {
          if (this.filledField) {
            switch (this.validationId) {
              case 'hetu':
                return Validate.arHetu(this.inputValue);
                break;
              case 'postalNumber':
                return Validate.arPostalNumber(this.inputValue);
                break;
              case 'phone':
                return Validate.arPhone(this.inputValue);
                break;
              case 'email':
                return Validate.arEmail(this.inputValue);
                break;
              case 'iban':
                return Validate.arIban(this.inputValue);
                break;
              case 'netIncome':
                return Validate.arNetIncome(this.inputValue, this.validationData.grossIncome);
                break;
              case 'grossIncome':
                return Validate.arGrossIncome(this.inputValue, this.validationData.netIncome);
                break;
              case 'rent':
                return Validate.arRent(this.inputValue);
                break;
              case 'businessId':
                return Validate.arBusinessId(this.inputValue);
                break;
            }
          }
          else { // field not filled
            return {
              valid: false,
              msg: null,
            };
          }
        }
        else { // field has no validations
          return {
            valid: this.filledField,
            msg: null,
          };
        }
      },
      forceDisplayInvalidField() {
        return this.displayValidationInfo || (this.userDone && !this.validation.valid);
      },
      displayValidationInfo() {
        return this.filledField && this.userDone && !this.validation.valid;
      }
    },
    watch: {
      inputValue(value) {
        if (this.validation.valid) {
          this.$emit('input', value);
        }
        else {
          this.$emit('input', null);

        }
      },
    }
  }
</script>

<style lang="scss">
  $blue: #29ABE2;
  $light-blue: #EBF7FC;
  $light-gray: #D8D8D8;
  $white-gray: #EEEEEE;

  .text-input-container {
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

  .validation-info {
    position: absolute;
    font-size: 12px;
    left: 5px;
    right: 5px;
    padding: 4px 8px;
    background: #ffffff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
    color: #c12626;
    border-radius: 3px;
    margin-top: 0px;
    font-weight: bold;
    z-index: 1;
  }

  .display-invalid-fields .text-input-container.invalid-field input,
  .text-input-container.force-display-invalid-field input {
    background-color: rgba(255, 0, 0, 0.25) !important;
  }
</style>