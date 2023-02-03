<template>
  <v-container fluid fill-height>
    <v-layout row wrap>
      <v-flex xs12 sm12 md6>
        <v-card-title class="justify-center h5">Playground</v-card-title
        ><form-builder
          class="mt-3"
          @addField="addTextField()"
          @removeField="removeTextField"
          :form="formData" /></v-flex
      ><v-divider vertical />
      <v-flex xs12 sm12 md6>
        <v-card-title class="justify-center h5">Code</v-card-title
        ><code-block :code="formData" /></v-flex
    ></v-layout>
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
  </v-container>
</template>
<script>
import formBuilder from "../components/form/formBuilder.vue";
import codeBlock from "@/components/code/codeBlock.vue";
export default {
  name: "dashboard-component",
  data: () => ({
    formData: [],
    links: ["Twitter", "Github"],
  }),
  components: {
    formBuilder,
    codeBlock,
  },
  computed: {},
  mounted() {
    this.addTextField();
  },

  methods: {
    addTextField: function () {
      this.formData.push({
        title: "",
        type: "Number",
        required: false,
        outlined: false,
        dense: false,
        rounded: false,
        minCurrentDay: false,
        max: 0,
      });
    },
    removeTextField: function (index) {
      this.formData.splice(index, 1);
    },
  },
};
</script>
