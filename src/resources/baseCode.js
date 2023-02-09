export const template = [
  "<template> \n  <v-form lazy-validation v-model=" +
    doubleQuotes +
    "valid" +
    doubleQuotes +
    " ref=" +
    "form" +
    ">\n    <v-container class=" +
    doubleQuotes +
    "text-center" +
    doubleQuotes +
    ">",
  "\n    </v-container>" +
    nextLine +
    doublespace +
    "<div class=" +
    doubleQuotes +
    "text-center" +
    doubleQuotes +
    ">" +
    nextLine +
    doublespace +
    "   <v-btn @click=" +
    doubleQuotes +
    "save" +
    doubleQuotes +
    ">Save</v-btn>" +
    nextLine +
    doublespace +
    "</div>" +
    nextLine +
    space +
    "</v-form>\n</template>",
];

export const script = [
  "\n<script>\n  export default {\n  name: " +
    doubleQuotes +
    "form-component" +
    doubleQuotes +
    ",",
  "\n  }\n</script>",
];
export const data = ["\n  data: () => ({\n  valid: true,", "\n  }),"];
export const methods = [
  "\n  methods: {\n    save () {\n    this.$refs.form.validate();\n    }, },",
];

import { doubleQuotes, nextLine, doublespace, space } from "./textHelpers";
