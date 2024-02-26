<template>
  <el-menu
    v-model="active"
    :default-active="active"
    class="el-menu-vertical-demo"
    :collapse="isCollapse"
    @open="handleOpen"
    @close="handleClose"
    @change="handleChange"
  >
    <!--    <el-sub-menu index="1">-->
    <!--      <template #title>-->
    <!--        <el-icon><location /></el-icon>-->
    <!--        <span>Navigator One</span>-->
    <!--      </template>-->
    <!--      <el-menu-item-group>-->
    <!--        <template #title><span>Group One</span></template>-->
    <!--        <el-menu-item index="1-1">item one</el-menu-item>-->
    <!--        <el-menu-item index="1-2">item two</el-menu-item>-->
    <!--      </el-menu-item-group>-->
    <!--      <el-menu-item-group title="Group Two">-->
    <!--        <el-menu-item index="1-3">item three</el-menu-item>-->
    <!--      </el-menu-item-group>-->
    <!--      <el-sub-menu index="1-4">-->
    <!--        <template #title><span>item four</span></template>-->
    <!--        <el-menu-item index="1-4-1">item one</el-menu-item>-->
    <!--      </el-sub-menu>-->
    <!--    </el-sub-menu>-->
    <el-menu-item index="1">
      <router-link :to="{ name: 'vote' }">
        <el-icon>
          <Document />
        </el-icon>
      </router-link>
      <template #title>Vote</template>
    </el-menu-item>
    <el-menu-item index="2">
      <router-link :to="{ name: 'results' }">
        <el-icon>
          <Tickets />
        </el-icon>
      </router-link>
      <template #title>Results</template>
    </el-menu-item>
    <!--    <el-menu-item index="3" disabled>-->
    <!--      <el-icon><document /></el-icon>-->
    <!--      <template #title>Navigator Three</template>-->
    <!--    </el-menu-item>-->
    <!--    <el-menu-item index="4">-->
    <!--      <el-icon><setting /></el-icon>-->
    <!--      <template #title>Navigator Four</template>-->
    <!--    </el-menu-item>-->
  </el-menu>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import { Document, Tickets } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";

const isCollapse = ref(true);
const active = ref("1");
const router = useRouter();
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
const handleChange = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};

watch(
  () => active.value,
  () => {
    switch (active.value) {
      case "1":
        router.push({ name: "results" });
        break;
      case "2":
        router.push({ name: "vote" });
        break;
    }
  }
);
</script>
