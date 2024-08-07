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
                      v-else-if="
                        item.key === 'COMMAND_SEP' ||
                        item.key === 'COMMAND_START' ||
                        item.key === 'COMMAND_MINECRAFT_BLACKLIST' ||
                        item.key === 'COMMAND_MINECRAFT_WHITELIST'
                      "
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
      <n-button class="mt-[10px]" type="success" @click="getConfigList"> 获取服务端配置 </n-button>
      <n-button class="mt-[10px]" type="success" @click="saveConfig"> 保存一下 </n-button>
    </n-space>
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
        <n-float-button>
          <n-icon :color="debug ? '#00EE00' : '#EE6363'" @click="switchDebug">
            <Bug type="primary" />
          </n-icon>
        </n-float-button>
      </template>
    </n-float-button>
  </main>
</template>

<script setup lang="ts">
import { configList, type ConfigItem } from "@/config/config";
import { getConfig, updateConfig } from "@/apis/config";
import { HamburgerButton, Github, TencentQq, DocumentFolder, Bug } from "@icon-park/vue-next";

const list = ref<ConfigItem[]>(configList);
const perviewList = ref<ConfigItem[]>([]);
const onlyAllowNumber = (value: string) => !value || /^\d+$/.test(value);
const notification = useNotification();
const activeInput = ref<number>(-1);
const debug = ref(localStorage.getItem("debug") === "true" ? true : false);
const addValue = (key: string) => {
  try {
    if (key === "COMMAND_GROUPS" || key === "MESSAGE_GROUPS") {
      perviewList.value.find((item) => item.key === key)?.value.push(0);
    } else {
      perviewList.value.find((item) => item.key === key)?.value.push("");
    }
  } catch (err) {
    console.error(err);
    notification.error({
      content: "添加失败",
      duration: 2000,
      keepAliveOnHover: true,
    });
  }
};

const delValue = (key: string, index: number) => {
  perviewList.value.find((item) => item.key === key)?.value.splice(index, 1);
};

onMounted(() => {
  getConfigList();
});

const toPath = (path: string) => {
  window.open(path, "_blank");
};

const switchDebug = () => {
  debug.value = !debug.value;
  localStorage.setItem("debug", debug.value ? "true" : "false");
  notification.success({
    title: debug.value ? "Debug模式已开启" : "Debug模式已关闭",
    content: "F12查看控制台日志",
    duration: 2000,
    keepAliveOnHover: true,
  });
};

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
  notification.success({
    content: "恢复默认配置成功",
    duration: 2000,
    keepAliveOnHover: true,
  });
};

// 获取配置
const getConfigList = async () => {
  const res = await getConfig();
  if (res.success) {
    if (debug.value) {
      console.log("获取未格式化配置", res.data);
    }
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
    if (debug.value) {
      console.log("获取格式化配置", perviewList.value);
    }
  } else {
    notification.error({
      content: "获取配置失败",
      meta: res.message,
      duration: 2000,
      keepAliveOnHover: true,
    });
  }
};

// 保存配置
const saveConfig = async () => {
  try {
    const dataInfo: Record<string, any> = {};
    perviewList.value.forEach((item: ConfigItem) => {
      // 排除空值
      if (item.value == "" || item.value == null || item.value == undefined) {
        if (debug.value) {
          console.log("空值", { ...item });
        }
        return;
      }
      if (item.type === "int") {
        dataInfo[item.key] = parseInt(item.value);
      } else if (item.type === "array" && (item.key === "COMMAND_GROUPS" || item.key === "MESSAGE_GROUPS")) {
        let arr: number[] = [];
        item.value.forEach((value: string) => {
          if (value == "" || value == null || value == undefined) {
            return;
          }
          arr.push(parseInt(value));
        });
        dataInfo[item.key] = arr;
      } else if (item.type === "array" && item.key === "SUPERUSERS") {
        let arr: string[] = [];
        item.value.forEach((value: string) => {
          if (value == "" || value == null || value == undefined) {
            return;
          }
          arr.push(value);
        });
        dataInfo[item.key] = arr;
      } else if (item.type === "array") {
        let arr: string[] = [];
        item.value.forEach((value: string) => {
          if (value == "" || value == null || value == undefined) {
            return;
          }
          arr.push(value);
        });
        dataInfo[item.key] = arr;
      } else if (item.type === "bool") {
        dataInfo[item.key] = item.value;
      } else {
        if (item.value == "" || item.value == null || item.value == undefined) {
          return;
        }
        dataInfo[item.key] = item.value;
      }
    });
    if (debug.value) {
      console.log("保存配置", dataInfo);
    }
    // return
    const res = await updateConfig(dataInfo);
    if (res.success) {
      notification.success({
        content: "保存成功",
        meta: res.message,
        duration: 2000,
        keepAliveOnHover: true,
      });
      // getConfigList();
    } else {
      notification.error({
        content: "保存失败",
        meta: res.message,
        duration: 2000,
        keepAliveOnHover: true,
      });
    }
  } catch (err) {
    notification.error({
      content: "保存失败",
      meta: "未知错误",
      duration: 2000,
      keepAliveOnHover: true,
    });
  }
};
</script>

<style lang="scss" scoped></style>
