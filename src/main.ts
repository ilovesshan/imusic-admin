import { createApp } from 'vue';
import { createPinia } from "pinia";

import { Quasar, Notify, Dialog } from 'quasar';
import '@quasar/extras/material-icons/material-icons.css';
import 'quasar/src/css/index.sass';


import App from './App.vue';
import './style.css';


import router from "./router/index";
import "./permission";

const app = createApp(App);

app.use(Quasar, {
  plugins: {
    Notify,
    Dialog
  },
  config: {
    notify: {}
  }
});

app.use(createPinia());
app.use(router);
app.mount('#app');
