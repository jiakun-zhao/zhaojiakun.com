<script lang="ts" setup>
import DefaultLayout from '~/layouts/DefaultLayout.vue'
import Navigation from '~/components/Navigation.vue'
</script>

<template>
  <DefaultLayout :head="{ title: '404', description: 'Not found.' }">
    <template #article>
      <p max-w-lg>
        <span>没有找到页面：</span>
        <Navigation :is-index="true" />
      </p>
    </template>
  </DefaultLayout>
</template>
