<template>
  <v-card-text>
    <v-layout justify-end class="mr-1 mt-3 mb-3">
      <v-btn
        elevation="0"
        rounded
        color="accent"
        @click="copyCode()"
        :class="$vuetify.theme.dark ? 'white--text' : 'black--text'"
      >
        <v-icon size="25px" class="mr-2">mdi-clipboard-outline</v-icon>Copy Code
      </v-btn>
    </v-layout>

    <pre
      ref="Syntax"
      class="CodeBackground"
      style="
        padding: 20px;
        background-color: #282c33;
        overflow: auto;
        border-radius: 10px;
      "
      >{{ fullCode }}</pre
    >
  </v-card-text>
</template>

<script>
import { template, script, methods, data } from "../../resources/baseCode";
export default {
  props: { code: Array },
  data: () => ({}),
  computed: {
    textFieldCodes() {
      let code = this.code.map(function (field, index) {
        if (
          field.type == "E-Mail" ||
          field.type == "Date" ||
          field.type == "Number" ||
          field.type == "Password"
        ) {
          field.max = 0;
        }
        //CODE GENERATION
        let openTextField = "\n        <v-text-field";
        let label = "\n        label=" + "'" + field.title + "'";
        let hint =
          field.type === "Password"
            ? "\n        hint=" + "At least 8 characters"
            : "";
        let appendicon =
          field.type === "Password"
            ? "\n        :append-icon= showPassOnField" +
              (index + 1) +
              " ? 'mdi-eye' : 'mdi-eye-off'"
            : "";
        let type =
          field.type === "Password"
            ? "\n        :type= showPassOnField" +
              (index + 1) +
              " ? 'text' : 'password'"
            : "";

        let denseProp = field.dense
          ? "\n        :dense=" + "'" + field.dense + "'"
          : "";
        let outlinedProp = field.outlined
          ? "\n        :outlined=" + "'" + field.outlined + "'"
          : "";
        let value = "\n        v-model=" + "'" + "field_" + (index + 1) + "'";
        let counter = field.max
          ? "\n        :counter=" + "'" + field.max + "'"
          : "";
        let click =
          field.type === "Password"
            ? "@click:append=showPassOnField " +
              (index + 1) +
              " = !showPassOnField " +
              (index + 1) +
              ""
            : "";
        let closeTextField = "\n        ></v-text-field>";
        //COMBINE ALL
        let textField =
          openTextField +
          label +
          hint +
          appendicon +
          type +
          denseProp +
          outlinedProp +
          value +
          counter +
          click +
          closeTextField;
        return textField;
      });
      return code;
    },
    dataPart() {
      const emailFieldFound = this.code.some(
        (field) => field.type === "E-Mail"
      );
      const passwordFieldFound = this.code.some(
        (field) => field.type === "Password"
      );

      let emailRules = emailFieldFound
        ? "\n      emailRules: [" +
          "\n       v => !!v || 'E-mail is required'," +
          "\n       v => /.+@.+" +
          // eslint-disable-next-line no-useless-escape
          "\..+/.test(v) || 'E-mail must be valid',      \n       ],"
        : "";
      let passwordRules = passwordFieldFound
        ? "\n      passwordRules: [(v) => !!v || " +
          "'Password is required.'" +
          ", (v) => (v && v.length >= 8) || 'Minimum 8 characters,' ],"
        : "";
      let code = this.code.map(function (field, index) {
        let showPass =
          field.type === "Password"
            ? "\n      showPassOnField" + (index + 1) + " : false,"
            : "";
        let data = "\n      field_" + (index + 1) + " : null," + showPass;
        return data;
      });
      console.log(code);
      return code + passwordRules + emailRules;
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
