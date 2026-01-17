<template>
  <v-app-bar
    :color="theme.global.current.value.dark ? '#121212' : '#FFFFFF'"
    app
    density="compact"
    flat
  >
    <v-toolbar-title class="font-weight-bold"
      >Vuetify Form Builder</v-toolbar-title
    >

    <v-spacer></v-spacer>
    <v-btn
      icon
      rounded
      class="my-2"
      href="https://twitter.com/voidrlm"
      target="_blank"
    >
      <v-icon size="24px"> mdi-twitter </v-icon>
    </v-btn>
    <v-btn
      icon
      rounded
      class="my-2"
      href="https://github.com/voidrlm/Vuetify-Form-Builder-With-Validations"
      target="_blank"
    >
      <v-icon size="24px"> mdi-github </v-icon>
    </v-btn>
    <v-btn
      icon
      @click="toggleTheme"
      ><v-icon>mdi-theme-light-dark</v-icon></v-btn
    >
  </v-app-bar>
</template>

<script>
import { useTheme } from 'vuetify'

export default {
  setup() {
    const theme = useTheme()
    return { theme }
  },
  data: () => ({}),
  beforeMount() {
    if (localStorage.getItem("darkTheme") !== null) {
      const isDark = JSON.parse(localStorage.getItem("darkTheme"))
      this.theme.global.name.value = isDark ? 'dark' : 'light'
    }
  },
  methods: {
    toggleTheme() {
      this.theme.global.name.value = this.theme.global.current.value.dark ? 'light' : 'dark'
      this.saveSettings('darkMode')
    },
    saveSettings(parameter) {
      if (parameter === "darkMode") {
        localStorage.setItem("darkTheme", this.theme.global.current.value.dark)
      }
    },
  },
}
</script>
