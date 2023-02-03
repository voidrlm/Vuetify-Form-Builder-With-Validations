<template>
  <v-footer color="secondary darken-1" padless app>
    <v-row justify="center" no-gutters>
      <v-btn
        color="white"
        text
        rounded
        class="my-2"
        href="https://twitter.com/voidrlm"
        target="_blank"
      >
        <v-icon size="24px"> mdi-twitter </v-icon>
        Twitter
      </v-btn>
      <v-btn
        color="white"
        text
        rounded
        class="my-2"
        href="https://github.com/voidrlm/Vuetify-Form-Builder-With-Validations"
        target="_blank"
      >
        <v-icon size="24px"> mdi-github </v-icon>
        Github
      </v-btn>
    </v-row>
  </v-footer>
</template>
<script>
export default {
  name: "footer-component",
  data: () => ({}),
};
</script>
<style></style>
