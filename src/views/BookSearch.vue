<template>
  <div id="search" class="text-center">
    <v-container>
      <v-form :inline="true" ref="keyword">
        <v-text-field
          type="text"
          size="large"
          v-model="keyword"
          label="キーワード"
          :rules="[required]"
        >
          <template v-slot:append-outer>
            <v-btn
              type="PRIMARY"
              @click.prevent="onClick(keyword)"
              color="teal lighten-3"
              >検索</v-btn
            >
          </template>
        </v-text-field>
      </v-form>

      <hr class="hr" />

      <BookInfo
        v-for="(b, i) of books"
        :linkable="true"
        :book="b"
        :index="i + 1"
        :key="b.isbn"
        class="book"
      ></BookInfo>
    </v-container>
  </div>
</template>


<script>
import BookInfo from "../components/BookInfo.vue";

export default {
  name: "book-search",

  components: {
    BookInfo,
  },
  data() {
    return {
      keyword: "",
      books: [],
      required: (value) => !!value || "キーワードを入力してください",
    };
  },
  methods: {
    onClick: function () {
      if (this.$refs.keyword.validate()) {
        this.$http(
          "https://www.googleapis.com/books/v1/volumes?q=" + this.keyword
        )
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            this.books = [];
            for (let b of data.items) {
              let authors = b.volumeInfo.authors;
              let price = b.saleInfo.listPrice;
              let img = b.volumeInfo.imageLinks;
              this.books.push({
                bookId: b.id,
                title: b.volumeInfo.title,
                author: authors ? authors.join(",") : "",
                price: price ? price.amount : "-",
                publisher: b.volumeInfo.publisher ? b.volumeInfo.publisher : "",
                published: b.volumeInfo.publishedDate
                  ? b.volumeInfo.publishedDate
                  : "",
                image: img ? img.smallThumbnail : "",
              });
            }
          });
      }
    },
  },
};
</script>

<style scoped>
#search {
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

.hr {
  margin-top: 30px;
}
</style>