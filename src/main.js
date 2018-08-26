import 'babel-polyfill'
import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

// Can access these variables by using $root
var global_data = {
	darkmode: false,
	compactmode: false,
	notes: null,
	notebooks: null
}

var global_methods = {
	load_data() {
		// Loads notes, notebooks and other API data
		this.notes = require('../dummy/notes.json')
		this.notebooks = require('../dummy/notebooks.json')
	},
	getNotebookById(id) {
		for (var notebook of this.notebooks) {
			if (notebook.id == id) {
				return notebook
			}
		}
		return null
	},
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
	render: h => h(App),
	created() {
		this.load_data()
	}
}).$mount('#app')
