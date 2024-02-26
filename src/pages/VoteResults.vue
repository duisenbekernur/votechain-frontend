<template>
  <div style="padding: 10px 25px">
    <el-table :data="candidates || []" border>
        <el-table-column prop="id" label="ID" sortable />
        <el-table-column prop="name" label="Candidate" sortable />
        <el-table-column prop="voteCount" label="Votes" sortable />
    </el-table>
  </div>
</template>

<script>
export default {
  name: "VoteResults",
    props: {
      candidates: Array
    },
  data() {
    return {
      results: [],
    };
  },
  mounted() {
    let results = localStorage.getItem("VoteResults");

    if (!results) {
      localStorage.setItem("VoteResults", []);
      results = [];
    } else {
      results = JSON.parse(results);
    }

    console.log("VoteResults", results);

    this.results = results;
  },
};
</script>

<style scoped></style>
