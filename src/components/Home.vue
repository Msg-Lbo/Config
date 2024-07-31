<template>
  <main class="px-[20%] py-[5%]" @click.stop="activeInput = -1">
    <section class="w-full">
      <div class="title">
        <n-h1 class="text-left">欢迎使用配置中心</n-h1>
      </div>
      <div class="body bg-slate-50 rounded-md">
        <n-scrollbar class="p-5" style="height: 600px">
          <n-collapse default-expanded-names="1" accordion>
            <div class="option-item mb-3" v-for="(item, index) in perviewList" :key="index">
              <n-collapse-item
                class="flex hover:bg-slate-100 p-3 h-full w-full font-blod flex-col justify-center"
                :title="item.zh_CN"
                :name="index"
              >
              <!--  -->
                <template #header-extra>
                  <!-- 布尔类型 点击切换开关 -->
                  <section
                    class="point max-w-[200px] w-5 h-5 rounded-full text-white flex justify-center items-center duration-300 ease-in-out"
                    :class="{ 'bg-green-500': item.value, 'bg-red-500': !item.value }"
                    v-if="item.type === 'bool'"
                    @click.stop="item.value = !item.value"
                  ></section>
                  <!-- 数组类型 tag标签 -->
                  <section class="array flex gap-1" v-if="item.type === 'array' && item.value.length > 0">
                    <n-tag type="success" v-for="(value, arrayIndex) in item.value" :key="arrayIndex" size="small">
                      {{ value }}
                    </n-tag>
                  </section>
                  <!-- 字符串类型 文字显示对应颜色 -->
                  <section
                    class="value text-green-700 w-[300px] text-end"
                    v-if="item.type === 'str' && item.key.includes('COLOR')"
                    @click.stop="activeInput = index"
                  >
                    <span v-if="activeInput !== index" :style="{ color: item.value }">
                      {{ item.value }}
                    </span>
                    <n-input
                      v-else
                      class="flex-1"
                      @focusout.stop="activeInput = -1"
                      v-model:value="item.value"
                      size="small"
                    />
                  </section>
                  <!-- 字符串类型 非颜色显示 -->
                  <section
                    class="value text-green-700 w-[300px] text-end"
                    v-if="item.type === 'str' && !item.key.includes('COLOR')"
                    @click.stop="activeInput = index"
                  >
                    <span v-if="activeInput !== index">
                      {{ item.value }}
                    </span>
                    <n-input
                      v-else
                      class="flex-1"
                      @focusout.stop="activeInput = -1"
                      v-model:value="item.value"
                      size="small"
                    />
                  </section>
                  <!-- 整数类型 -->
                  <section
                    class="value text-green-700 w-[300px] text-end"
                    v-if="item.type === 'int'"
                    @click.stop="activeInput = index"
                  >
                    <span v-if="activeInput !== index && !item.key.includes('COLOR')">
                      {{ item.value }}
                    </span>
                    <n-input-number
                      v-else
                      class="flex-1"
                      @focusout.stop="activeInput = -1"
                      v-model:value="item.value"
                      size="small"
                      :show-button="false"
                    />
                  </section>
                </template>
                <!-- 数组类型 如果不是'启用的指令' -->
                <div class="value w-full text-end" v-if="item.type === 'array' && item.key !== 'COMMAND_ENABLED'">
                  <n-button style="margin-left: 10px" type="success" size="small" @click="addValue(item.key)">
                    增加
                  </n-button>
                  <div
                    class="flex items-center justify-between gap-2 mt-3"
                    v-for="(_value, arrayIndex) in item.value"
                    :key="arrayIndex"
                  >
                    <n-input-number
                      v-if="item.key === 'COMMAND_GROUPS' || item.key === 'MESSAGE_GROUPS'"
                      class="flex-1"
                      v-model:value="item.value[arrayIndex]"
                      size="small"
                      :show-button="false"
                    />
                    <n-input
                      v-else
                      type="text"
                      :allow-input="onlyAllowNumber"
                      class="flex-1"
                      v-model:value="item.value[arrayIndex]"
                      size="small"
                    />
                    <n-button
                      style="margin-left: 10px"
                      type="warning"
                      ghost
                      size="small"
                      @click="delValue(item.key, arrayIndex)"
                      >删除
                    </n-button>
                  </div>
                </div>
                <!-- 数组类型 如果是'启用的指令' -->
                <div class="value w-full text-end" v-if="item.type === 'array' && item.key === 'COMMAND_ENABLED'">
                  <n-checkbox-group v-model:value="item.value">
                    <n-space>
                      <n-checkbox
                        v-for="(commandValue, commandIndex) in item.options"
                        :value="commandValue"
                        :key="commandIndex"
                        >{{ commandValue }}
                      </n-checkbox>
                    </n-space>
                  </n-checkbox-group>
                </div>
                <!-- 颜色类型 -->
                <div class="value w-full text-end" v-if="item.type === 'str' && item.key.includes('COLOR')">
                  <n-form-item>
                    <n-input v-model:value="item.value" size="small" />
                    <n-color-picker
                      class="w-[100px] ml-[10px]"
                      size="small"
                      :modes="['hex']"
                      v-model:value="item.value"
                    />
                  </n-form-item>
                </div>
                <!-- 其他类型 -->
                <div class="value w-full text-end" v-if="item.type === 'str' && !item.key.includes('COLOR')">
                  <n-input v-model:value="item.value" size="small" />
                </div>
                <!-- 整数类型 -->
                <div class="value w-full text-end" v-if="item.type === 'int'">
                  <n-input-number v-model:value="item.value" size="small" :show-button="false" />
                </div>
                <!-- 描述信息 -->
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
      <n-button class="mt-[10px]" type="warning" @click="handleDefault"> 恢复默认 </n-button>
      <n-button class="mt-[10px]" type="success" @click="saveConfig"> 保存一下 </n-button>
    </n-space>
  </main>
</template>

<script setup lang="ts">
import { configList, type ConfigItem } from "@/config/config";
import { getConfig, updateConfig } from "@/apis/config";

const list = ref<ConfigItem[]>(configList);
const perviewList = ref<ConfigItem[]>([]);
const onlyAllowNumber = (value: string) => !value || /^\d+$/.test(value);
const message = useMessage();
const activeInput = ref<number>(-1);
const addValue = (key: string) => {
  if (key === "COMMAND_GROUPS" || key === "MESSAGE_GROUPS") {
    perviewList.value.find((item) => item.key === key)?.value.push(0);
  } else {
    perviewList.value.find((item) => item.key === key)?.value.push("");
  }
};

const delValue = (key: string, index: number) => {
  perviewList.value.find((item) => item.key === key)?.value.splice(index, 1);
};

onMounted(() => {
  getConfigList();
});

// 恢复默认配置
const handleDefault = () => {
  perviewList.value = [];
  activeInput.value = -1;
  perviewList.value = list.value.map((item) => {
    return {
      ...item,
      value: item.value,
    };
  });
  message.success("恢复默认配置成功");
};

// 获取配置
const getConfigList = async () => {
  const res = await getConfig();
  if (res.success) {
    // 将res.data转换为ConfigItem[]
    let netConfigList: ConfigItem[] = [];
    for (const key in res.data) {
      const item = configList.find((i) => i.key === key);
      if (item) {
        let obj = {
          ...item,
          value: res.data[key],
        };
        netConfigList.push(obj);
      }
    }
    perviewList.value = netConfigList;
  } else {
    message.error("获取配置失败");
  }
};

// 保存配置
const saveConfig = async () => {
  try {
    const dataInfo: Record<string, any> = {};
    perviewList.value.forEach((item: ConfigItem) => {
      if (item.type === "int") {
        dataInfo[item.key] = parseInt(item.value);
      } else if (item.type === "array" && (item.key === "COMMAND_GROUPS" || item.key === "MESSAGE_GROUPS")) {
        let arr: number[] = [];
        item.value.forEach((value: string) => {
          arr.push(parseInt(value));
        });
        dataInfo[item.key] = arr;
      } else if (item.type === "array" && item.key === "SUPERUSERS") {
        let arr: string[] = [];
        item.value.forEach((value: string) => {
          arr.push(value);
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
