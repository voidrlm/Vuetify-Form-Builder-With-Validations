<template>
  <v-container fluid>
    <v-card-title
      :class="
        $vuetify.breakpoint.mdAndUp ? 'text-h4 mt-n7' : 'text-h5 justify-center'
      "
      >Vuetify Form Builder</v-card-title
    >
  </v-container>
</template>
<script>
export default {
  name: "dashboard-component",
  data: () => ({}),
  computed: {},
};
</script>
