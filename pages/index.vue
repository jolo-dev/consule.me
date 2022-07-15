<script>
import 'uno.css'
</script>
<template>
  <h1 text-center>consule.me</h1>
  <div grid grid-cols-12 gap-3 h-screen>
    <NuxtLayout name="sidebar" />
    <NuxtLayout name="base">
      <Dashboard />
    </NuxtLayout>
  </div>
</template>
