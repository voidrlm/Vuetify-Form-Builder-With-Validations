// Main generator factory - selects appropriate generator based on configuration

import { generateVuetify2Code } from './vuetify2Generator';
import { generateVuetify3Code } from './vuetify3Generator';
import { generateVuetify4Code } from './vuetify4Generator';

/**
 * Configuration options for code generation
 * @typedef {Object} GeneratorConfig
 * @property {2|3|4} vuetifyVersion - Vuetify version (2, 3, or 4)
 * @property {'options'|'composition'} apiStyle - Vue API style (options or composition)
 * @property {boolean} useTypeScript - Whether to generate TypeScript code
 */

/**
 * Default configuration
 */
export const defaultConfig = {
  vuetifyVersion: 2,
  apiStyle: 'options',
  useTypeScript: false,
};

/**
 * Available Vuetify versions
 */
export const vuetifyVersions = [2, 3, 4];

/**
 * API styles available for each version
 */
export const apiStylesForVersion = {
  2: ['options'], // Vuetify 2 with Vue 2 - only Options API
  3: ['options', 'composition'], // Vuetify 3 - both APIs
  4: ['options', 'composition'], // Vuetify 4 - both APIs, composition preferred
};

/**
 * Check if a configuration is valid
 * @param {GeneratorConfig} config
 * @returns {boolean}
 */
export const isValidConfig = (config) => {
  const { vuetifyVersion, apiStyle } = config;

  if (!vuetifyVersions.includes(vuetifyVersion)) {
    return false;
  }

  const availableStyles = apiStylesForVersion[vuetifyVersion];
  if (!availableStyles.includes(apiStyle)) {
    return false;
  }

  return true;
};

/**
 * Main code generator function
 * @param {Array} fields - Form field definitions
 * @param {GeneratorConfig} config - Generator configuration
 * @returns {string} Generated Vue component code
 */
export const generateCode = (fields, config = {}) => {
  const mergedConfig = { ...defaultConfig, ...config };
  const { vuetifyVersion, apiStyle, useTypeScript } = mergedConfig;

  // Normalize fields - ensure each has required properties
  const normalizedFields = fields.map(field => ({
    title: '',
    type: 'Text',
    required: false,
    outlined: false,
    dense: false,
    rounded: false,
    minCurrentDay: false,
    max: 0,
    showPassOnField: false,
    showDollarPrefix: false,
    value: '',
    // New field properties
    rows: 3,
    autoGrow: false,
    items: [],
    multiple: false,
    chips: false,
    radioItems: [],
    inline: false,
    inset: false,
    color: '',
    ...field,
  }));

  const options = { apiStyle, useTypeScript };

  switch (vuetifyVersion) {
    case 2:
      return generateVuetify2Code(normalizedFields, options);
    case 3:
      return generateVuetify3Code(normalizedFields, options);
    case 4:
      return generateVuetify4Code(normalizedFields, options);
    default:
      return generateVuetify2Code(normalizedFields, options);
  }
};

/**
 * Get version-specific information
 * @param {number} version
 * @returns {Object} Version info
 */
export const getVersionInfo = (version) => {
  const info = {
    2: {
      vueVersion: '2.x',
      features: ['Options API', 'v-layout/v-flex (legacy)', 'dense prop'],
      notes: 'Legacy version, use for existing Vue 2 projects',
    },
    3: {
      vueVersion: '3.x',
      features: ['Options API', 'Composition API', 'v-row/v-col', 'density prop'],
      notes: 'Current stable version',
    },
    4: {
      vueVersion: '3.5+',
      features: ['Options API', 'Composition API (preferred)', 'v-date-input', 'Enhanced components'],
      notes: 'Latest version with Vue 3.5+ features',
    },
  };

  return info[version] || info[2];
};

export default generateCode;
