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
import { doubleQuotes, comma } from "@/resources/textHelpers";
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
        let required = field.required ? "required" + comma : "";
        let ruleType =
          field.type == "E-Mail"
            ? "emailRules"
            : field.type == "Password"
            ? "passwordRules"
            : field.type == "Number"
            ? "numberRules"
            : "";
        let rule =
          field.type !== "Text"
            ? "\n        :rules=" +
              doubleQuotes +
              "[" +
              required +
              ruleType +
              "]" +
              doubleQuotes
            : "";
        let openTextField = "\n        <v-text-field";
        let label =
          "\n        label=" + doubleQuotes + field.title + doubleQuotes;
        let hint =
          field.type === "Password"
            ? "\n        hint=" +
              doubleQuotes +
              "At least 8 characters" +
              doubleQuotes
            : "";
        let appendicon =
          field.type === "Password"
            ? "\n        :append-icon=" +
              doubleQuotes +
              "showPassOnField" +
              (index + 1) +
              " ? 'mdi-eye' : 'mdi-eye-off'" +
              doubleQuotes
            : "";
        let type =
          field.type === "Password"
            ? "\n        :type=" +
              doubleQuotes +
              "showPassOnField" +
              (index + 1) +
              " ? 'text' : 'password'" +
              doubleQuotes
            : "";

        let denseProp = field.dense
          ? "\n        :dense=" + doubleQuotes + field.dense + doubleQuotes
          : "";
        let outlinedProp = field.outlined
          ? "\n        :outlined=" +
            doubleQuotes +
            field.outlined +
            doubleQuotes
          : "";
        let numberVModel = field.type === "Number" ? ".Number" : "";
        let value =
          "\n        v-model" +
          numberVModel +
          "=" +
          doubleQuotes +
          "field_" +
          (index + 1) +
          doubleQuotes;
        let counter = field.max
          ? "\n        :counter=" + doubleQuotes + field.max + doubleQuotes
          : "";
        let click =
          field.type === "Password"
            ? "\n        @click:append=" +
              doubleQuotes +
              "showPassOnField" +
              (index + 1) +
              " = !showPassOnField" +
              (index + 1) +
              doubleQuotes
            : "";
        let closeTextField = "\n        >\n        </v-text-field>";
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
          rule +
          closeTextField;
        return textField;
      });
      return code;
    },
    dataPart() {
      const requiredFound = this.code.some((field) => field.required);
      const emailFieldFound = this.code.some(
        (field) => field.type === "E-Mail"
      );
      const passwordFieldFound = this.code.some(
        (field) => field.type === "Password"
      );
      const numberFieldFound = this.code.some(
        (field) => field.type === "Number"
      );
      let numberRules = numberFieldFound
        ? "\n      numberRules: " +
          "(value) =>Number.isInteger(Number(value)) ||" +
          "'Please enter a valid number.'" +
          comma
        : "";
      let requiredRules = requiredFound
        ? "\n      requiredRules: " +
          "(v) => !!v || 'This field is required.'" +
          comma
        : "";
      let emailRules = emailFieldFound
        ? "\n      emailRules: " +
          "v => /.+@.+" +
          // eslint-disable-next-line no-useless-escape
          "\..+/.test(v) || 'E-mail must be valid',"
        : "";
      let passwordRules = passwordFieldFound
        ? "\n      passwordRules: (v) => (v && v.length >= 8) || 'Minimum 8 characters.'" +
          comma
        : "";
      let code = this.code.map(function (field, index) {
        let showPass =
          field.type === "Password"
            ? comma +
              "\n      showPassOnField" +
              (index + 1) +
              " : false" +
              comma
            : "";
        let data =
          "\n      field_" +
          (index + 1) +
          " : " +
          doubleQuotes +
          doubleQuotes +
          showPass;
        return data;
      });
      return code + passwordRules + emailRules + requiredRules + numberRules;
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
