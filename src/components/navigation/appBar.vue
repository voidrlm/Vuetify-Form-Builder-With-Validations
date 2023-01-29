<template>
  <v-app-bar
    :color="$vuetify.theme.dark ? '#121212' : '#FFFFFF'"
    app
    dense
    flat
  >
    <v-spacer></v-spacer>
    <span
      @click="showClock = true"
      v-if="$vuetify.breakpoint.mdAndUp"
      class="subtitle-1"
      style="cursor: pointer"
      >{{ dateTime.hours }}:{{ dateTime.minutes }}{{ " "
      }}{{ dateTime.ampm }}</span
    >
    <appBarMenu />
    <div v-if="showClock">
      <clockDialog
        :showClock="showClock"
        :dateTime="dateTime"
        @hideClock="showClock = false"
      />
    </div>
  </v-app-bar>
</template>

<script>
import clockDialog from "../clock/clockDialog.vue";
import appBarMenu from "./appBarMenu.vue";
export default {
  components: {
    appBarMenu,
    clockDialog,
  },
  data: () => ({
    showClock: false,
    dateTime: {
      hours: "--",
      minutes: "--",
      ampm: "",
    },
    timer: undefined,
  }),
  beforeMount() {
    if (localStorage.getItem("darkTheme") !== null) {
      this.$vuetify.theme.dark = JSON.parse(localStorage.getItem("darkTheme"));
    }
    if (localStorage.getItem("lightAccent")) {
      this.$vuetify.theme.themes.light.accent =
        localStorage.getItem("lightAccent");
    }
    if (localStorage.getItem("darkAccent")) {
      this.$vuetify.theme.themes.dark.accent =
        localStorage.getItem("darkAccent");
    }
    this.timer = setInterval(this.setDateTime, 1000);
  },
  beforeUnmount() {
    clearInterval(this.timer);
  },
  methods: {
    setDateTime() {
      const date = new Date();
      this.dateTime = {
        hours: date.getHours() % 12,
        minutes: (date.getMinutes() < 10 ? "0" : "") + date.getMinutes(),
        ampm: date.getHours() >= 12 ? "PM" : "AM",
        date: new Date().toDateString(),
      };
    },
  },
};
</script>
