<template>
<v-navigation-drawer
	id="vibrato-sidebar"
	enable-resize-watcher
	fixed
	permanent
	clipped
	:class="$root.chooseClasses('grey lighten-4')"
	app
	>
	<v-list
		dense
		:class="$root.chooseClasses('grey lighten-4')"

		>
		<template v-for="(item, i) in layout">
			<v-layout v-if="item.heading" :key="i" row align-center>
				<v-flex xs6>
					<v-subheader v-if="item.heading">
						{{ item.heading }}
					</v-subheader>
				</v-flex>
				<v-flex xs6 class="text-xs-right">
					<v-btn small flat>View All</v-btn>
				</v-flex>
			</v-layout>

			<v-divider v-else-if="item.divider" :key="i" dark class="my-3"></v-divider>

			<Treeview v-else-if="item.treeview" :model="item.data"></Treeview>
			<Listview v-else-if="item.listview" :items="item.data"></Listview>

			<v-list-tile v-else :key="i" :to="item.href ? item.href : ''">
				<v-list-tile-action>
					<v-icon>{{ item.icon }}</v-icon>
				</v-list-tile-action>
				<v-list-tile-content>
					<v-list-tile-title class="$root.chooseClasses('grey--text text--darken-2')">
						{{ item.text }}
					</v-list-tile-title>
				</v-list-tile-content>
			</v-list-tile>
		</template>
	</v-list>
</v-navigation-drawer>

</template>

<script>
import Treeview from '@/components/parts/Treeview.vue'
import Listview from '@/components/parts/Listview.vue'

const dummy_notebooks = require('../../../dummy/notebooks.json')

export default {
	name: 'Sidebar',
	data: () => ({
		layout: [],
		notebooks: {
			title: 'ROOT',
			children: null
		},
		tags: [
			{name: "2018", icon: "label", href: "/tag/1"},
			{name: "2017", icon: "label", href: "/tag/2"},
			{name: "2016", icon: "label", href: "/tag/3"},
			{name: "2015", icon: "label", href: "/tag/4"},
		]
	}),
	methods: {
		load_notebooks() {
			// Dummy data!
			this.notebooks.children = dummy_notebooks
		},
		setURLs(base_url, items) {
			for (var i in items) {
				items[i].href=base_url + items[i].id + "/"
				if (items[i].children) {
					this.setURLs(base_url, items[i].children)
				}
			}
		}
	},
	computed: {

	},
	components: {
		Treeview,
		Listview
	},
	created() {
		this.layout = [
			{ icon: 'notes', text: 'All Notes', href: "/"},
			{ icon: 'star', text: 'Favorites', href: "/favorites"},
			{ divider: true },
			{ heading: 'Notebooks' },
			{ treeview: true, data: this.notebooks },
			{ icon: 'add', text: 'Create new notebook' },
			{ divider: true },
			{ heading: 'Tags' },
			{ listview: true, data: this.tags },
			{ icon: 'add', text: 'Create new tag' },
			{ divider: true },
			{ icon: 'delete', text: 'Trash' },
			{ divider: true },
			{ icon: 'settings', text: 'Settings' },
			{ icon: 'help', text: 'Support' },
			{ icon: 'phonelink', text: 'Download the App!' },
			{ icon: 'keyboard', text: 'Keyboard shortcuts' }
		]

		// Load Notebooks
		this.load_notebooks()
		this.setURLs('/notebook/', this.notebooks.children)
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
#vibrato-sidebar
	padding-top: 16px
</style>
