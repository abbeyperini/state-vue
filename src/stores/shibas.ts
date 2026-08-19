import { defineStore } from 'pinia';
import { ref, type Ref } from 'vue';

export const useShibaStore = defineStore('shibas', () => {
  // state
  const count = ref(0);
  const shibaList: Ref<string[]> = ref([]);
  const pending = ref(false);
  const errorMessage = ref("");

  // action
  async function increment(number: number) {
    errorMessage.value = "";
    count.value += number;
    pending.value = true;
    const response = await fetch(`https://dog.ceo/api/breed/shiba/images/random/${number}`);
    const shibas = await response.json();
    if (shibas.status !== "success") errorMessage.value = shibas.status!.toString();
    pending.value = false;
    return shibas.message.forEach((shiba: string) => shibaList.value.push(shiba))
  }

  return { count, shibaList, increment, pending, errorMessage }
})