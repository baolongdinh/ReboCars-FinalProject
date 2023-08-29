import { createApp } from 'vue'
import { createStore } from 'vuex'
import {router} from './routers'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import './assets/index.css'

// Import Bootstrap and BootstrapVue CSS files (order is important)
import { VueSpinners } from '@saeris/vue-spinners'

//import module store
import productStore from './components/products/store'



const store = createStore({ 
    modules: { 
        productStore : productStore,
    }
})
  
const app  = createApp(App)
app.use(store)
app.use(ElementPlus)
app.use(VueSpinners)
app.use(router)
app.mount('#app')
