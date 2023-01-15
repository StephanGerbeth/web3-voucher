// https://nuxt.com/docs/api/configuration/nuxt-config
import { config } from 'dotenv';
import nodePolyfills from 'vite-plugin-node-stdlib-browser';
import vuetify from 'vite-plugin-vuetify';
config();

export default defineNuxtConfig({
  srcDir: 'src/',

  css: [
    'vuetify/lib/styles/main.css'
  ],

  runtimeConfig: {
    web3: {
      storage: {
        token: process.env.WEB3_STORAGE
      }
    },
    app: {
      tatum: {
        net: 'testnet',
        chain: 'algorand',
        config: {
          testnet: {
            baseUrl: 'https://api-eu1.tatum.io/v3/',
            key: process.env.TATUM_TESTNET_KEY
          },
          mainnet: {
            baseUrl: 'https://api-eu1.tatum.io/v3/',
            key: process.env.TATUM_MAINNET_KEY
          }
        }
      }
    }
  },

  vite: {
    build: {
      target: ['es2020'],
    },
    optimizeDeps: {
      esbuildOptions: {
        target: 'es2020'
      }
    },
    plugins: [
      nodePolyfills()
    ]
  },

  build: {
    transpile: [
      'rxjs',
      // https://codybontecou.com/how-to-use-vuetify-with-nuxt-3.html
      'vuetify'
    ],
  },

  modules: [
    async (options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', config => config.plugins.push(vuetify()));
    }
  ],

  postcss: {
    plugins: {
      'postcss-preset-env': {
        preserve: true,
        stage: 0,
        features: {
          'custom-properties': {
            disableDeprecationNotice: true
          },
          'nesting-rules': true
        }
      },
      'postcss-normalize': {},
      'cssnano': {
        preset: [
          'default', {
            discardDuplicates: false,
            mergeRules: false
          }
        ]
      }
    }
  }
});
