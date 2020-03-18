<template>

  <div class="dropdown-container"
       :class="{'invalid-field': !validField}">
    <template v-if="label">
      <label class="ar-input-label"> {{label}} </label>
    </template>
    <div class="icon-element-wrapper">
      <span class="icon-container" v-if="icon"><i :class="iconClass"></i></span>
      <v-select v-if="type === 'vue'"
                v-model="vSelectValue"
                :searchable="isSearchable"
                :options="options"
                :placeholder="placeholder"
                :input-id="classFeatureById"
      />
      <select v-else
              v-model="vSelectValue">
        <option disabled selected :value="null">{{placeholder}}</option>
        <option v-for="option in options"
                :value="getOptionValue(option)">
          {{getOptionLabel(option)}}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
  import ApplicationFormData from '../ApplicationFormData.js'
  import vSelect from 'vue-select';
  import Validate from '../../util/validate.js';

  export default {
    name: "Dropdown",
    props: {
      value: [String, Number],
      label: String,
      options: Array,
      placeholder: {
        type: String,
        'default': ApplicationFormData.text.general.selectPlaceholder
      },
      inputType: {
        type: String,
        default: ''
      },
      isSearchable: {
        type: Boolean,
        default: false
      },
      icon: false,
      iconClass: String,
    },
    data() {
      let screenWidth = window.innerWidth
        || document.documentElement.clientWidth
        || document.body.clientWidth;

      let type = (screenWidth < 640 ? 'native' : 'vue');
      if(this.inputType) {
        type = this.inputType;
      }
      return {
        type: type,
        vSelectValue: this.value,
      }
    },
    components: {
      vSelect
    },
    computed: {
      classFeatureById() {
        return this.isSearchable ? 'auto-complete' : ''
      },
      validField() {
        return Validate.filled(this.value);
      }
    },
    methods: {
      getOptionValue(option) {
        if (typeof option === 'object') {
          return option.value;
        }
        return option;
      },
      getOptionLabel(option) {
        if (typeof option === 'object') {
          return option.label;
        }
        return option;
      },
    },
    watch: {
      vSelectValue(value) {
        if (value === null) {
          this.$emit('input', null);
        } else if (typeof value === 'object') {
          this.$emit('input', value.value);
        } else {
          this.$emit('input', value);
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

  #auto-complete {
    opacity: unset;
  }
  .dropdown-container {

    select,
    .v-select {
      font-size: 12px;
      font-family: roboto;
      margin-bottom: 18px;
    }

    select {
      border-radius: 4px;
      background-color: $light-blue;
      height: 32px;
      border: none;
      overflow: hidden;
      padding: 0 10px;
      padding-right: 24px;
    }

    .v-select {
      .dropdown-toggle {
        border-radius: 4px;
        background-color: #fbe0c6;
        height: 32px;
        border: none;
        overflow: hidden;
        padding: 0 10px;

        .form-control {
          height: 30px;
          padding: 0;
          position: absolute;
          cursor: pointer;
          max-width: none;
        }

        .selected-tag {
          border: none;
          background: none;
          padding: 0;
          height: 30px;
          line-height: 30px;
          margin: 0;
          width: 0;
          white-space: nowrap;

        }

        .open-indicator {
          display: none;
        }
      }

      &.open {
        .dropdown-toggle {
          border-bottom-left-radius: 0;
          border-bottom-right-radius: 0;
        }

        input {
          opacity: 0;
        }
      }

      .dropdown-menu {
        width: auto;
        border-color: $white-gray;
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
        padding-bottom: 4px;
        padding-top: 4px;

        .active > a {
          background-color: $white-gray;
        }

        .highlight > a {
          background-color: $blue;
        }
      }
    }
  }

  .display-invalid-fields .dropdown-container {
    &.invalid-field .dropdown-toggle,
    &.invalid-field select {
      background-color: rgb(255, 192, 192) !important;
    }
  }

</style>
