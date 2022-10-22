<script setup lang="ts">
import {
    messagesKey,
    MessagesServices,
    type HydraMember,
} from '@/services/messages';
const accounts = useAccountStore();
const accountId = computed(() => accounts.getActiveAccount?.id ?? '');
const { data, isFetching } = useQuery(
    reactive(messagesKey.all(accountId)),
    () => MessagesServices.all(),
    {
        enabled: computed(() => !!accounts.getActiveAccount),
        refetchOnWindowFocus: false,
        refetchInterval: 10000,
    }
);
const selectedMessage = ref<HydraMember>();
const messageId = computed(() => selectedMessage.value?.id ?? '');
const { data: messageDetail, isFetching: fetchMessageDetail } = useQuery(
    reactive(messagesKey.byId(selectedMessage.value?.id ?? '')),
    () => MessagesServices.findById(unref(messageId)),
    {
        enabled: computed(() => !!selectedMessage.value),
        refetchOnWindowFocus: false,
        refetchInterval: 10000,
    }
);
const { mutate } = useMutation((id: string) =>
    MessagesServices.patchMessage(id)
);

const readMessage = (message: HydraMember) => {
    mutate(message.id);
};
</script>

<template>
    <div class="max-w-xs">
        <ul v-if="!isFetching" class="flex-col space-y-4 divide-y-2">
            <li
                v-for="message in data?.data['hydra:member']"
                :key="message.id"
                class="max-w-xs rounded px-4 py-2"
                :class="{
                    'text-gray-700 bg-slate-300': !message.seen,
                    'text-gray-400': message.seen,
                }"
            >
                <button
                    type="button"
                    class="text-left"
                    @click="readMessage(message)"
                >
                    <p class="font-bold">{{ message.from.name }}</p>
                    <p class="font-bold">{{ message.subject }}</p>
                    <p class="text-sm">{{ message.intro }}</p>
                </button>
            </li>
        </ul>
        <p v-else>Loading...</p>
    </div>
    <div v-if="selectedMessage">
        {{ messageDetail?.data.html }}
    </div>
</template>

<style scoped></style>
