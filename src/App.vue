<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <router-view />
  </div>
</template>

<script>
import {mapActions} from "vuex"
  export default{

  methods: {
    ...mapActions(["FETCH_MENULIST"]),

  },
    mounted () {
      // this.FETCH_MENULIST()
      // this.$store.dispatch('FETCH_MENULIST')
    }
  }
</script>
