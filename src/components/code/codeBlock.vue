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
import {
  doubleQuotes,
  comma,
  nextLine,
  space,
  doublespace,
} from "@/resources/textHelpers";
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
        var label =
          "\n        label=" + doubleQuotes + field.title + doubleQuotes;
        var textFieldClass = field.rounded
          ? "\n        class=" + doubleQuotes + "rounded-xl" + doubleQuotes
          : "";
        if (field.type === "Date") {
          var dateComponent =
            nextLine +
            doublespace +
            space +
            "<v-menu" +
            nextLine +
            doublespace +
            doublespace +
            "ref=" +
            doubleQuotes +
            "menu" +
            (index + 1) +
            doubleQuotes +
            nextLine +
            doublespace +
            doublespace +
            "v-model=" +
            doubleQuotes +
            "showDatePicker" +
            (index + 1) +
            doubleQuotes +
            nextLine +
            doublespace +
            doublespace +
            ":close-on-content-click=" +
            doubleQuotes +
            "false" +
            doubleQuotes +
            nextLine +
            doublespace +
            doublespace +
            ":return-value.sync=" +
            doubleQuotes +
            "date" +
            doubleQuotes +
            nextLine +
            doublespace +
            doublespace +
            "transition=" +
            doubleQuotes +
            "scale-transition" +
            doubleQuotes +
            nextLine +
            doublespace +
            doublespace +
            "offset-y" +
            nextLine +
            doublespace +
            doublespace +
            "min-width=" +
            doubleQuotes +
            "auto" +
            doubleQuotes +
            nextLine +
            doublespace +
            space +
            ">" +
            nextLine +
            doublespace +
            doublespace +
            "<template v-slot:activator=" +
            doubleQuotes +
            "{ on, attrs }" +
            doubleQuotes +
            ">" +
            nextLine +
            doublespace +
            doublespace +
            space +
            "<v-text-field" +
            nextLine +
            doublespace +
            doublespace +
            doublespace +
            "v-model=" +
            doubleQuotes +
            "date" +
            (index + 1) +
            doubleQuotes +
            nextLine +
            doublespace +
            doublespace +
            doublespace +
            "label" +
            textFieldClass +
            nextLine +
            doublespace +
            doublespace +
            doublespace +
            "prepend-icon=" +
            doubleQuotes +
            "mdi-calendar" +
            doubleQuotes +
            nextLine +
            doublespace +
            doublespace +
            doublespace +
            "readonly" +
            nextLine +
            doublespace +
            doublespace +
            doublespace +
            "v-bind=" +
            doubleQuotes +
            "attrs" +
            doubleQuotes +
            " v-on=" +
            doubleQuotes +
            "on" +
            doubleQuotes +
            ">" +
            nextLine +
            doublespace +
            doublespace +
            space +
            "</v-text-field>" +
            nextLine +
            doublespace +
            doublespace +
            "</template>" +
            nextLine +
            doublespace +
            doublespace +
            "<v-date-picker v-model=" +
            doubleQuotes +
            "date" +
            doubleQuotes +
            " no-title " +
            "scrollable>" +
            nextLine +
            doublespace +
            doublespace +
            space +
            "<v-spacer/>" +
            nextLine +
            doublespace +
            doublespace +
            space +
            "<v-btn text color=" +
            doubleQuotes +
            "primary" +
            doubleQuotes +
            space +
            "@click=" +
            doubleQuotes +
            "showDatePicker" +
            (index + 1) +
            "= false" +
            doubleQuotes +
            ">Cancel </v-btn> " +
            nextLine +
            doublespace +
            doublespace +
            space +
            "<v-btn text color=" +
            doubleQuotes +
            "primary" +
            doubleQuotes +
            space +
            "@click=" +
            doubleQuotes +
            "$refs." +
            "menu" +
            (index + 1) +
            ".save(date)" +
            doubleQuotes +
            ">OK</v-btn>" +
            nextLine +
            doublespace +
            doublespace +
            "</v-date-picker>" +
            nextLine +
            doublespace +
            space +
            "</v-menu>";
        }
        //End of date component
        if (field.type !== "Date") {
          let required = field.required ? "required" + comma : "";
          let ruleType =
            field.type == "E-Mail"
              ? "emailRules"
              : field.type == "Password"
              ? "passwordRules"
              : field.type == "Number"
              ? "numberRules"
              : "";
          var rule =
            field.type !== "Text"
              ? "\n        :rules=" +
                doubleQuotes +
                "[" +
                required +
                ruleType +
                "]" +
                doubleQuotes
              : "";
          var openTextField = "\n        <v-text-field";

          var hint =
            field.type === "Password"
              ? "\n        hint=" +
                doubleQuotes +
                "At least 8 characters" +
                doubleQuotes
              : "";
          var appendicon =
            field.type === "Password"
              ? "\n        :append-icon=" +
                doubleQuotes +
                "showPassOnField" +
                (index + 1) +
                " ? 'mdi-eye' : 'mdi-eye-off'" +
                doubleQuotes
              : "";
          var type =
            field.type === "Password"
              ? "\n        :type=" +
                doubleQuotes +
                "showPassOnField" +
                (index + 1) +
                " ? 'text' : 'password'" +
                doubleQuotes
              : "";

          var denseProp = field.dense
            ? "\n        :dense=" + doubleQuotes + field.dense + doubleQuotes
            : "";
          var outlinedProp = field.outlined
            ? "\n        :outlined=" +
              doubleQuotes +
              field.outlined +
              doubleQuotes
            : "";
          var numberVModel = field.type === "Number" ? ".Number" : "";
          var value =
            "\n        v-model" +
            numberVModel +
            "=" +
            doubleQuotes +
            "field" +
            (index + 1) +
            doubleQuotes;
          var counter = field.max
            ? "\n        :counter=" + doubleQuotes + field.max + doubleQuotes
            : "";
          var click =
            field.type === "Password"
              ? "\n        @click:append=" +
                doubleQuotes +
                "showPassOnField" +
                (index + 1) +
                " = !showPassOnField" +
                (index + 1) +
                doubleQuotes
              : "";
          var closeTextField = "\n        >\n        </v-text-field>";
        }
        //COMBINE ALL
        let textField =
          field.type !== "Date"
            ? openTextField +
              textFieldClass +
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
              closeTextField
            : dateComponent;
        return textField;
      });
      return code.join("");
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
        let showDatePicker =
          field.type === "Date"
            ? nextLine +
              space +
              "showDatePicker" +
              (index + 1) +
              " : false" +
              comma
            : "";
        let showPass =
          field.type === "Password"
            ? "\n      showPassOnField" + (index + 1) + " : false" + comma
            : "";
        let fieldValue =
          nextLine + space + field.type === "Date"
            ? "showDatePicker"
            : nextLine +
              space +
              "field" +
              (index + 1) +
              " : " +
              doubleQuotes +
              doubleQuotes +
              comma;
        let data = fieldValue + showDatePicker + showPass;
        return data;
      });
      return (
        code.join("") + passwordRules + emailRules + requiredRules + numberRules
      );
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
