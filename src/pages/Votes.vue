<template>
  <div>
    <img
      style="width: 400px; margin: 0 auto"
      src="https://media.istockphoto.com/id/1279873006/vector/rubber-stamp-with-text-vote-make-your-voice-heard-vector-textured-grunge-illustration-with.jpg?s=612x612&w=0&k=20&c=8cJtFB6UhkVp6zdKSS_GieR1GLyqy9nFB8JoshWa0BQ="
    />
    <el-form :model="form" :rules="rules" ref="voteForm" label-width="120px">
      <el-form-item label="ID" prop="username">
        <el-input
          v-model="form.username"
          placeholder="Enter your Passport ID"
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

<script>// Adjust the import path based on your project structure
import abi from "/public/contracts/MyToken.sol/Ballot.json";
import { ethers } from "ethers";

export default {
  name: "Votes",
  props: {
    accounts: Array,
    contract: Object,
    provider: Object,
    browserProvider: Object,
  },
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
            message: "Please enter your ID",
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
        const contractAddress = "0x8d7934279e6cD5aD5E47d04814493B6445886b82";
        const contractABI = abi.abi;
        let provider = null;
        if (window.ethereum) {
          provider = new ethers.BrowserProvider(window.ethereum);
        } else {
          console.error("MetaMask is not installed.");
        }

        const signer = provider ? await provider.getSigner() : null;

        console.log(signer);

        const contract = new ethers.Contract(
          contractAddress,
          contractABI,
          provider
        );
        const contractWithSigner = await contract.connect(signer);
        console.log("contract: ", contractWithSigner);
        const tx = await contractWithSigner.vote(0, "123");

        let data = localStorage.getItem("VoteResults");

        alert("Vote submitted successfully!");
      } catch (error) {
        console.error("Error submitting vote:", error);
        alert("Error submitting vote. Please try again.");
      }
    },
  },
};
</script>
