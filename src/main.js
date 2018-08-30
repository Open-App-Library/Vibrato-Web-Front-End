import 'babel-polyfill'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import API from './api'

Vue.config.productionTip = false

new Vue({
	data() { return API.global_data },
	methods: API.global_methods,
	computed: API.global_computed,
	router,
	render: h => h(App),
	created() {
		this.load_data()
	}
}).$mount('#app')
