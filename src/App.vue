<template>
  <main class="min-h-screen w-full h-full bg-gray-300">
    <n-notification-provider>
      <home></home>
    </n-notification-provider>
    <n-float-button position="fixed" type="primary" :right="120" :bottom="120" menu-trigger="hover">
      <n-icon>
        <HamburgerButton />
      </n-icon>
      <template #menu>
        <n-float-button>
          <n-icon color="black" @click="toPath('https://github.com/Minecraft-QQBot/BotServer')">
            <Github />
          </n-icon>
        </n-float-button>
        <n-float-button>
          <n-icon color="#88dedc" @click="toPath('https://qm.qq.com/q/4Y9kcrpczK')">
            <TencentQq type="primary" />
          </n-icon>
        </n-float-button>
        <n-float-button>
          <n-icon color="#ff9900" @click="toPath('https://docs-qqbot.ylmty.cc')">
            <DocumentFolder type="primary" />
          </n-icon>
        </n-float-button>
      </template>
    </n-float-button>
  </main>
</template>
<script setup lang="ts">
import { HamburgerButton, Github, TencentQq, DocumentFolder } from "@icon-park/vue-next";

// 获取URL参数
const query = new URLSearchParams(window.location.search);
const token = query.get("token");
if (token) {
  localStorage.setItem("token", token);
}

const toPath = (path: string) => {
  window.open(path, "_blank");
};
</script>
<style scoped lang="scss"></style>
