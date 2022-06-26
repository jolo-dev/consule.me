<template>
  <h1 text-center>Consule.me</h1>
  <div grid grid-cols-12 gap-5 p-5 h-screen>
    <NuxtLayout name="sidebar" />
    <NuxtLayout name="base">
      <Dashboard />
    </NuxtLayout>
  </div>
</template>
