<template>
  <div class="ar-slider">
    <label class="large-label">{{label}}</label>

    <div class="button-container">
      <button class="decrease" @click="add(-1)"><i class="fa fa-minus"></i></button>
      <div class="value">{{value}} {{unit}}</div>
      <button class="increase" @click="add(1)"><i class="fa fa-plus"></i></button>
    </div>

    <vue-slider v-model="sliderValue"
                :interval="interval"
                :min="min"
                :max="max"
                :tooltip="false"
                :dot-size="32"
                :height="10">
    </vue-slider>
  </div>
</template>

<script>
  import vueSlider from 'vue-slider-component';

  export default {
    name: 'Slider',
    props: {
      value: Number,
      min: Number,
      max: Number,
      interval: {
        type: Number,
        default: 1
      },
      unit: String,
      label: String
    },
    data() {
      return {
        sliderValue: this.value
      }
    },
    components: {
      vueSlider
    },
    methods: {
      add(amount) {
        this.sliderValue = this.sliderValue + amount * this.interval;
      }
    },
    watch: {
      sliderValue(value) {
        this.$emit('input', value);
      }
    }
  }
</script>

<style lang="scss">
  $blue: #29ABE2;
  $light-blue: #EBF7FC;
  $light-gray: #D8D8D8;
  $orange: #FD8124;

  .ar-slider {
    height: 105px;
    font-family: Raleway;
    font-weight: bold;
    margin-bottom: 18px;

    .large-label {
      font-size: 24px;
      text-align: center;
      font-weight: bold;
      color: #4c4c4c;
      margin-bottom: 8px;
      line-height: 1;
    }

    .button-container {
      height: 32px;
      position: relative;
      width: 245px;
      margin: auto;

      .value {
        font-size: 28px;
        color: $blue;
        text-align: center;
        line-height: 32px;
      }

      button {
        position: absolute;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        top: 0;
        background-color: $blue;
        border: none;
        color: #FFF;

        &:focus {
          outline: none;
          opacity: 0.8;
        }

        &.decrease {
          left: 0;
        }

        &.increase {
          right: 0;
        }
      }
    }

    .vue-slider {
      background-color: $light-gray;
    }

    .vue-slider-process {
      background-color: #4C4C4C;
    }

    .vue-slider-dot {
      background-color: $orange;
      box-shadow: 1px 2px 3px rgba(0, 0, 0, .26);
    }

  }
</style>