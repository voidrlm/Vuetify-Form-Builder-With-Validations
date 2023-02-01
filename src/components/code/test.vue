<template>
  <v-form lazy-validation v-model="valid" ref="Form">
    <v-container class="text-center">
      <v-text-field label="" v-model="field_1"></v-text-field>
    </v-container>
  </v-form>
</template>
<script>
export default {
  name: "dashboard-component",
  data: () => ({
    valid: true,
    field_1: null,
  }),
  methods: {
    validate() {
      this.$refs.form.validate();
    },
  },
};
</script>

// name: "dashboard-component",
