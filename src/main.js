import './styles/main.css'
import './styles/styles.scss'

import { createApp } from 'vue'
import PrimeVue from 'primevue/config'

import App from './App.vue'
import router from './router'
import { primevueConfig } from './plugins/primevue'

import { Amplify } from 'aws-amplify'
import { amplifyConfig } from '@/config/amplifyConfig'

Amplify.configure(amplifyConfig)

const app = createApp(App)

app.use(router)
app.use(PrimeVue, primevueConfig)

app.mount('#app')
