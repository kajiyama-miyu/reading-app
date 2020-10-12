<template>
  <v-navigation-drawer v-model="$store.state.drawer" absolute temporary>
    <v-list>
      <v-list-item>
        <v-list-item-avatar>
          <v-img v-if="photoURL" :src="photoURL"> </v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{ userName }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>

      <v-list>
        <template v-for="(item, index) in items">
          <v-list-item
            v-if="!item.lists"
            :to="item.link"
            :key="index"
            @click="menu_close"
          >
            <v-list-item-icon>
              <v-icon>
                {{ item.icon }}
              </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>
                {{ item.title }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <!-- <template>
          <v-list-item :key="support">
            <v-list-item-icon>
              <v-icon>mdi-menu</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Support</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
        <v-list-group :key="support">
          <v-list-item-group>
            <template>
              <v-list-item href="https://wings.msn.to/">
                <v-list-item-content>
                  <v-list-item-title>Author</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item href="https://www.sbcr.jp/">
                <v-list-item-content>
                  <v-list-item-title>Publisher</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-list-item-group>
        </v-list-group> -->

          <v-list-group
            v-else
            no-action
            :prepend-icon="item.icon"
            :key="index"
            v-model="item.active"
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>
                  {{ item.title }}
                </v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item
              v-for="list in item.lists"
              :key="list.content"
              @click="goToLink(list.link)"
            >
              <v-list-item-content>
                <v-list-item-title>
                  {{ list.content }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
        </template>
      </v-list>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      items: [
        { title: "Home", icon: "mdi-home", link: { name: "books" } },
        { title: "Search", icon: "mdi-magnify", link: { name: "search" } },
        {
          title: "Support",
          icon: "mdi-menu",
          active: false,
          lists: [
            { content: "Author", link: "author" },
            { content: "Publisher", link: "publisher" },
          ],
        },
      ],
    };
  },
  methods: {
    menu_close() {
      this.items.forEach((item) => (item.active = false));
    },
    goToLink(link) {
      if (link === "author") {
        location.href = "https://wings.msn.to/";
        window.open(location.href, "_blank");
      } else if (link === "publisher") {
        location.href = "https://www.sbcr.jp/";
        window.open(location.href, "_blank");
      }
    },
  },

  computed: {
    ...mapGetters(["userName", "photoURL"]),
  },
};
</script>