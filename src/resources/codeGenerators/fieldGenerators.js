// Field-specific code generation for all field types

import { indent, generateRulesString, getInputType } from './baseTemplates';

// Generate common props for text-like fields
const generateCommonProps = (field, index, version, indentLevel = 4) => {
  const i = indent(indentLevel);
  const props = [];

  props.push(`${i}v-model="field${index + 1}"`);
  props.push(`${i}label="${field.title || ''}"`);

  if (field.rounded) {
    props.push(`${i}class="rounded-xl"`);
  }

  // Dense prop differs between versions
  if (field.dense) {
    if (version === 2) {
      props.push(`${i}dense`);
    } else {
      props.push(`${i}density="compact"`);
    }
  }

  if (field.outlined) {
    if (version === 2) {
      props.push(`${i}outlined`);
    } else {
      props.push(`${i}variant="outlined"`);
    }
  }

  const rules = generateRulesString(field, version);
  if (rules !== '[]') {
    props.push(`${i}:rules="${rules}"`);
  }

  return props;
};

// Text field generator
export const generateTextField = (field, index, version, indentLevel = 3) => {
  const i = indent(indentLevel);
  const propIndent = indentLevel + 1;
  const pi = indent(propIndent);

  const props = generateCommonProps(field, index, version, propIndent);

  // Add type
  props.splice(2, 0, `${pi}type="${getInputType(field.type)}"`);

  // Number-specific
  if (field.type === 'Number') {
    props[0] = `${pi}v-model.number="field${index + 1}"`;
    if (field.showDollarPrefix) {
      props.push(`${pi}prefix="$"`);
    }
  }

  // Counter for max length
  if (field.max > 0 && (field.type === 'Text' || field.type === 'Number')) {
    props.push(`${pi}counter`);
    props.push(`${pi}:maxlength="${field.max}"`);
  }

  return `${i}<v-text-field\n${props.join('\n')}\n${i}/>`;
};

// Password field generator
export const generatePasswordField = (field, index, version, indentLevel = 3) => {
  const i = indent(indentLevel);
  const pi = indent(indentLevel + 1);

  const props = generateCommonProps(field, index, version, indentLevel + 1);

  props.push(`${pi}:type="showPassword${index + 1} ? 'text' : 'password'"`);
  props.push(`${pi}:append-icon="showPassword${index + 1} ? 'mdi-eye' : 'mdi-eye-off'"`);
  props.push(`${pi}@click:append="showPassword${index + 1} = !showPassword${index + 1}"`);
  props.push(`${pi}hint="At least 8 characters"`);

  return `${i}<v-text-field\n${props.join('\n')}\n${i}/>`;
};

// Email field generator
export const generateEmailField = (field, index, version, indentLevel = 3) => {
  const i = indent(indentLevel);
  const pi = indent(indentLevel + 1);

  const props = generateCommonProps(field, index, version, indentLevel + 1);
  props.splice(2, 0, `${pi}type="email"`);

  return `${i}<v-text-field\n${props.join('\n')}\n${i}/>`;
};

// Date field generator - Vuetify 2
export const generateDateFieldV2 = (field, index, indentLevel = 3) => {
  const i = indent(indentLevel);
  const i1 = indent(indentLevel + 1);
  const i2 = indent(indentLevel + 2);
  const i3 = indent(indentLevel + 3);

  const minProp = field.minCurrentDay ? `\n${i2}:min="currentDay"` : '';

  const textFieldProps = [];
  textFieldProps.push(`${i3}v-model="date${index + 1}"`);
  textFieldProps.push(`${i3}label="${field.title || ''}"`);
  if (field.rounded) textFieldProps.push(`${i3}class="rounded-xl"`);
  if (field.dense) textFieldProps.push(`${i3}dense`);
  if (field.outlined) textFieldProps.push(`${i3}outlined`);
  if (field.required) textFieldProps.push(`${i3}:rules="[requiredRules]"`);
  textFieldProps.push(`${i3}readonly`);
  textFieldProps.push(`${i3}v-bind="attrs"`);
  textFieldProps.push(`${i3}v-on="on"`);

  return `${i}<v-menu
${i1}ref="datePicker${index + 1}"
${i1}v-model="showDatePicker${index + 1}"
${i1}:close-on-content-click="false"
${i1}:return-value.sync="date${index + 1}"
${i1}transition="scale-transition"
${i1}offset-y
${i1}min-width="auto"
${i}>
${i1}<template v-slot:activator="{ on, attrs }">
${i2}<v-text-field
${textFieldProps.join('\n')}
${i2}/>
${i1}</template>
${i1}<v-date-picker
${i2}v-model="date${index + 1}"
${i2}no-title
${i2}scrollable${minProp}
${i1}>
${i2}<v-spacer/>
${i2}<v-btn text color="primary" @click="showDatePicker${index + 1} = false">Cancel</v-btn>
${i2}<v-btn text color="primary" @click="$refs.datePicker${index + 1}.save(date${index + 1})">OK</v-btn>
${i1}</v-date-picker>
${i}</v-menu>`;
};

// Date field generator - Vuetify 3/4
export const generateDateFieldV3 = (field, index, version, indentLevel = 3) => {
  const i = indent(indentLevel);
  const pi = indent(indentLevel + 1);

  // Vuetify 3+ uses v-date-input or a menu approach
  const props = [];
  props.push(`${pi}v-model="date${index + 1}"`);
  props.push(`${pi}label="${field.title || ''}"`);
  if (field.rounded) props.push(`${pi}class="rounded-xl"`);
  if (field.dense) props.push(`${pi}density="compact"`);
  if (field.outlined) props.push(`${pi}variant="outlined"`);
  if (field.required) props.push(`${pi}:rules="[requiredRules]"`);
  if (field.minCurrentDay) props.push(`${pi}:min="currentDay"`);

  // For Vuetify 4, prefer v-date-input
  if (version === 4) {
    return `${i}<v-date-input
${props.join('\n')}
${i}/>`;
  }

  // Vuetify 3 - use menu approach similar to v2 but with updated syntax
  const i1 = indent(indentLevel + 1);
  const i2 = indent(indentLevel + 2);
  const i3 = indent(indentLevel + 3);

  const minProp = field.minCurrentDay ? `\n${i2}:min="currentDay"` : '';

  const textFieldProps = [];
  textFieldProps.push(`${i3}v-model="date${index + 1}"`);
  textFieldProps.push(`${i3}label="${field.title || ''}"`);
  if (field.rounded) textFieldProps.push(`${i3}class="rounded-xl"`);
  if (field.dense) textFieldProps.push(`${i3}density="compact"`);
  if (field.outlined) textFieldProps.push(`${i3}variant="outlined"`);
  if (field.required) textFieldProps.push(`${i3}:rules="[requiredRules]"`);
  textFieldProps.push(`${i3}readonly`);

  return `${i}<v-menu
${i1}v-model="showDatePicker${index + 1}"
${i1}:close-on-content-click="false"
${i}>
${i1}<template v-slot:activator="{ props }">
${i2}<v-text-field
${textFieldProps.join('\n')}
${i3}v-bind="props"
${i2}/>
${i1}</template>
${i1}<v-date-picker
${i2}v-model="date${index + 1}"${minProp}
${i2}@update:model-value="showDatePicker${index + 1} = false"
${i1}/>
${i}</v-menu>`;
};

// Checkbox field generator
export const generateCheckboxField = (field, index, version, indentLevel = 3) => {
  const i = indent(indentLevel);
  const pi = indent(indentLevel + 1);

  const props = [];
  props.push(`${pi}v-model="field${index + 1}"`);
  props.push(`${pi}label="${field.title || ''}"`);

  if (field.dense) {
    if (version === 2) {
      props.push(`${pi}dense`);
    } else {
      props.push(`${pi}density="compact"`);
    }
  }

  if (field.required) {
    props.push(`${pi}:rules="[requiredRules]"`);
  }

  return `${i}<v-checkbox\n${props.join('\n')}\n${i}/>`;
};

// Textarea field generator
export const generateTextareaField = (field, index, version, indentLevel = 3) => {
  const i = indent(indentLevel);
  const pi = indent(indentLevel + 1);

  const props = generateCommonProps(field, index, version, indentLevel + 1);

  if (field.rows) {
    props.push(`${pi}:rows="${field.rows}"`);
  }
  if (field.autoGrow) {
    props.push(`${pi}auto-grow`);
  }
  if (field.max > 0) {
    props.push(`${pi}counter`);
    props.push(`${pi}:maxlength="${field.max}"`);
  }

  return `${i}<v-textarea\n${props.join('\n')}\n${i}/>`;
};

// Select field generator
export const generateSelectField = (field, index, version, indentLevel = 3) => {
  const i = indent(indentLevel);
  const pi = indent(indentLevel + 1);

  const props = [];
  props.push(`${pi}v-model="field${index + 1}"`);
  props.push(`${pi}label="${field.title || ''}"`);
  props.push(`${pi}:items="selectItems${index + 1}"`);

  if (field.rounded) {
    props.push(`${pi}class="rounded-xl"`);
  }

  if (field.dense) {
    if (version === 2) {
      props.push(`${pi}dense`);
    } else {
      props.push(`${pi}density="compact"`);
    }
  }

  if (field.outlined) {
    if (version === 2) {
      props.push(`${pi}outlined`);
    } else {
      props.push(`${pi}variant="outlined"`);
    }
  }

  if (field.multiple) {
    props.push(`${pi}multiple`);
  }
  if (field.chips) {
    props.push(`${pi}chips`);
  }

  if (field.required) {
    props.push(`${pi}:rules="[requiredRules]"`);
  }

  return `${i}<v-select\n${props.join('\n')}\n${i}/>`;
};

// Radio group field generator
export const generateRadioField = (field, index, version, indentLevel = 3) => {
  const i = indent(indentLevel);
  const pi = indent(indentLevel + 1);

  const props = [];
  props.push(`${pi}v-model="field${index + 1}"`);

  if (field.dense) {
    if (version === 2) {
      props.push(`${pi}dense`);
    } else {
      props.push(`${pi}density="compact"`);
    }
  }

  if (field.inline) {
    if (version === 2) {
      props.push(`${pi}row`);
    } else {
      props.push(`${pi}inline`);
    }
  }

  if (field.required) {
    props.push(`${pi}:rules="[requiredRules]"`);
  }

  const radioButtons = (field.radioItems || ['Option 1', 'Option 2'])
    .map(item => `${indent(indentLevel + 1)}<v-radio label="${item}" value="${item}"/>`)
    .join('\n');

  return `${i}<v-radio-group\n${props.join('\n')}\n${pi}label="${field.title || ''}"\n${i}>\n${radioButtons}\n${i}</v-radio-group>`;
};

// Switch field generator
export const generateSwitchField = (field, index, version, indentLevel = 3) => {
  const i = indent(indentLevel);
  const pi = indent(indentLevel + 1);

  const props = [];
  props.push(`${pi}v-model="field${index + 1}"`);
  props.push(`${pi}label="${field.title || ''}"`);

  if (field.dense) {
    if (version === 2) {
      props.push(`${pi}dense`);
    } else {
      props.push(`${pi}density="compact"`);
    }
  }

  if (field.inset) {
    props.push(`${pi}inset`);
  }

  if (field.color) {
    props.push(`${pi}color="${field.color}"`);
  }

  return `${i}<v-switch\n${props.join('\n')}\n${i}/>`;
};

// Main field generator dispatcher
export const generateField = (field, index, version, indentLevel = 3) => {
  switch (field.type) {
    case 'Text':
    case 'Number':
      return generateTextField(field, index, version, indentLevel);
    case 'Password':
      return generatePasswordField(field, index, version, indentLevel);
    case 'E-Mail':
      return generateEmailField(field, index, version, indentLevel);
    case 'Date':
      if (version === 2) {
        return generateDateFieldV2(field, index, indentLevel);
      }
      return generateDateFieldV3(field, index, version, indentLevel);
    case 'Checkbox':
      return generateCheckboxField(field, index, version, indentLevel);
    case 'Textarea':
      return generateTextareaField(field, index, version, indentLevel);
    case 'Select':
      return generateSelectField(field, index, version, indentLevel);
    case 'Radio':
      return generateRadioField(field, index, version, indentLevel);
    case 'Switch':
      return generateSwitchField(field, index, version, indentLevel);
    default:
      return generateTextField(field, index, version, indentLevel);
  }
};
