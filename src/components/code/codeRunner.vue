<template>
  <v-dialog v-model="dialog" width="500">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        elevation="0"
        rounded
        color="accent"
        class="mr-2"
        v-bind="attrs"
        v-on="on"
        :class="$vuetify.theme.dark ? 'white--text' : 'black--text'"
      >
        <v-icon size="25px" class="mr-2">mdi-play</v-icon>Test
      </v-btn>
    </template>
    <v-card class="rounded-lg pa-5">
      <v-card-title class="justify-center align-center">Form</v-card-title>
      <v-form lazy-validation v-model="valid" ref="form">
        <v-container class="text-center" fluid>
          <div v-for="(textfield, index) in code" :key="index">
            <div v-if="textfield.type !== 'Date'">
              <v-text-field
                :hint="
                  textfield.type === 'Password' ? 'At least 8 characters' : ''
                "
                :append-icon="
                  textfield.type === 'Password' && textfield.showPassOnField
                    ? 'mdi-eye'
                    : textfield.type === 'Password' &&
                      !textfield.showPassOnField
                    ? 'mdi-eye-off'
                    : ''
                "
                :label="textfield.title"
                :dense="textfield.dense"
                :outlined="textfield.outlined"
                :class="textfield.rounded ? 'rounded-xl' : ''"
                :counter="textfield.type === 'Text' && textfield.max !== 0"
                :maxlength="
                  textfield.type === 'Text' && textfield.max !== 0
                    ? textfield.max
                    : ''
                "
                v-model="textfield.value"
                :rules="generateRules(textfield.required, textfield.type)"
                :type="
                  (textfield.type === 'Password' &&
                    textfield.showPassOnField) ||
                  textfield.type === 'Text'
                    ? 'text'
                    : !textfield.showPassOnField &&
                      textfield.type === 'Password'
                    ? 'password'
                    : textfield.type === 'E-Mail'
                    ? 'email'
                    : ''
                "
                @click:append="
                  textfield.showPassOnField = !textfield.showPassOnField
                "
              ></v-text-field>
            </div>
            <div v-if="textfield.type === 'Date'">
              <v-menu
                ref="datePicker"
                v-model="textfield.showDatePicker"
                :close-on-content-click="false"
                :return-value.sync="textfield.value"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="textfield.value"
                    :rules="textfield.required ? [requiredRules] : []"
                    :label="textfield.title"
                    :dense="textfield.dense"
                    :outlined="textfield.outlined"
                    :class="textfield.rounded ? 'rounded-xl' : ''"
                    prepend-inner-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  >
                  </v-text-field>
                </template>
                <v-date-picker
                  v-model="textfield.value"
                  no-title
                  scrollable
                  :min="textfield.minCurrentDay ? currentDay : ''"
                >
                  <v-spacer />
                  <v-btn
                    text
                    color="primary"
                    @click="textfield.showDatePicker = false"
                    >Cancel</v-btn
                  >
                  <v-btn
                    text
                    color="primary"
                    @click="$refs.datePicker[index].save(textfield.value)"
                    >OK</v-btn
                  >
                </v-date-picker>
              </v-menu>
            </div>
          </div></v-container
        ></v-form
      >
      <v-card-actions class="justify-center align-center">
        <v-btn @click="save">Save</v-btn>
      </v-card-actions></v-card
    >
  </v-dialog>
</template>

<script>
export default {
  props: { code: Array },
  data: () => ({
    dialog: false,
    valid: true,
    requiredRules: (v) => !!v || "This field is required.",
    numberRules: (value) =>
      Number.isInteger(Number(value)) || "Please enter a valid number.",
    passwordRules: (v) => (v && v.length >= 8) || "Minimum 8 characters.",
    emailRules: (v) => /.+@.+..+/.test(v) || "E-mail must be valid",
    currentDay: new Date().toISOString().slice(0, 10),
  }),
  computed: {},

  methods: {
    generateRules(required, type) {
      let rules = [];
      if (required) {
        rules.push(this.requiredRules);
      }
      if (type !== "Text") {
        let ruleToAdd =
          type === "Number"
            ? this.numberRules
            : type === "E-Mail"
            ? this.emailRules
            : type === "Password"
            ? this.passwordRules
            : "";
        rules.push(ruleToAdd);
      }
      return rules;
    },
    save() {
      if (this.$refs.form.validate()) {
        alert("All Fields Are Valid");
      }
    },
  },
};
</script>
<style></style>