<template>
  <div style="width:90%;margin:0 auto;height:500px;overflow-y:scroll">
    <el-page-header @back="goBack" content="公告详情"></el-page-header>
    <h1>{{content.rtitle}}</h1>
    <el-divider></el-divider>
    <article v-html="content.rcontent"></article>
  </div>
</template>

<script>
import { getRelease, getDeleteRelease } from "@/request/api";
import { mapState } from "vuex";
export default {
  name: "viewRelease",
  components: {},
  data() {
    return {};
  },
  created() {
    if (sessionStorage.getItem("store")) {
      this.$store.replaceState(
        Object.assign(
          {},
          this.$store.state,
          JSON.parse(sessionStorage.getItem("store"))
        )
      );
    }
    //在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener("beforeunload", () => {
      sessionStorage.setItem("store", JSON.stringify(this.$store.state));
    });
  },
  computed: {
    ...mapState({
      content: state => state.release.content
    })
  },
  methods: {
    goBack() {
      this.$router.push({ path: "/admin/release" });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
