<template>
  <v-app-bar
    :color="$vuetify.theme.dark ? '#121212' : '#FFFFFF'"
    app
    dense
    flat
  >
    <v-toolbar-title class="font-weight-bold"
      >Vuetify Form Builder</v-toolbar-title
    >

    <v-spacer></v-spacer>
    <v-btn
      icon
      rounded
      class="my-2"
      href="https://twitter.com/voidrlm"
      target="_blank"
    >
      <v-icon size="24px"> mdi-twitter </v-icon>
    </v-btn>
    <v-btn
      icon
      rounded
      class="my-2"
      href="https://github.com/voidrlm/Vuetify-Form-Builder-With-Validations"
      target="_blank"
    >
      <v-icon size="24px"> mdi-github </v-icon>
    </v-btn>
    <v-btn
      icon
      @click="
        $vuetify.theme.dark = !$vuetify.theme.dark;
        saveSettings('darkMode');
      "
      ><v-icon>mdi-theme-light-dark</v-icon></v-btn
    >
  </v-app-bar>
</template>

<script>
export default {
  data: () => ({}),
  beforeMount() {
    if (localStorage.getItem("darkTheme") !== null) {
      this.$vuetify.theme.dark = JSON.parse(localStorage.getItem("darkTheme"));
    }
  },
  methods: {
    saveSettings(parameter) {
      if (parameter === "darkMode") {
        localStorage.setItem("darkTheme", this.$vuetify.theme.dark);
      }
    },
  },
};
</script>
