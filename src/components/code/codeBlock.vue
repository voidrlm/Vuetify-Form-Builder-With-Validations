<template>
  <v-card-text>
    <v-textarea
      :background-color="
        $vuetify.theme.dark ? 'grey darken-3' : 'grey lighten-3'
      "
      flat
      readonly
      auto-grow
      solo
      :value="fullCode"
      class="rounded-xl mx-5"
    ></v-textarea>
  </v-card-text>
</template>

<script>
import { template, script, methods, data } from "../../resources/baseCode";
export default {
  components: {},
  props: { code: Array },
  data: () => ({}),
  computed: {
    textFieldCodes() {
      let code = this.code.map(function (field, index) {
        let textField =
          "\n        <v-text-field\n        label=" +
          field.title +
          "\n        v-model=" +
          "Field_" +
          (index + 1) +
          "\n        ></v-text-field>";
        return textField;
      });
      return code;
    },
    dataPart() {
      return null;
    },
    fullCode() {
      return (
        template[0] +
        this.textFieldCodes +
        template[1] +
        script[0] +
        data[0] +
        this.dataPart +
        data[1] +
        methods +
        script[1]
      );
    },
  },
};
</script>
<style></style>
