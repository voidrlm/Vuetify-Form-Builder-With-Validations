const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  publicPath:
    process.env.NODE_ENV === "production"
      ? "/Vuetify-Form-Builder-With-Validations/"
      : "/",
  transpileDependencies: ["vuetify"],
});
