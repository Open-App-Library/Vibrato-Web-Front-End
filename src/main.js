import 'babel-polyfill'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

// Can access these variables by using $root
var global_data = {
	darkmode: false,
	compactmode: false
}

var global_methods = {
	chooseClasses(light_classes) {
		if (this.darkmode) {
			return ""
		} else {
			return light_classes
		}
	}
}

new Vue({
	data() { return global_data },
	methods: global_methods,
	router,
	store,
	render: h => h(App),
}).$mount('#app')
