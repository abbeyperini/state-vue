<script setup lang="ts">
import { useShibaStore } from '@/stores/shibas';
import { storeToRefs } from 'pinia';
const shibas = useShibaStore();
// Destructuring without storeToRefs will break reactivity
const { count, shibaList, pending, errorMessage } = storeToRefs(shibas)

function handleIncrement(e: SubmitEvent) {
  const form = e.target as HTMLFormElement;

  // Actions can be used as store properties
  shibas.increment(parseInt(form.number.value));
}

</script>
<template>
  <div>
    <span>Shibas: {{count}}</span>
    <form @submit.prevent="handleIncrement">
      <label for='number'>Number</label>
      <input id='number' type="number"/>
      <button type="submit">Add Shibas</button>
    </form>
    <p v-if="pending">Pending</p>
    <p v-if="errorMessage.length > 0">{{errorMessage}}</p>
    <img v-for="shiba in shibaList" :key="shiba" :src="shiba" alt="shiba" />
  </div>
</template>
<style lang="css">
img {
  width: 300px;
}
</style>