import Vue from 'vue'
import Vuelidate from 'vuelidate'

import ApplicationForm from '../vue/ApplicationForm.vue'
import SimpleForm from '../vue/SimpleForm.vue'
import SimpleForm2 from '../vue/SimpleForm2.vue'


export default {
  init() {
    // JavaScript to be fired on all pages

    Vue.use(Vuelidate);

    const vueComponents = [
      {
        id: 'application-form',
        vue: ApplicationForm,
      },
      {
        id: 'simple-form',
        vue: SimpleForm,
      },
      {
        id: 'simple-form-2',
        vue: SimpleForm2,
      },
    ];

    vueComponents.forEach(component => {
      if (document.getElementById(component.id)) {
        new Vue({
          el: "#" + component.id,
          render: h => h(component.vue),
        })
      }
    });

    $(document).foundation();
  },
  finalize() {
    // JavaScript to be fired on all pages, after page specific JS is fired
  },
};
