<template>
  <v-dialog v-model="dialog" width="500" content-class="rounded-xl">
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
    <v-card class="rounded-lg pa-2" style="overflow-x: hidden">
      <v-row class="pa-3">
        <v-card-title class="justify-center align-center">Form</v-card-title
        ><v-spacer /><v-btn class="mt-3 mr-2" icon @click="dialog = false"
          ><v-icon>mdi-close-circle</v-icon></v-btn
        ></v-row
      >

      <v-form lazy-validation v-model="valid" ref="form">
        <v-container class="text-center" fluid>
          <div v-for="(textfield, index) in code" :key="index">
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
            <div v-else-if="textfield.type === 'Checkbox'">
              <v-checkbox
                v-model="textfield.value"
                :label="textfield.title"
                :rules="generateRules(textfield.required, textfield.type)"
                :dense="textfield.dense"
                :outlined="textfield.outlined"
              ></v-checkbox>
            </div>
            <div v-else>
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
                :prefix="textfield.showDollarPrefix ? '$' : ''"
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
          </div>
        </v-container>
      </v-form>

      <v-card-actions class="justify-center align-center ma-2">
        <v-btn @click="save">Save</v-btn>
      </v-card-actions></v-card
    >
  </v-dialog>
</template>

<script>
export default {
  props: { code: Array },
  data: () => ({
    checkbox1: 0,
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
      if (type !== "Text" && type !== "Checkbox") {
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
