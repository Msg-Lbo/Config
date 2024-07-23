<template>
  <main class="px-[10%] py-[5%]">
    <n-table :bordered="true" :single-line="false" striped size="small">
      <thead>
        <tr>
          <th>配置项</th>
          <th>值</th>
          <th class="w-[200px]">备注</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(_item, index) in 20" :key="index">
          <td>配置项{{ index + 1 }}</td>
          <td>Lorem ipsum dolor sit amet.</td>
          <td class="w-[200px]">反常的</td>
        </tr>
      </tbody>
    </n-table>
    <n-space justify="end">
      <n-button class="  mt-[10px]" type="success">
        保存一下
      </n-button>
    </n-space>

  </main>
</template>

<script setup lang='ts'>
</script>

<style lang='scss' scoped></style>