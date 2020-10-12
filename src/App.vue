<template>
  <v-app>
    <v-app-bar app color="teal lighten-3" dark>
      <v-app-bar-nav-icon @click.stop="toggleSideMenu"></v-app-bar-nav-icon>
      <v-toolbar-title>Reading Recorder</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items v-if="$store.state.login_user">
        <v-btn text @click="logout">ログアウト</v-btn>
      </v-toolbar-items>
    </v-app-bar>

    <SideNav />
    <v-content>
      <v-container fluid fill-height align-start>
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>


<script>
import SideNav from "./components/SideNav";
import { mapActions } from "vuex";
import firebase from "firebase";

export default {
  name: "App",

  components: {
    SideNav,
  },

  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setLoginUser(user);
        if (this.$router.currentRoute.name === "home") {
          this.fetchBooks();
          this.$router.push({ name: "books" }, () => {});
        }
      } else {
        this.deleteLoginUser();
        this.$router.push({ name: "home" }, () => {});
      }
    });
  },

  data: () => ({
    //
  }),

  methods: {
    ...mapActions([
      "toggleSideMenu",
      "setLoginUser",
      "logout",
      "deleteLoginUser",
      "fetchBooks",
    ]),
  },
};
</script>


<style scoped>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-appearance: none;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
