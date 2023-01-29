<template>
  <v-app>
    <v-main>
      <app-bar />
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import appBar from "./components/navigation/appBar";
export default {
  name: "App",
  components: {
    appBar,
  },
  data: () => ({
    //
  }),
  mounted() {
    if (this.$route.path !== "/dashboard") {
      this.$router.push({
        path: "/dashboard",
      });
    }
  },
};
</script>
