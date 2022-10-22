<script setup lang="ts">
import { bytesToSize } from '@/utils/size';
import type { Account } from '@/services/authentication';
import { useToast } from 'vue-toast-notification';
const accounts = useAccountStore();
const createNewAccount = () => {
    accounts.generateNewAccounts();
};

const $toast = useToast();

// copy to clipboard
const copyToClipboard = (account: Account) => {
    navigator.clipboard.writeText(account.address);
    $toast.success('Copied to clipboard');
};
</script>

<template>
    <nav class="w-72 bg-white fixed left-0 top-0 h-screen px-4 py-4 shadow-md">
        <ul class="flex flex-col">
            <li>
                <button
                    type="button"
                    class="mb-8 flex items-center px-4 py-2 rounded bg-slate-200 text-gray-600 space-x-1 w-full"
                    @click="createNewAccount"
                >
                    <icon:bxs:plus-circle />
                    <span>New email address</span>
                </button>
            </li>
            <li class="text-sm text-gray-500 mb-1">Active accounts</li>
            <li
                v-for="account in accounts.accounts"
                :key="account.id"
                class="mb-2 overflow-hidden grid grid-cols-12"
                :class="{
                    'bg-slate-200':
                        accounts.activeAccount &&
                        account.id === accounts.activeAccount.id,
                }"
                :title="account.address"
            >
                <button
                    class="flex items-center space-x-2 text-gray-600 transition-all duration-300 ease-in-out hover:cursor-pointer py-2 rounded px-4 col-span-10"
                    @click="accounts.setActiveAccount(account)"
                >
                    <icon:bxs:envelope-open class="flex-shrink-0" />
                    <span class="truncate">{{ account.address }}</span>
                </button>
                <button
                    type="button"
                    class="hover:bg-slate-300 col-span-2 transition-all duration-300 ease-in-out"
                    @click="copyToClipboard(account)"
                    title="copy address to clipboard"
                >
                    <icon:bx:copy class="mx-auto" />
                </button>
            </li>
            <li
                v-if="accounts.accounts.length === 0"
                class="text-gray-400 px-4 text-sm mb-4"
            >
                <span>No accounts</span>
            </li>
            <li class="text-sm text-gray-500 mb-1">Archived accounts</li>
            <li
                v-for="account in accounts.archivedAccounts"
                :key="account.id"
                class="flex flex-row space-x-2 mb-2 items-center text-gray-600 transition-all duration-300 hover:cursor-pointer bg-slate-200 px-4 py-2 rounded"
            >
                <icon:bx:user />
                <span>{{ account.address }}</span>
            </li>
            <li
                v-if="accounts.archivedAccounts.length === 0"
                class="text-gray-400 px-4 text-sm mb-4"
            >
                <span>No accounts</span>
            </li>
        </ul>

        <div class="w-full bg-slate-200 rounded px-4 py-2 text-gray-600">
            <ul class="flex flex-col">
                <li class="mb-2 font-bold">Account information</li>
                <li class="text-sm truncate mb-1">
                    <span>Address : </span>
                    <span>{{ accounts.activeAccount?.address }}</span>
                </li>
                <li class="text-sm truncate">
                    <span>Password : </span>
                    <span>{{ accounts.activeAccount?.password }}</span>
                </li>
                <li class="mt-2 font-bold">
                    <span>Quota Left </span>
                </li>
                <li>
                    <span>
                        {{ bytesToSize(accounts.activeAccount?.used ?? 0) }} /
                    </span>
                    <span>
                        {{ bytesToSize(accounts.activeAccount?.quota ?? 0) }}
                    </span>
                </li>
                <li>
                    <progress
                        :value="accounts.activeAccount?.used"
                        :max="accounts.activeAccount?.quota"
                        class="w-full rounded"
                    >
                        32%
                    </progress>
                </li>
            </ul>
        </div>
    </nav>
</template>

<style scoped></style>
