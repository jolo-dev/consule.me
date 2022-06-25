<template>
  <h1 text-center>Consule.me</h1>
  <div grid grid-cols-6 gap-5 p-5 h-screen>
    <NuxtLayout name="sidebar">
      <DragObject />
    </NuxtLayout>
    <NuxtLayout name="base">
      <Dashboard />
    </NuxtLayout>
  </div>
</template>
