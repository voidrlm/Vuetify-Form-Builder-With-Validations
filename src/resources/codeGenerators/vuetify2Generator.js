// Vuetify 2 code generator

import { indent, validationRules } from './baseTemplates';
import { generateField } from './fieldGenerators';

const generateDataProperties = (fields) => {
  const props = ['valid: true'];

  fields.forEach((field, index) => {
    if (field.type === 'Date') {
      props.push(`date${index + 1}: ''`);
      props.push(`showDatePicker${index + 1}: false`);
    } else if (field.type === 'Checkbox' || field.type === 'Switch') {
      props.push(`field${index + 1}: false`);
    } else if (field.type === 'Select' && field.multiple) {
      props.push(`field${index + 1}: []`);
    } else {
      props.push(`field${index + 1}: ''`);
    }

    if (field.type === 'Password') {
      props.push(`showPassword${index + 1}: false`);
    }

    if (field.type === 'Select') {
      const items = field.items && field.items.length > 0
        ? JSON.stringify(field.items)
        : "['Option 1', 'Option 2', 'Option 3']";
      props.push(`selectItems${index + 1}: ${items}`);
    }
  });

  // Add validation rules
  const hasRequired = fields.some(f => f.required);
  const hasEmail = fields.some(f => f.type === 'E-Mail');
  const hasPassword = fields.some(f => f.type === 'Password');
  const hasNumber = fields.some(f => f.type === 'Number');
  const hasMinDate = fields.some(f => f.minCurrentDay);

  if (hasRequired) {
    props.push(`requiredRules: ${validationRules.required}`);
  }
  if (hasEmail) {
    props.push(`emailRules: ${validationRules.email}`);
  }
  if (hasPassword) {
    props.push(`passwordRules: ${validationRules.password}`);
  }
  if (hasNumber) {
    props.push(`numberRules: ${validationRules.number}`);
  }
  if (hasMinDate) {
    props.push(`currentDay: new Date().toISOString().slice(0, 10)`);
  }

  return props;
};

const generateTemplate = (fields) => {
  const i1 = indent(1);
  const i2 = indent(2);
  const i3 = indent(3);

  const fieldComponents = fields
    .map((field, index) => generateField(field, index, 2, 3))
    .join('\n');

  return `<template>
${i1}<v-form lazy-validation v-model="valid" ref="form">
${i2}<v-container class="text-center">
${fieldComponents}
${i2}</v-container>
${i2}<div class="text-center">
${i3}<v-btn @click="save">Save</v-btn>
${i2}</div>
${i1}</v-form>
</template>`;
};

const generateOptionsApiScript = (fields, useTypeScript) => {
  const dataProps = generateDataProperties(fields);
  const formattedData = dataProps.map(p => `      ${p}`).join(',\n');

  if (useTypeScript) {
    return `<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'FormComponent',
  data() {
    return {
${formattedData},
    };
  },
  methods: {
    save(): void {
      (this.$refs.form as HTMLFormElement).validate();
    },
  },
});
</script>`;
  }

  return `<script>
export default {
  name: 'FormComponent',
  data: () => ({
${formattedData},
  }),
  methods: {
    save() {
      this.$refs.form.validate();
    },
  },
};
</script>`;
};

export const generateVuetify2Code = (fields, options = {}) => {
  const { useTypeScript = false } = options;

  const template = generateTemplate(fields);
  const script = generateOptionsApiScript(fields, useTypeScript);

  return `${template}

${script}`;
};

export default generateVuetify2Code;
