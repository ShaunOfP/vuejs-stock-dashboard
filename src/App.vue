<template>
  <BaseCard>
    <h2 style="color: white;">Titel 1</h2>
    <p style="color: white;">Inhalt für die erste Karte.</p>
  </BaseCard>
</template>

<script>
import BaseCard from './components/BaseCard.vue';

export default {
  name: 'App',
  components: {
    BaseCard
  }
}
</script>

<style>
body {
  margin: 0;
}

#app {
  padding: 100px;
  background: radial-gradient(71.11% 100% at 50% 0%, #020204 14.6%, #011F35 100%);
  box-sizing: border-box;
  min-height: 100vh;
  width: 100vw;
}
</style>
