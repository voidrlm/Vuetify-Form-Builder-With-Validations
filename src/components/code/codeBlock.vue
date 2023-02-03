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
import { doubleQuotes, comma, nextLine, space } from "@/resources/textHelpers";
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
            space +
            space +
            space +
            "<v-menu ref=" +
            doubleQuotes +
            "menu" +
            (index + 1) +
            doubleQuotes +
            " v-model=" +
            doubleQuotes +
            "showDatePicker" +
            (index + 1) +
            doubleQuotes +
            nextLine +
            space +
            space +
            space +
            ":close-on-content-click=" +
            doubleQuotes +
            "false" +
            doubleQuotes +
            nextLine +
            space +
            space +
            space +
            ":return-value.sync=" +
            doubleQuotes +
            "date" +
            doubleQuotes +
            nextLine +
            space +
            space +
            space +
            "transition=" +
            doubleQuotes +
            "scale-transition" +
            doubleQuotes +
            nextLine +
            space +
            space +
            space +
            "offset-y" +
            nextLine +
            space +
            space +
            space +
            "min-width=" +
            doubleQuotes +
            "auto" +
            doubleQuotes +
            ">" +
            nextLine +
            space +
            space +
            space +
            space +
            "<template v-slot:activator=" +
            "{ on, attrs }>" +
            nextLine +
            space +
            space +
            space +
            space +
            "<v-text-field" +
            nextLine +
            space +
            space +
            space +
            space +
            "v-model=" +
            doubleQuotes +
            "date" +
            (index + 1) +
            doubleQuotes +
            label +
            textFieldClass +
            nextLine +
            space +
            space +
            space +
            space +
            "prepend-icon=" +
            doubleQuotes +
            "mdi-calendar" +
            doubleQuotes +
            nextLine +
            space +
            space +
            space +
            space +
            "readonly" +
            nextLine +
            space +
            space +
            space +
            space +
            "v-bind=" +
            doubleQuotes +
            "attrs" +
            doubleQuotes +
            "v-on=" +
            doubleQuotes +
            "on" +
            doubleQuotes +
            ">" +
            nextLine +
            space +
            space +
            space +
            space +
            "</v-text-field>" +
            nextLine +
            space +
            space +
            space +
            space +
            "</template>" +
            nextLine +
            space +
            space +
            space +
            space +
            "<v-date-picker  v-model=" +
            doubleQuotes +
            "date" +
            doubleQuotes +
            nextLine +
            space +
            space +
            space +
            space +
            " no-title " +
            nextLine +
            space +
            space +
            space +
            space +
            "scrollable>" +
            nextLine +
            space +
            space +
            space +
            space +
            "<v-spacer/>" +
            nextLine +
            space +
            space +
            space +
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
            doubleQuotes +
            "= false" +
            ">Cancel </v-btn> " +
            nextLine +
            space +
            space +
            space +
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
            ">OK</v-btn>" +
            nextLine +
            space +
            space +
            space +
            space +
            "</v-date-picker>" +
            nextLine +
            space +
            space +
            space +
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
            ? "\n      showDatePicker" + (index + 1) + " : false" + comma
            : "";
        let showPass =
          field.type === "Password"
            ? "\n      showPassOnField" + (index + 1) + " : false" + comma
            : "";
        let fieldValue =
          nextLine + space + field.type === "Date"
            ? "showDatePicker"
            : "field" +
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
