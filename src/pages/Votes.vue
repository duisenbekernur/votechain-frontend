<template>
  <div>
    <el-form :model="form" :rules="rules" ref="voteForm" label-width="120px">
      <el-form-item label="Username" prop="username">
        <el-input
          v-model="form.username"
          placeholder="Enter your username"
        ></el-input>
      </el-form-item>

      <el-form-item label="Vote" prop="vote">
        <el-select v-model="form.vote" placeholder="Select candidate">
          <el-option
            v-for="candidate in candidates"
            :key="candidate.id"
            :label="candidate.name"
            :value="candidate.id"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm">Submit</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import web3 from "~/composables/web3";

export default {
  name: "Votes",
  data() {
    return {
      form: {
        username: "",
        vote: null,
      },
      rules: {
        username: [
          {
            required: true,
            message: "Please enter your username",
            trigger: "blur",
          },
        ],
        vote: [
          {
            required: true,
            message: "Please select a candidate",
            trigger: "change",
          },
        ],
      },
      candidates: [
        { id: 1, name: "Nursultan Nazarbayev" }, // First President of Kazakhstan
        { id: 2, name: "Abay Qunanbayuli" }, // Poet, writer, and philosopher
        { id: 3, name: "Mukhtar Auezov" }, // Writer and literary figure
        { id: 4, name: "Aisulu Alimbekova" }, // Opera singer
        { id: 5, name: "Olzhas Suleimenov" }, // Poet, writer, and politician
        { id: 6, name: "Dinmukhamed Kunayev" }, // Former First Secretary of the Communist Party of Kazakhstan
        { id: 7, name: "Shokan Ualikhanov" }, // Historian, ethnographer, and geographer
        { id: 8, name: "Dariga Nazarbayeva" }, // Kazakh politician and Chairwoman of the Senate of Kazakhstan
        { id: 9, name: "Kairat Nurdauletov" }, // Professional boxer
        { id: 10, name: "Dimash Kudaibergen" }, // World-renowned singer and winner of "The Singer" competition
      ],
    };
  },
  methods: {
    async submitForm() {
      try {
        const accounts = await web3.eth.getAccounts();

        // Your smart contract ABI and address
        const contractAddress = "0xYourContractAddress";
        const contractABI = "YourContractABI";

        const contract = new web3.eth.Contract(contractABI, contractAddress);

        // Example: Calling a vote function on your smart contract
        await contract.methods.vote(this.form.vote).send({
          from: accounts[0],
        });

        // You can handle success, show a message, or trigger other events
        this.$message.success("Vote submitted successfully!");
      } catch (error) {
        // Handle errors, display a message, or log to the console
        console.error("Error submitting vote:", error);
        this.$message.error("Error submitting vote. Please try again.");
      }
    },
  },
};
</script>