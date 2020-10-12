<template>
  <div id="form">
    <div class="text-center">
      <BookInfo :book="book" class="book"></BookInfo>
      <hr />
    </div>
    <v-form ref="form" :model="form" label-width="120px" class="date">
      読了日
      <v-text-field v-model="form.read" single-line :rules="[required_date]">
        <template v-slot:append-outer>
          <date-picker v-model="form.read"></date-picker>
        </template>
      </v-text-field>
      感想
      <v-textarea
        outlined
        type="textarea"
        size="large"
        v-model="form.memo"
        props="memo"
        :rules="[required_memo]"
      ></v-textarea>

      <div class="text-center">
        <v-btn @click="onSubmit" color="teal lighten-3">登録</v-btn>

        <template v-if="getBookByBookId(book.bookId)">
          <v-btn
            @click="deleteConfirm(book.id)"
            color="amber lighten-2"
            class="delete"
            >削除</v-btn
          >
          <!-- イベントの名前をstoreと同じにするとクリックした時点で処理されちゃうからmethod内で処理を加えたい場合は違う名前にする。 -->
        </template>
      </div>
    </v-form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import BookInfo from "../components/BookInfo.vue";
import { UPDATE_BOOK, UPDATE_CURRENT, ADD_BOOK } from "@/mutation-types";
import DatePicker from "../components/DatePicker.vue";

export default {
  name: "book-form",

  components: {
    BookInfo,
    DatePicker,
  },
  data() {
    return {
      book: {},
      form: {
        read: null,
        memo: "",
      },
      required_date: (value) => !!value || "読了日を入力してください",
      required_memo: (value) => !!value || "感想を入力してください",
    };
  },
  computed: {
    ...mapGetters(["current", "getBookById", "getBookByBookId"]),
  },
  created() {
    console.log("current =" + this.current);
    if (!this.current) {
      this.$router.push("/books");
    }
    this.book = Object.assign({}, this.current);
  },
  mounted() {
    this.$nextTick(() => {
      const bookId = this.getBookByBookId(this.book.bookId);
      //元々本についてたIdからそのIdの本がstoreに保存されてたらformの内容を上書きする

      if (bookId) {
        this.form.read = bookId.read;
        this.form.memo = bookId.memo;
      }
    });
  },
  methods: {
    onSubmit() {
      if (this.$refs.form.validate()) {
        if (this.getBookByBookId(this.book.bookId)) {
          const book = this.getBookByBookId(this.book.bookId);
          // firestoreに保存されてる本自体に付けられてるidを引数に本を取ってくる
          //その本が保存される時に付けられたidを元にその本の情報をUPDATEする。
          //Google Bookから取ってくる時に登録されてる本に元々Idが付けられてるから、単純にIdでUpdateしようとすると違うIdとして二重にfirestoreに保存されるから
          console.log("bookId =" + book.id);
          console.log("this.book =" + this.book.id);
          this[UPDATE_BOOK]({
            id: book.id,
            payload: Object.assign({}, book, this.form),
          });
        } else {
          console.log("AB.object=" + Object.assign({}, this.book, this.form));
          this[ADD_BOOK](Object.assign({}, this.book, this.form));
        }
        this[UPDATE_CURRENT](null);
        this.form.read = null;
        this.form.memo = "";
        this.$router.push("/books");
      }
    },

    deleteConfirm(id) {
      if (confirm("削除してもよろしいですか")) {
        // console.log("id =" + { id });
        this.deleteBook({ id });
        this.$router.push({ name: "books" });
      }
    },

    ...mapActions([UPDATE_BOOK, UPDATE_CURRENT, ADD_BOOK, "deleteBook"]),
  },
};
</script>


<style scoped>
#form {
  margin-top: 15px;
  margin-bottom: 15px;
  margin-left: auto;
  margin-right: auto;
  width: 780px;
  text-align: left;
  -webkit-appearance: none;
}
.date {
  margin-top: 20px;
}
.book {
  margin-top: 20px;
  margin-bottom: 20px;
}

.delete {
  margin-left: 10px;
}
</style>



