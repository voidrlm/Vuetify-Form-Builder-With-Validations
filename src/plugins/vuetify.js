import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        accent: "#e8e8e8",
        primary: "#ff8888",
        secondary: "#b0bec5",
        error: "#ff8888",
        success: "#45a5ae",
      },
      dark: {
        accent: "#171717",
        primary: "#ff8888",
        secondary: "#b0bec5",
        error: "#ff8888",
        success: "#45a5ae",
      },
    },
  },
});
