<script>
import web3 from "~/composables/web3";
import abi from "/public/contracts/MyToken.sol/Ballot.json";
import { ethers } from "ethers";

export default {
  name: "App",
  data() {
    return {
      contract: null,
      accounts: [],
      candidates: [],
      actions: [],
      provider: null,
      browserProvider: null,
      a: null,
    };
  },
  async created() {
    const contractAddress = "0x8d7934279e6cD5aD5E47d04814493B6445886b82";
    const contractABI = abi.abi;

    const infuraApiKey = "b309ca7c61d74d528f159ca13aedbf90";
    const infuraProjectId = "";
    const infuraProvider = new ethers.JsonRpcProvider(
      `https://sepolia.infura.io/v3/${infuraApiKey}${
        infuraProjectId ? `/${infuraProjectId}` : ""
      }`
    );

    this.provider = infuraProvider;

    this.contract = new ethers.Contract(
      contractAddress,
      contractABI,
      infuraProvider
    );

    const tx = await this.contract.getCandidatesWithVotes();
    // const receipt = await tx.wait();
    this.candidates = tx[0].map((item) => ({
      id: item[0],
      name: item[1],
      voteCount: item[2],
    }));
    console.log(tx[1]);
    this.actions = tx[1].map((item) => ({
      passportID: item[0],
      candidateID: item[1],
    }));
    // this.a = receipt
    //
    // const candidateNames = receipt.events[0].args[0];
    // const voteCounts = receipt.events[0].args[1];

    // console.log(candidateNames, voteCounts, receipt, tx)
  },
};
</script>

<template>
  <el-config-provider namespace="ep">
    <BaseHeader />
    <div class="flex main-container">
      <BaseSide />
      <div w="full" py="4">
        <!--        <Logos my="4" />-->
        <!--        <HelloWorld msg="Hello Vue 3 + Element Plus + Vite" />-->

        <router-view
          :contract="contract"
          :accounts="accounts"
          :provider="provider"
          :candidates="candidates"
          :browser-provider="browserProvider"
        />
      </div>
    </div>
  </el-config-provider>
</template>

<style>
#app {
  text-align: center;
  color: var(--ep-text-color-primary);
}

.main-container {
  height: calc(100vh - var(--ep-menu-item-height) - 3px);
}
</style>
