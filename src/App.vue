<template>
  <main class="w-screen h-screen bg-gray-300">
    <n-message-provider>
      <home></home>
    </n-message-provider>
  </main>
</template>
<script setup lang="ts">
// 获取URL参数
const query = new URLSearchParams(window.location.search);
const token = query.get("token");
if (token) {
  localStorage.setItem("token", token);
}
</script>
<style scoped lang="scss"></style>
