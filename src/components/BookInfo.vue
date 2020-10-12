 <template>
  <div class="clearfix" :class="{ linkable }" @click="onclick">
    <div class="image">
      <img :src="book.image" />
    </div>
    <div class="details">
      <ul>
        <li v-if="index">{{ index }}.</li>
        <li>{{ book.title }} （{{ book.price }}円）</li>
        <li>{{ book.author }} 著</li>
        <li>{{ book.publisher }} /刊</li>
        <li>{{ book.published }} /発売</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { UPDATE_CURRENT } from "@/mutation-types";

export default {
  name: "book-info",

  props: {
    index: { type: Number }, //プロパティの値の型を制限する(String, Number, Boolean, Objectなど)
    linkable: { type: Boolean, default: false }, //defaulは値がしてされなかった場合の既定値。(そのほかには、required(プロパティが必要かどうか)やvalidator(カスタムの検証関数)がある)
    book: { type: Object },
  },

  methods: {
    ...mapActions([UPDATE_CURRENT]),

    onclick() {
      if (this.linkable) {
        this[UPDATE_CURRENT](this.book);
        this.$router.push({ name: "form" });
      }
    },
  },
};
</script>

<style scoped>
.linkable:hover {
  cursor: pointer;
  background-color: #ff9;
}

ul li {
  list-style: none;
}
</style>