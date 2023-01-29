<template>
  <v-card-text>
    <v-layout justify-end class="mr-5">
      <v-btn
        elevation="0"
        rounded
        color="accent"
        @click="copyCode()"
        class="mr-2"
        :class="$vuetify.theme.dark ? 'white--text' : 'black--text'"
      >
        <v-icon size="25px" class="mr-2">mdi-clipboard-outline</v-icon>Copy Code
      </v-btn>
    </v-layout>

    <v-textarea
      ref="code"
      :background-color="
        $vuetify.theme.dark ? 'grey darken-3' : 'grey lighten-3'
      "
      flat
      readonly
      auto-grow
      solo
      :value="fullCode"
      class="rounded-lg mx-1"
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
        let openTextField = "\n        <v-text-field";
        let label = "\n        label=" + "'" + field.title + "'";
        let denseProp = field.dense
          ? "\n        :dense=" + "'" + field.dense + "'"
          : "";
        let outlinedProp = field.outlined
          ? "\n        :outlined=" + "'" + field.outlined + "'"
          : "";
        let value = "\n        v-model=" + "'" + "field_" + (index + 1) + "'";
        let closeTextField = "\n        ></v-text-field>";
        let counter = field.max
          ? "\n        :counter=" + "'" + field.max + "'"
          : "";
        let textField =
          openTextField +
          label +
          denseProp +
          outlinedProp +
          value +
          counter +
          closeTextField;
        return textField;
      });
      return code;
    },
    dataPart() {
      let code = this.code.map(function (field, index) {
        let data = "\n      field_" + (index + 1) + " : null,";
        return data;
      });
      return code;
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
  methods: {
    copyCode() {
      navigator.clipboard.writeText(this.fullCode);
    },
  },
};
</script>
<style></style>
