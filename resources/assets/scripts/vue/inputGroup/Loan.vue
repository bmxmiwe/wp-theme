<template>
  <div class="loan-container column row">
    <dropdown
      v-bind="props.loanType"
      :value="value.loanType"
      @input="updateLoanType"
      class="large-4 column">
    </dropdown>
    <div v-if="value.loanType" class="large-8 column">
      <div class="row">
        <text-input :value="value.totalAmount"
                    @input="v => {emitMerged({totalAmount: isNaN(parseInt(v)) ? null : parseInt(v)})}"
                    v-bind="props.totalAmount"
                    class="column"
                    :class="withRefinance ? 'large-4' : 'large-6'">
        </text-input>
        <text-input :value="value.monthlyAmount"
                    @input="v => {emitMerged({monthlyAmount: isNaN(parseInt(v)) ? null : parseInt(v)})}"
                    v-bind="props.monthlyAmount"
                    class="column end"
                    :class="withRefinance ? 'large-4' : 'large-6'">
        </text-input>
        <!-- (mortgages cannot be refinanced) -->
        <toggle v-if="value.loanType !== 'Mortgage' && withRefinance"
                :checked="true"
                :unchecked="false"
                :value="value.refinance"
                @input="v => {emitMerged({refinance: v})}"
                class="large-4 column end">
          {{labelCombine}}
        </toggle>
      </div>
    </div>
  </div>
</template>

<script>
  import ApplicationFormData from '../ApplicationFormData.js';
  import Toggle from '../input/Toggle.vue';
  import TextInput from '../input/TextInput.vue';
  import Dropdown from '../input/Dropdown.vue';

  export default {
    name: "Loan",
    props: {
      value: Object,
      withRefinance: {
        type: Boolean,
        default: true,
      }
    },
    data() {
      return {
        props: {
          totalAmount: {
            inputType: 'number',
            placeholder: ApplicationFormData.text.loans.totalAmountPlaceholder,
          },
          monthlyAmount: {
            inputType: 'number',
            placeholder: ApplicationFormData.text.loans.monthlyAmountPlaceholder,
          },
          loanType: ApplicationFormData.fields.loanType,
        },
        active: false,
        labelCombine: ApplicationFormData.text.loans.combineLabel,
      }
    },
    methods: {
      updateLoanType(value) {
        const newValue = {
          loanType: value,
        };
        // refinance must be set false for mortgage
        if (this.refinance && value === 'Mortgage') {
          newValue.refinance = false;
        }
        this.emitMerged(newValue);
      },
      updateRefinance(value) {
        this.emitMerged({
          refinance: value,
        });
      },
      emitMerged(value) {
        this.$emit('input', Object.assign(this.value, value));
      }
    },
    components: {
      Toggle,
      TextInput,
      Dropdown,
    }
  }
</script>

<style lang="scss">
  .loan-container {
    margin-bottom: 30px;

    @media (min-width: 960px) {
      margin-bottom: 0;
    }
  }
</style>
