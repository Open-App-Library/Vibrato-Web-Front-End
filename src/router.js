import Vue from 'vue'
import Router from 'vue-router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import 'simplemde/dist/simplemde.min.css'

import Notes from './views/Note.vue'

Vue.use(Router)
Vue.use(Vuetify)


export default new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [
		{
			path: '/',
			name: 'all-notes',
			component: Notes
		},
		{
			path: '/note/:id',
			name: 'single-note',
			component: Notes
		}
		// {
		// 	path: '/about',
		// 	name: 'about',
		// 	// route level code-splitting
		// 	// this generates a separate chunk (about.[hash].js) for this route
		// 	// which is lazy-loaded when the route is visited.
		// 	component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
		// }
	]
})
