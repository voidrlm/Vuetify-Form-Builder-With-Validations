<template>
  <v-container fluid fill-height>
    <v-layout row wrap>
      <v-flex xs12 sm12 md6>
        <v-card-title class="justify-center h5">Playground</v-card-title
        ><formBuilder /></v-flex
      ><v-divider vertical />
      <v-flex xs12 sm12 md6>
        <v-card-title class="justify-center h5">Code</v-card-title
        ><codeBlock /></v-flex
    ></v-layout>
  </v-container>
</template>
<script>
import formBuilder from "../components/form/formBuilder.vue";
import codeBlock from "@/components/code/codeBlock.vue";
export default {
  name: "dashboard-component",
  data: () => ({}),
  components: {
    formBuilder,
    codeBlock,
  },
  computed: {},
};
</script>
