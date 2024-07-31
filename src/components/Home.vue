<template>
  <main class="px-[20%] py-[5%]" @click.stop="activeInput = -1">
    <section class="w-full">
      <div class="title">
        <n-h1 class="text-left">欢迎使用配置中心</n-h1>
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
                    @click.stop="activeInput = index"
                  >
                    <span v-if="activeInput !== index || item.key.includes('COLOR')" :style="{ color: item.value }">
                      {{ item.value }}</span
                    >
                    <n-input
                      v-else
                      class="flex-1"
                      @focusout.stop="activeInput = -1"
                      v-model:value="item.value"
                      size="small"
                    />
                  </div>
                </template>
                <div class="value w-full text-end" v-if="item.type === 'array'">
                  <n-button style="margin-left: 10px" type="success" size="small" @click="addValue(item.key)">
                    增加
                  </n-button>
                  <div
                    class="flex items-center justify-between gap-2 mt-3"
                    v-for="(_value, arrayIndex) in item.value"
                    :key="arrayIndex"
                  >
                    <n-input class="flex-1" v-model:value="item.value[arrayIndex]" size="small" />
                    <n-button
                      style="margin-left: 10px"
                      type="warning"
                      ghost
                      size="small"
                      @click="delValue(item.key, arrayIndex)"
                      >删除</n-button
                    >
                  </div>
                </div>

                <div class="value w-full text-end" v-if="item.type === 'str' && item.key.includes('COLOR')">
                  <n-form-item>
                    <n-input v-model:value="item.value" size="small" />
                    <n-color-picker class="w-[100px] ml-[10px]" size="small" :modes="['hex']" v-model:value="item.value" />
                  </n-form-item>
                </div>
                <div class="value w-full text-end" v-if="item.type === 'str' && !item.key.includes('COLOR')">
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
                  <p class="max-w-[300px] text-left">{{ item.description }}</p>
                </div>
              </n-collapse-item>
            </div>
          </n-collapse>
        </n-scrollbar>
      </div>
    </section>
    <n-space justify="end">
      <n-button class="mt-[10px]" type="success" @click="saveConfig"> 保存一下 </n-button>
    </n-space>
  </main>
</template>

<script setup lang="ts">
import { configList, type ConfigItem } from "@/config/config";
import { getConfig, updateConfig } from "@/apis/config";

const list = ref<ConfigItem[]>(configList);
const message = useMessage();
const activeInput = ref<number>(-1);
const addValue = (key: string) => {
  list.value.find((item) => item.key === key)?.value.push("") as Array<string>;
};

const delValue = (key: string, index: number) => {
  list.value.find((item) => item.key === key)?.value.splice(index, 1);
};

onMounted(() => {
  getConfigList();
});

// 获取配置
const getConfigList = async () => {
  const res = await getConfig();
  if (res.success) {
    // 将res.data转换为ConfigItem[]
    let netConfigList: ConfigItem[] = [];
    Object.entries(res.data).map(([key, value]) => {
      // 使用key找到对应的配置项
      const configItem = list.value.find((item) => item.key === key);
      if (configItem) {
        if (configItem.type === "int") {
          configItem.value = parseInt(value as any);
        }
        configItem.value = value;
        netConfigList.push(configItem);
      }
    });
    list.value = netConfigList;
  } else {
    message.error("获取配置失败");
  }
};

// 保存配置
const saveConfig = async () => {
  try {
    const dataInfo: Record<string, any> = {};
    list.value.forEach((item: ConfigItem) => {
      if (item.type === "int") {
        dataInfo[item.key] = parseInt(item.value);
      } else if (item.type === "array" && (item.key === "COMMAND_GROUPS" || item.key === "MESSAGE_GROUPS")) {
        let arr: number[] = [];
        item.value.forEach((value: string) => {
          arr.push(parseInt(value));
        });
        dataInfo[item.key] = arr;
      } else {
        dataInfo[item.key] = item.value;
      }
    });
    console.log("提交的数据:", dataInfo);
    // return
    const res = await updateConfig(dataInfo);
    if (res.success) {
      message.success("保存成功");
      // getConfigList();
    } else {
      message.error("保存失败");
    }
  } catch (err) {
    console.log(err);
  }
};
</script>

<style lang="scss" scoped></style>
