<template>
  <v-menu offset-y :close-on-content-click="false" :nudge-width="200">
    <template v-slot:activator="{ on, attrs }">
      <v-chip
        v-bind="attrs"
        v-on="on"
        class="ml-2 mr-n2 font-weight-bold"
        :class="$vuetify.theme.dark ? 'white--text' : 'black--text'"
        :color="$vuetify.theme.dark ? 'grey darken-3' : 'accent'"
      >
        <v-avatar class="mr-2">
          <img
            src="https://avatars.githubusercontent.com/u/117543015?s=400&u=f884d6fe7910410f3e86aa0ce922777dbc2d51fc&v=4"
          />
        </v-avatar>
        Voidrlm <v-icon right size="20"> mdi-chevron-down </v-icon>
      </v-chip>
    </template>
    <v-list>
      <v-list-item>
        <v-list-item-avatar>
          <img
            src="https://avatars.githubusercontent.com/u/117543015?s=400&u=f884d6fe7910410f3e86aa0ce922777dbc2d51fc&v=4"
          />
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>Voidrlm</v-list-item-title>
          <v-list-item-subtitle>Logged in</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-divider></v-divider>
    <v-list dense>
      <v-list-item-title class="text-center subtitle-2 mt-2"
        >Settings</v-list-item-title
      >
      <v-list-item>
        <v-list-item-title>Dark mode</v-list-item-title>
        <v-list-item-action>
          <v-switch
            v-model="$vuetify.theme.dark"
            inset
            dense
            class="font-weight-bold mt-5"
            color="white"
            @change="saveSettings('darkMode')"
          ></v-switch
        ></v-list-item-action>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  data: () => ({}),

  methods: {
    saveSettings(parameter) {
      if (parameter === "darkMode") {
        localStorage.setItem("darkTheme", this.$vuetify.theme.dark);
      }
    },
  },
};
</script>
