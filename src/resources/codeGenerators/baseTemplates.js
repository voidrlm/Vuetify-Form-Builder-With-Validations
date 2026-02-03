// Shared template fragments and utilities for all Vuetify versions

export const indent = (level) => '  '.repeat(level);

export const formatProps = (props, indentLevel = 0) => {
  const prefix = indent(indentLevel);
  return props
    .filter(p => p !== null && p !== undefined && p !== '')
    .map(p => `${prefix}${p}`)
    .join('\n');
};

// Common validation rules
export const validationRules = {
  required: "(v) => !!v || 'This field is required.'",
  email: "v => /.+@.+\\..+/.test(v) || 'E-mail must be valid'",
  password: "(v) => (v && v.length >= 8) || 'Minimum 8 characters.'",
  number: "(value) => Number.isInteger(Number(value)) || 'Please enter a valid number.'",
  maxLength: (max) => `(v) => !v || v.length <= ${max} || 'Must be less than ${max} characters'`,
};

// Generate rules array string based on field config
export const generateRulesString = (field) => {
  const rules = [];

  if (field.required) {
    rules.push('requiredRules');
  }

  if (field.type === 'E-Mail') {
    rules.push('emailRules');
  } else if (field.type === 'Password') {
    rules.push('passwordRules');
  } else if (field.type === 'Number') {
    rules.push('numberRules');
  }

  if ((field.type === 'Text' || field.type === 'Textarea' || field.type === 'Number') && field.max > 0) {
    rules.push(`(v) => !v || v.length <= ${field.max} || 'Must be less than ${field.max} characters'`);
  }

  return rules.length > 0 ? `[${rules.join(', ')}]` : '[]';
};

// Get field type for HTML input
export const getInputType = (fieldType) => {
  switch (fieldType) {
    case 'Password': return 'password';
    case 'E-Mail': return 'email';
    case 'Number': return 'number';
    default: return 'text';
  }
};

// Capitalize first letter
export const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

// Convert field title to valid variable name
export const toVariableName = (title, index) => {
  if (!title) return `field${index + 1}`;
  return title.replace(/[^a-zA-Z0-9]/g, '').toLowerCase() || `field${index + 1}`;
};

// Common TypeScript interfaces
export const tsInterfaces = {
  formData: `interface FormData {
  [key: string]: string | number | boolean | string[];
}`,
  validationRule: `type ValidationRule = (v: string) => boolean | string;`,
};

// Base form template structure
export const formTemplateStructure = {
  openForm: (version) => {
    if (version === 2) {
      return '<v-form lazy-validation v-model="valid" ref="form">';
    }
    return '<v-form v-model="valid" ref="form" @submit.prevent="save">';
  },
  closeForm: '</v-form>',
  openContainer: (version) => {
    if (version === 2) {
      return '<v-container class="text-center">';
    }
    return '<v-container class="text-center">';
  },
  closeContainer: '</v-container>',
};

// Submit button template
export const submitButton = (version) => {
  if (version === 2) {
    return '<v-btn @click="save">Save</v-btn>';
  }
  return '<v-btn type="submit">Save</v-btn>';
};
