<script setup lang="ts">
import { useMessages } from '@/composable/useMessages';
const accounts = useAccountStore();
const { data } = useMessages(accounts.activeAccount?.id ?? '', {
    enabled: computed(() => !!accounts.activeAccount),
});
</script>

<template>
    <div class="w-full">
        <ul>
            <li v-for="message in data?.data['hydra:member']" :key="message.id">
                <p>{{ message.from.name }}</p>
                <p>{{ message.subject }}</p>
                <p>{{ message.intro }}</p>
            </li>
        </ul>
    </div>
</template>

<style scoped></style>
