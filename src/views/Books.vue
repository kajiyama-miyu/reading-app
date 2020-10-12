<template>
  <div id="list" class="text-center">
    <p>{{ bookCount }}件の読書情報が記録されています</p>

    <v-container text-xs-center justify-center>
      <BookInfo
        v-for="(b, i) of allBooks"
        :linkable="true"
        :book="b"
        :index="i + 1"
        :key="b.id"
      >
      </BookInfo>
    </v-container>

    <!-- <div class="text-center">
      <v-pagination v-model="page" :length="length" @input="onChange">
      </v-pagination>
    </div> -->
  </div>
</template>

<script>
// @ is an alias to /src
import BookInfo from "@/components/BookInfo.vue";
import { mapGetters } from "vuex";

export default {
  name: "books",

  data() {
    return {
      page: 1,
      books: [],
      length: 0,
    };
  },
  components: {
    BookInfo,
  },

  computed: {
    ...mapGetters(["bookCount", "getRangeByPage", "allBooks"]),
  },

  // methods: {
  //   onChange(page) {
  //     this.books = this.getRangeByPage(page);
  //     // console.log("onChange.this.book=" + this.books);
  //     console.log("this.getPage =" + this.getRangeByPage(page));
  //   },
  // },
  // created() {
  //   this.books = this.$store.state.books;
  // },
  // mounted() {
  //   this.books = this.$store.state.books;
  //   this.books = this.getRangeByPage(1);
  //   this.length = Math.ceil(this.bookCount / 3);
  // },
};
</script>

<style scoped>
#list {
  margin-top: 15px;
  margin-bottom: 15px;
  margin-left: auto;
  margin-right: auto;
  width: 780px;
  text-align: left;
  -webkit-appearance: none;
}
.book {
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>