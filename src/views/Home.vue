<template>
  <v-container>
    <v-layout>
      <v-flex xs12 mt-5>
        <v-btn color="teal lighten-3" @click="login">Googleアカウントでログイン</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    methods: {
        ...mapActions(["login"])
    }
}
</script>