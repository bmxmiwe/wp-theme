<template>
  <div class="toggle-container">
    <label class="ar-input-label" v-if="label">{{label}}</label>
    <div class="toggle">
      <switches v-model="switchesValue"
                :type-bold="true"></switches>
      <label class="toggle-label" @click="toggle">
        <slot></slot>
      </label>
    </div>
  </div>
</template>

<script>
  import Switches from 'vue-switches';

  export default {
    name: "Toggle",
    props: {
      value: [String, Number, Boolean],
      label: String,
      checked: {
        type: [String, Number, Boolean],
        'default': 1
      },
      unchecked: {
        type: [String, Number, Boolean],
        'default': 0
      },
    },
    data() {
      let booleanValue = this.convertToBoolean(this.value);

      return {
        switchesValue: booleanValue
      }
    },
    components: {
      Switches
    },
    methods: {
      toggle() {
        this.switchesValue = !this.switchesValue;
      },
      convertToEnum(value) {
        return value ? this.checked : this.unchecked;
      },
      convertToBoolean(value) {
        return value === this.checked;
      },
    },
    watch: {
      switchesValue(value) {
        this.$emit('input', this.convertToEnum(value));
      },
    }
  }
</script>

<style lang="scss">
  $blue: #29ABE2;
  $light-blue: #EBF7FC;
  $light-gray: #D8D8D8;

  .toggle {
    overflow: visible;
    height: 32px;
    padding-top: 6px;
    margin-bottom: 18px;

    .vue-switcher-theme--default.vue-switcher-color--default {
      float: left;

      // checked
      div {
        top: 0;
        height: 20px;
        width: 36px;
        background-color: $blue;

        &::after {
          top: 1px;
          width: 24px;
          margin-left: -25px;
          background-color: $light-blue;
        }
      }

      // unchecked
      &.vue-switcher--bold--unchecked div {
        background-color: $light-gray;

        &::after {
          left: 23px;
          margin-left: -22px;
          background-color: $blue;
        }
      }
    }

    .toggle-label {
      margin-top: 4px;
      line-height: 12px;
      margin-left: 46px; // 10px from toggle
      font-family: roboto;
      font-size: 13px;
    }

    .vue-switcher--bold--unchecked + .toggle-label {
      opacity: 0.5;
    }
  }
</style>