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
            <!-- Date Field -->
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

            <!-- Checkbox Field -->
            <div v-else-if="textfield.type === 'Checkbox'">
              <v-checkbox
                v-model="textfield.value"
                :label="textfield.title"
                :rules="generateRules(textfield.required, textfield.type)"
                :dense="textfield.dense"
              ></v-checkbox>
            </div>

            <!-- Textarea Field -->
            <div v-else-if="textfield.type === 'Textarea'">
              <v-textarea
                v-model="textfield.value"
                :label="textfield.title"
                :rules="generateRules(textfield.required, textfield.type)"
                :dense="textfield.dense"
                :outlined="textfield.outlined"
                :class="textfield.rounded ? 'rounded-xl' : ''"
                :rows="textfield.rows || 3"
                :auto-grow="textfield.autoGrow"
                :counter="textfield.max > 0"
                :maxlength="textfield.max > 0 ? textfield.max : undefined"
              ></v-textarea>
            </div>

            <!-- Select Field -->
            <div v-else-if="textfield.type === 'Select'">
              <v-select
                v-model="textfield.value"
                :label="textfield.title"
                :items="getSelectItems(textfield)"
                :rules="generateRules(textfield.required, textfield.type)"
                :dense="textfield.dense"
                :outlined="textfield.outlined"
                :class="textfield.rounded ? 'rounded-xl' : ''"
                :multiple="textfield.multiple"
                :chips="textfield.chips"
              ></v-select>
            </div>

            <!-- Radio Field -->
            <div v-else-if="textfield.type === 'Radio'">
              <v-radio-group
                v-model="textfield.value"
                :rules="generateRules(textfield.required, textfield.type)"
                :dense="textfield.dense"
                :row="textfield.inline"
                :label="textfield.title"
              >
                <v-radio
                  v-for="(item, radioIndex) in getRadioItems(textfield)"
                  :key="radioIndex"
                  :label="item"
                  :value="item"
                ></v-radio>
              </v-radio-group>
            </div>

            <!-- Switch Field -->
            <div v-else-if="textfield.type === 'Switch'">
              <v-switch
                v-model="textfield.value"
                :label="textfield.title"
                :dense="textfield.dense"
                :inset="textfield.inset"
                :color="textfield.color || 'primary'"
              ></v-switch>
            </div>

            <!-- Default Text/Number/Email/Password Fields -->
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
                :counter="(textfield.type === 'Text' || textfield.type === 'Number') && textfield.max > 0"
                :maxlength="
                  (textfield.type === 'Text' || textfield.type === 'Number') && textfield.max > 0
                    ? textfield.max
                    : undefined
                "
                :prefix="textfield.showDollarPrefix ? '$' : ''"
                v-model="textfield.value"
                :rules="generateRules(textfield.required, textfield.type)"
                :type="getFieldType(textfield)"
                @click:append="
                  textfield.showPassOnField = !textfield.showPassOnField
                "
              ></v-text-field>
            </div>
          </div>
          <div class="text-center">
            <v-btn @click="save">Save</v-btn>
          </div>
        </v-container>
      </v-form>
    </v-card>
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
      if (type === "Number") {
        rules.push(this.numberRules);
      } else if (type === "E-Mail") {
        rules.push(this.emailRules);
      } else if (type === "Password") {
        rules.push(this.passwordRules);
      }
      return rules;
    },
    getFieldType(textfield) {
      if (textfield.type === "Password") {
        return textfield.showPassOnField ? "text" : "password";
      }
      if (textfield.type === "E-Mail") {
        return "email";
      }
      if (textfield.type === "Number") {
        return "number";
      }
      return "text";
    },
    getSelectItems(textfield) {
      if (textfield.items && textfield.items.length > 0) {
        return textfield.items;
      }
      return ["Option 1", "Option 2", "Option 3"];
    },
    getRadioItems(textfield) {
      if (textfield.radioItems && textfield.radioItems.length > 0) {
        return textfield.radioItems;
      }
      return ["Option 1", "Option 2"];
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
