<template>
  <v-card-text>
    <v-layout
      :justify-end="$vuetify.breakpoint.lgAndUp"
      :justify-center="$vuetify.breakpoint.smAndDown"
      class="mr-1 mt-3 mb-3"
    >
      <codeRunner :code="getCodeToRun" />
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
    <v-card class="rounded-xl secondary">
      <pre
        ref="Syntax"
        class="CodeBackground font-weight-bold"
        style="padding: 20px; overflow: auto; border-radius: 10px"
        >{{ fullCode }}</pre
      >
    </v-card>
  </v-card-text>
</template>

<script>
import codeRunner from "./codeRunner.vue";
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
  data: () => ({ dialog: false }),
  components: { codeRunner },
  computed: {
    getCodeToRun() {
      return this.code;
    },
    textFieldCodes() {
      let code = this.code.map(function (field, index) {
        //Reset for code runner
        field.value = "";
        field.showPassOnField = false;
        if (
          field.type == "E-Mail" ||
          field.type == "Date" ||
          field.type == "Password" ||
          field.type == "Checkbox"
        ) {
          field.max = 0;
        }
        if (field.type !== "Date") {
          field.minCurrentDay = false;
        }
        if (field.type !== "Number") {
          field.showDollarPrefix = false;
        }
        //CODE GENERATION
        //COMMON THINGS FOR ALL TEXT FIELD
        var spacingForTextFieldProp =
          field.type === "Date"
            ? doublespace + doublespace + doublespace
            : doublespace + doublespace;
        let required = field.required ? "requiredRules" + comma : "";
        let ruleType =
          field.type == "E-Mail"
            ? "emailRules"
            : field.type == "Password"
            ? "passwordRules"
            : field.type == "Number"
            ? "numberRules"
            : "";
        let textLengthRule =
          (field.type == "Text" || field.type == "Number") && field.max !== 0
            ? (field.type == "Number" ? "," : "") +
              "(v) => !!v && v.length <=" +
              field.max +
              "|| 'Must be less than " +
              field.max +
              " characters',"
            : "";
        var rule =
          field.required || textLengthRule != ""
            ? nextLine +
              spacingForTextFieldProp +
              ":rules=" +
              doubleQuotes +
              "[" +
              required +
              ruleType +
              textLengthRule +
              "]" +
              doubleQuotes
            : "";
        //label
        var label =
          nextLine +
          spacingForTextFieldProp +
          "label=" +
          doubleQuotes +
          field.title +
          doubleQuotes;
        //rouned
        var textFieldClass = field.rounded
          ? nextLine +
            spacingForTextFieldProp +
            "class=" +
            doubleQuotes +
            "rounded-xl" +
            doubleQuotes
          : "";
        //dense
        var denseProp = field.dense
          ? nextLine +
            spacingForTextFieldProp +
            ":dense=" +
            doubleQuotes +
            field.dense +
            doubleQuotes
          : "";
        //outlined
        var outlinedProp = field.outlined
          ? nextLine +
            spacingForTextFieldProp +
            ":outlined=" +
            doubleQuotes +
            field.outlined +
            doubleQuotes
          : "";
        //END OF COMMON THINGS FOR ALL TEXT FIELD
        //Date template
        if (field.type === "Date") {
          let minValue = field.minCurrentDay
            ? " :min=" + doubleQuotes + "currentDay" + doubleQuotes
            : "";
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
            "datePicker" +
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
            (index + 1) +
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
            label +
            textFieldClass +
            denseProp +
            outlinedProp +
            rule +
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
            +(index + 1) +
            doubleQuotes +
            " no-title " +
            "scrollable" +
            minValue +
            ">" +
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
            ">Cancel</v-btn> " +
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
            "datePicker" +
            (index + 1) +
            ".save(date" +
            (index + 1) +
            ")" +
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
        if (field.type === "Checkbox") {
          var checkbox =
            nextLine +
            doublespace +
            doublespace +
            "<v-checkbox" +
            nextLine +
            doublespace +
            doublespace +
            "v-model=" +
            doubleQuotes +
            "field" +
            (index + 1) +
            doubleQuotes +
            rule +
            label +
            denseProp +
            nextLine +
            doublespace +
            doublespace +
            "></v-checkbox>";
        }
        //End of date component
        if (field.type !== "Date") {
          var openTextField = "\n        <v-text-field";
          var prefix = field.showDollarPrefix
            ? "\n        prefix=" + doubleQuotes + "$" + doubleQuotes + ""
            : "";
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
              : nextLine +
                doublespace +
                doublespace +
                "type=" +
                doubleQuotes +
                (field.type === "Number"
                  ? "number"
                  : field.type === "Text"
                  ? "text"
                  : field.type === "E-Mail"
                  ? "email"
                  : "") +
                doubleQuotes;

          var numberVModel = field.type === "Number" ? ".Number" : "";
          var value =
            "\n        v-model" +
            numberVModel +
            "=" +
            doubleQuotes +
            "field" +
            (index + 1) +
            doubleQuotes;
          var counter = field.max ? "\n        counter" : "";

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
          field.type === "Date"
            ? dateComponent
            : field.type === "Checkbox"
            ? checkbox
            : openTextField +
              textFieldClass +
              label +
              prefix +
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
      const currentDayValidationFound = this.code.some(
        (field) => field.minCurrentDay
      );
      let currentDay = currentDayValidationFound
        ? "\n  currentDay : " + "new Date().toISOString().slice(0,10)" + comma
        : "";
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
        let value =
          field.type === "Date"
            ? "date" + (index + 1) + " : " + doubleQuotes + doubleQuotes + comma
            : "field" +
              (index + 1) +
              " : " +
              doubleQuotes +
              doubleQuotes +
              comma;
        let fieldValue = nextLine + space + value;
        let data = fieldValue + showDatePicker + showPass;
        return data;
      });
      return (
        code.join("") +
        passwordRules +
        emailRules +
        requiredRules +
        numberRules +
        currentDay
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
    runCode() {
      console.log("Running code");
    },
  },
};
</script>
<style></style>
