// Vuetify 3 code generator

import { indent, validationRules } from './baseTemplates';
import { generateField } from './fieldGenerators';

const generateDataProperties = (fields) => {
  const props = [];

  fields.forEach((field, index) => {
    if (field.type === 'Date') {
      props.push({ name: `date${index + 1}`, value: "''", type: 'string' });
      props.push({ name: `showDatePicker${index + 1}`, value: 'false', type: 'boolean' });
    } else if (field.type === 'Checkbox' || field.type === 'Switch') {
      props.push({ name: `field${index + 1}`, value: 'false', type: 'boolean' });
    } else if (field.type === 'Select' && field.multiple) {
      props.push({ name: `field${index + 1}`, value: '[]', type: 'string[]' });
    } else {
      props.push({ name: `field${index + 1}`, value: "''", type: 'string' });
    }

    if (field.type === 'Password') {
      props.push({ name: `showPassword${index + 1}`, value: 'false', type: 'boolean' });
    }

    if (field.type === 'Select') {
      const items = field.items && field.items.length > 0
        ? JSON.stringify(field.items)
        : "['Option 1', 'Option 2', 'Option 3']";
      props.push({ name: `selectItems${index + 1}`, value: items, type: 'string[]' });
    }
  });

  return props;
};

const getValidationRules = (fields) => {
  const rules = {};
  const hasRequired = fields.some(f => f.required);
  const hasEmail = fields.some(f => f.type === 'E-Mail');
  const hasPassword = fields.some(f => f.type === 'Password');
  const hasNumber = fields.some(f => f.type === 'Number');
  const hasMinDate = fields.some(f => f.minCurrentDay);

  if (hasRequired) rules.requiredRules = validationRules.required;
  if (hasEmail) rules.emailRules = validationRules.email;
  if (hasPassword) rules.passwordRules = validationRules.password;
  if (hasNumber) rules.numberRules = validationRules.number;
  if (hasMinDate) rules.currentDay = "new Date().toISOString().slice(0, 10)";

  return rules;
};

const generateTemplate = (fields) => {
  const i1 = indent(1);
  const i2 = indent(2);
  const i3 = indent(3);

  const fieldComponents = fields
    .map((field, index) => generateField(field, index, 3, 3))
    .join('\n');

  return `<template>
${i1}<v-form v-model="valid" ref="form" @submit.prevent="save">
${i2}<v-container class="text-center">
${fieldComponents}
${i2}</v-container>
${i2}<div class="text-center">
${i3}<v-btn type="submit">Save</v-btn>
${i2}</div>
${i1}</v-form>
</template>`;
};

// Options API for Vuetify 3
const generateOptionsApiScript = (fields, useTypeScript) => {
  const dataProps = generateDataProperties(fields);
  const rules = getValidationRules(fields);

  const dataEntries = [
    'valid: true',
    ...dataProps.map(p => `${p.name}: ${p.value}`),
    ...Object.entries(rules).map(([key, value]) => `${key}: ${value}`),
  ];

  const formattedData = dataEntries.map(p => `      ${p}`).join(',\n');

  if (useTypeScript) {
    return `<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'FormComponent',
  data() {
    return {
${formattedData},
    };
  },
  methods: {
    async save(): Promise<void> {
      const { valid } = await (this.$refs.form as any).validate();
      if (valid) {
        console.log('Form is valid');
      }
    },
  },
});
</script>`;
  }

  return `<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'FormComponent',
  data() {
    return {
${formattedData},
    };
  },
  methods: {
    async save() {
      const { valid } = await this.$refs.form.validate();
      if (valid) {
        console.log('Form is valid');
      }
    },
  },
});
</script>`;
};

// Composition API with script setup
const generateCompositionApiScript = (fields, useTypeScript) => {
  const dataProps = generateDataProperties(fields);
  const rules = getValidationRules(fields);

  if (useTypeScript) {
    const refDeclarations = [
      "const form = ref<InstanceType<typeof VForm> | null>(null);",
      "const valid = ref<boolean>(true);",
      ...dataProps.map(p => `const ${p.name} = ref<${p.type}>(${p.value});`),
    ];

    const ruleDeclarations = Object.entries(rules)
      .map(([key, value]) => {
        if (key === 'currentDay') {
          return `const ${key} = ${value};`;
        }
        return `const ${key} = ${value};`;
      });

    return `<script setup lang="ts">
import { ref } from 'vue';
import type { VForm } from 'vuetify/components';

${refDeclarations.join('\n')}

${ruleDeclarations.join('\n')}

const save = async (): Promise<void> => {
  if (form.value) {
    const { valid: isValid } = await form.value.validate();
    if (isValid) {
      console.log('Form is valid');
    }
  }
};
</script>`;
  }

  const refDeclarations = [
    "const form = ref(null);",
    "const valid = ref(true);",
    ...dataProps.map(p => `const ${p.name} = ref(${p.value});`),
  ];

  const ruleDeclarations = Object.entries(rules)
    .map(([key, value]) => {
      if (key === 'currentDay') {
        return `const ${key} = ${value};`;
      }
      return `const ${key} = ${value};`;
    });

  return `<script setup>
import { ref } from 'vue';

${refDeclarations.join('\n')}

${ruleDeclarations.join('\n')}

const save = async () => {
  if (form.value) {
    const { valid: isValid } = await form.value.validate();
    if (isValid) {
      console.log('Form is valid');
    }
  }
};
</script>`;
};

export const generateVuetify3Code = (fields, options = {}) => {
  const { apiStyle = 'composition', useTypeScript = false } = options;

  const template = generateTemplate(fields);

  let script;
  if (apiStyle === 'composition') {
    script = generateCompositionApiScript(fields, useTypeScript);
  } else {
    script = generateOptionsApiScript(fields, useTypeScript);
  }

  return `${template}

${script}`;
};

export default generateVuetify3Code;
