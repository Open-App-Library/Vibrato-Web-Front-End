import Vue from 'vue'
import Router from 'vue-router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

import AllNotes from './views/AllNotes.vue'

Vue.use(Router)
Vue.use(Vuetify)


export default new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [
		{
			path: '/',
			name: 'all-notes',
			component: AllNotes
		},
		{
			path: '/note/:id',
			name: 'single-note',
			component: AllNotes
		},
		{
			path: '/notebook/:notebook_id',
			name: 'single-notebook',
			props: true,
			component: AllNotes
		},
		{
			path: '/notebooks',
			name: 'notebooks',
			component: () => import(/* webpackChunkName: "notebooks" */ './views/Notebooks.vue')
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

