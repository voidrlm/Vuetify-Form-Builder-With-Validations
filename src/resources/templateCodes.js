// Default field structure with all properties
const createDefaultField = (overrides = {}) => ({
  title: "",
  type: "Text",
  required: false,
  outlined: false,
  dense: false,
  rounded: false,
  minCurrentDay: false,
  max: 0,
  showPassOnField: false,
  value: "",
  showDollarPrefix: false,
  // New field properties for Textarea
  rows: 3,
  autoGrow: false,
  // New field properties for Select
  items: [],
  multiple: false,
  chips: false,
  // New field properties for Radio
  radioItems: [],
  inline: false,
  // New field properties for Switch
  inset: false,
  color: "",
  ...overrides,
});

export const blank = [
  createDefaultField(),
];
export const signupForm = [
  createDefaultField({ title: "First Name", type: "Text", required: true }),
  createDefaultField({ title: "Last Name", type: "Text", required: true }),
  createDefaultField({ title: "E-Mail", type: "E-Mail", required: true }),
  createDefaultField({ title: "Password", type: "Password", required: true }),
];
export const signUp2 = [
  createDefaultField({ title: "First Name", type: "Text", required: true, outlined: true, rounded: true }),
  createDefaultField({ title: "Last Name", type: "Text", required: true, outlined: true, rounded: true }),
  createDefaultField({ title: "E-Mail", type: "E-Mail", required: true, outlined: true, rounded: true }),
  createDefaultField({ title: "Password", type: "Password", required: true, outlined: true, rounded: true }),
  createDefaultField({ title: "Street Address", type: "Text", required: true, outlined: true, rounded: true }),
  createDefaultField({ title: "City", type: "Text", required: true, outlined: true, rounded: true }),
  createDefaultField({ title: "State", type: "Text", required: true, outlined: true, rounded: true }),
  createDefaultField({ title: "Zip code", type: "Number", required: true, outlined: true, rounded: true }),
  createDefaultField({ title: "Phone Number", type: "Number", required: false, outlined: true, rounded: true }),
];
export const signin = [
  createDefaultField({ title: "E-Mail", type: "E-Mail", required: true }),
  createDefaultField({ title: "Password", type: "Password", required: true }),
];
export const contactUs = [
  createDefaultField({ title: "First Name", type: "Text", required: true, outlined: true, rounded: true }),
  createDefaultField({ title: "Last Name", type: "Text", required: true, outlined: true, rounded: true }),
  createDefaultField({ title: "E-Mail", type: "E-Mail", required: true, outlined: true, rounded: true }),
  createDefaultField({ title: "Company Name", type: "Text", required: false, outlined: true, rounded: true }),
  createDefaultField({ title: "How did you hear about us?", type: "Select", required: false, outlined: true, rounded: true, items: ["Google", "Social Media", "Friend", "Other"] }),
  createDefaultField({ title: "Comments", type: "Textarea", required: false, outlined: true, rounded: true, rows: 4 }),
];
export const sales = [
  createDefaultField({ title: "Sale Date", type: "Date", required: false, minCurrentDay: true, showDatePicker: false }),
  createDefaultField({ title: "Category", type: "Select", required: true, items: ["Electronics", "Clothing", "Food", "Other"] }),
  createDefaultField({ title: "Products", type: "Text", required: true }),
  createDefaultField({ title: "Units Sold", type: "Number", required: true }),
  createDefaultField({ title: "Profit", type: "Number", required: true, showDollarPrefix: true }),
];
