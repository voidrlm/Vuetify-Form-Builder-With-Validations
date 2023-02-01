export const template = [
  "<template> \n  <v-form lazy-validation v-model=" +
    "valid" +
    " ref=" +
    "form" +
    ">\n    <v-container class=" +
    "text-center" +
    ">",
  "\n    </v-container>\n    <v-btn @click=" +
    "save" +
    ">Save</v-btn> \n    </v-form>\n</template>",
];

export const script = ["\n<script>\n  export default {", "\n  }\n</script>"];
export const data = ["\n  data: () => ({\n  valid: true,", "\n  }),"];
export const methods = [
  "\n  methods: {\n    save () {\n    this.$refs.form.validate();\n    }, },",
];
