<template>
  <main class="px-[20%] py-[5%]">
    <section>
      <div class="title">
        <n-h1 class="text-left">欢迎使用配置中心</n-h1>
        <p class="text-left">这里是配置中心，你可以在这里管理你的项目的配置，包括数据库、缓存、日志、消息队列等等。</p>
      </div>
      <div class="body bg-slate-50 rounded-md">
        <n-scrollbar class="p-5" style="height: 600px">
          <n-collapse default-expanded-names="1" accordion>
            <div class="option-item mb-3" v-for="(item, index) in list" :key="index">
              <n-collapse-item
                class="flex hover:bg-slate-100 p-3 h-full w-full font-blod flex-col justify-center"
                :title="item.zh_CN"
                :name="index"
              >
                <template #header-extra>
                    <div
                      class="point max-w-[200px] w-5 h-5 rounded-full text-white flex justify-center items-center"
                      :class="{ 'bg-green-500': item.value, 'bg-red-500': !item.value }"
                      v-if="item.type === 'bool'"
                    />
                    <div class="array flex gap-1" v-if="item.type === 'array' && item.value.length > 0">
                      <n-tag type="success" v-for="(value, arrayIndex) in item.value" :key="arrayIndex" size="small">
                        {{ value }}
                      </n-tag>
                    </div>
                    <div
                      class="value text-green-700 w-[300px] text-end"
                      v-if="item.type === 'str' || item.type === 'int'"
                    >
                      {{ item.value }}
                    </div>
                </template>
                <div class="value w-full text-end" v-if="item.type === 'array'">
                  <n-input v-model:value="arrayAsString(item).value" size="small" />
                </div>
                <div class="value w-full text-end" v-if="item.type === 'str'">
                  <n-input v-model:value="item.value" size="small" />
                </div>
                <div class="value w-full text-end" v-if="item.type === 'int'">
                  <n-input-number v-model:value="item.value" size="small" :show-button="false" />
                </div>
                <div class="value text-end" v-if="item.type === 'bool'">
                  <n-switch v-model:value="item.value" size="small" />
                </div>
                <div class="description flex justify-between items-center mt-3 text-xs text-right text-gray-500">
                  <p>{{ item.key }}</p>
                  <p class="max-w-[500px] text-left">{{ item.description }}</p>
                </div>
              </n-collapse-item>
            </div>
          </n-collapse>
        </n-scrollbar>
      </div>
    </section>
    <n-space justify="end">
      <n-button class="mt-[10px]" type="success"> 保存一下 </n-button>
    </n-space>
  </main>
</template>

<script setup lang="ts">
import { configList, type ConfigItem } from "@/config/config";
const list = ref<ConfigItem[]>(configList);

const arrayAsString = (item: ConfigItem) => {
  return computed({
    get() {
      // 将数组转换为用逗号分隔的字符串
      return item.value.join(",");
    },
    set(value: string) {
      // 将字符串转换回数组
      item.value = value.split(",").map((item) => item.trim());
    },
  });
};
</script>

<style lang="scss" scoped></style>
