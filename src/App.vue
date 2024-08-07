<template>
  <main class="min-h-screen w-full h-full bg-gray-300">
    <n-notification-provider>
      <home></home>
      
    </n-notification-provider>
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
