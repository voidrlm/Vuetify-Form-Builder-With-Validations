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
  </v-container>
</template>
<script>
import formBuilder from "../components/form/formBuilder.vue";
import codeBlock from "@/components/code/codeBlock.vue";
export default {
  name: "dashboard-component",
  data: () => ({ formData: [] }),
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
