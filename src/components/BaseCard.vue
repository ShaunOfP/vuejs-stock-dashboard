<template>
  <div class="baseCard">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'BaseCard',
};
</script>

<style scoped>
.baseCard {
  background-color: #011F35;
  border-radius: 16px;
  padding: 20px 32px;
}
</style>