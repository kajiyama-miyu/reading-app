import Vue from "vue";
import Vuex from "vuex";
import { UPDATE_CURRENT, UPDATE_BOOK, ADD_BOOK } from "../mutation-types";
import firebase from "firebase";

Vue.use(Vuex);

export default new Vuex.Store({
  // strict: true,
  state: {
    drawer: false,
    books: [],
    current: null,
    login_user: null,
  },
  getters: {
    bookCount(state) {
      return state.books.length;
    },

    allBooks(state) {
      return state.books;
    },

    getRangeByPage(state) {
      return (page) => {
        const SIZE = 3;
        return state.books.slice((page - 1) * SIZE, (page - 1) * SIZE + SIZE);
      };
    },
    current(state) {
      return state.current;
    },
    getBookById: (state) => (id) => state.books.find((book) => book.id === id),
    getBookByBookId: (state) => (bookId) =>
      state.books.find((book) => book.bookId === bookId),
    uid: (state) => (state.login_user ? state.login_user.uid : null),
    userName: (state) => (state.login_user ? state.login_user.displayName : ""),
    photoURL: (state) => (state.login_user ? state.login_user.photoURL : ""),
  },
  mutations: {
    setLoginUser(state, user) {
      state.login_user = user;
    },
    deleteLoginUser(state) {
      state.login_user = null;
    },
    toggleSideMenu(state) {
      state.drawer = !state.drawer; //stateのdrawerの値を反転
    },

    [UPDATE_CURRENT](state, payload) {
      state.current = payload;
    },
    [ADD_BOOK](state, { id, payload }) {
      payload.id = id;
      console.log("[AB]payload.id =" + id);
      state.books.push(payload);
    },
    [UPDATE_BOOK](state, { id, payload }) {
      console.log("[ud]id=" + id);
      console.log("UD=" + payload.bookId);
      console.log("UD.id =" + payload.id);
      const index = state.books.findIndex((payload) => payload.id === id);
      state.books[index] = payload;
    },
    deleteBook(state, { id }) {
      const index = state.books.findIndex((payload) => payload.id === id);
      state.books.splice(index, 1);
    },
  },
  actions: {
    setLoginUser({ commit }, user) {
      commit("setLoginUser", user);
    },
    login() {
      const google_auth_provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithRedirect(google_auth_provider);
    },
    logout() {
      firebase.auth().signOut();
    },
    deleteLoginUser({ commit }) {
      commit("deleteLoginUser");
    },
    toggleSideMenu({ commit }) {
      commit("toggleSideMenu");
    },
    [UPDATE_CURRENT]({ commit }, payload) {
      commit(UPDATE_CURRENT, payload);
    },
    [ADD_BOOK]({ getters, commit }, payload) {
      if (getters.uid) {
        // console.log(payload);
        firebase
          .firestore()
          .collection(`users/${getters.uid}/books`)
          .add(payload)
          .then((doc) => {
            commit(ADD_BOOK, { id: doc.id, payload });
          });
      }
    },
    [UPDATE_BOOK]({ getters, commit }, { id, payload }) {
      if (getters.uid) {
        firebase
          .firestore()
          .collection(`users/${getters.uid}/books`)
          .doc(id)
          .update(payload)
          .then(() => {
            commit(UPDATE_BOOK, { id, payload });
          });
      }
    },
    deleteBook({ getters, commit }, { id }) {
      if (getters.uid) {
        firebase
          .firestore()
          .collection(`users/${getters.uid}/books`)
          .doc(id)
          .delete()
          .then(() => {
            commit("deleteBook", { id });
          });
      }
    },
    fetchBooks({ getters, commit }) {
      firebase
        .firestore()
        .collection(`users/${getters.uid}/books`)
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) =>
            commit(ADD_BOOK, { id: doc.id, payload: doc.data() })
          );
        });
    },
  },
});
