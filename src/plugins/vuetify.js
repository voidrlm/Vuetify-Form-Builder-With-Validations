import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        accent: "#b0bec5",
        primary: "#ff8888",
        secondary: "#b0bec5",
        error: "#ff8888",
        success: "#45a5ae",
      },
      dark: {
        accent: "#b0bec5",
        primary: "#ff8888",
        secondary: "#b0bec5",
        error: "#ff8888",
        success: "#45a5ae",
      },
    },
  },
});
