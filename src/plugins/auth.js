
import { addRouteMiddleware, navigateTo } from '#app';
import * as webAuthn from '@/observables/webAuth';
import { createClient } from '@/classes/Client';
import defer from '@/utils/defer';

let client = null;

export default defineNuxtPlugin((nuxtApp) => {
  addRouteMiddleware('global-test', async (to, from) => {
    if(to.meta.auth) {
      try {
        await resolveClient();
        if(!to.query.cred && from.query.cred) {
          from.query.redirectTo = undefined;
          nuxtApp.$router.replace(Object.assign(to, { query: from.query }), () => { /* empty */ });
        }
      } catch(e) {
        return navigateTo({ name: 'index', query: Object.assign(to.query, {
          redirectTo: from.name
        } ) });
      }
    }
  }, { global: true });

  return {
    provide: {
      register: async (client) => {
        const { id } = await webAuthn.register(client.wallet.mnemonic, client.user.info.name, client.user.info.image);
        return navigateTo({ name: 'index', query: { cred: id } });
      },

      authorize: async (id) => {
        client = defer();
        try {
          client.resolve(createClient({ mnemonic: await webAuthn.auth(id) }));
        } catch(e) {
          client.reject(null);
        }
        return navigateTo({ name: nuxtApp.$router.currentRoute.value.query.redirectTo || 'dashboard' });
      },

      client: async () => client
    }
  };
});

const resolveClient = async () => {
  if(await client) {
    return client;
  } else {
    throw new Error('no access');
  }
};
