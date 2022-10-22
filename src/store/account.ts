import { $http } from '@/services';
import {
    AuthenticationServices,
    type Account,
    type TokenResponse,
} from '@/services/authentication';
import { DomainServices } from '@/services/domains';
import { generateRandomPassword } from '@/utils/password';

interface IState {
    accounts: Account[];
    activeAccount: Account | null;
    archivedAccounts: Account[];
    authentication: TokenResponse | null;
}
export const useAccountStore = defineStore('account', {
    state: (): IState => ({
        accounts: [],
        activeAccount: null,
        archivedAccounts: [],
        authentication: null,
    }),
    actions: {
        async fetchToken(account: Account) {
            const token = await AuthenticationServices.getToken({
                address: account.address,
                password: account.password,
            });
            $http.defaults.headers.common[
                'Authorization'
            ] = `Bearer ${token.data.token}`;
            this.authentication = token.data;
        },
        async generateNewAccounts() {
            const domainList = await DomainServices.all();
            const domain = domainList.data['hydra:member'][0].domain;
            const address = `${nanoid()}@${domain}`;
            const password = generateRandomPassword();

            const createdAccount = await AuthenticationServices.createAccount({
                address,
                password,
            });
            const account = {
                ...createdAccount.data,
                password,
            };
            this.accounts.push(account);
            this.setActiveAccount(account);
        },
        async setActiveAccount(account: Account) {
            this.activeAccount = account;
            this.fetchToken(account);
        },
    },
    getters: {
        isInArchived: state => {
            return state.archivedAccounts.some(
                v => v.id === state.activeAccount?.id
            );
        },
    },
    persist: {
        key: 'temp-mail-account',
        paths: ['accounts', 'archivedAccounts'],
    },
});
