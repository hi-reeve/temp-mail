import {
    messagesKey,
    MessagesServices,
    type Messages,
} from '@/services/messages';
import type { UseQueryOptions } from '@tanstack/vue-query';
import type { MaybeRef } from '@vueuse/core';
import type { AxiosResponse } from 'axios';

export const useMessages = (
    accountId: MaybeRef<string>,
    queryOpts?: UseQueryOptions<AxiosResponse<Messages>>
) => {
    return useQuery(
        reactive(messagesKey.all(accountId)),
        () => MessagesServices.all(),
        queryOpts
    );
};
