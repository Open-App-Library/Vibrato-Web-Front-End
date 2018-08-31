<template>
<v-navigation-drawer
	id="vibrato_sidebar"
	enable-resize-watcher
	clipped
	:class="$root.chooseClasses('grey lighten-4')"
	app
	v-model="$root.show_sidebar"
	>
	<v-list
		dense
		:class="$root.chooseClasses('grey lighten-4')"

		>
		<div v-for="(item, i) in layout" :key="i">
			<v-layout v-if="item.heading" row align-center>
				<v-flex xs6>
					<v-subheader v-if="item.heading">
						{{ item.heading }}
					</v-subheader>
				</v-flex>
				<v-flex v-if="!item.hide_btn" xs6 class="text-xs-right">
					<v-btn small flat :to="item.href">View All</v-btn>
				</v-flex>
			</v-layout>

			<v-divider v-else-if="item.divider" dark class="my-3"></v-divider>

			<Treeview :is_root="true" v-else-if="item.treeview" :model="item.data"></Treeview>
			<Tagview v-else-if="item.tagview" :tags="item.data"></Tagview>

			<v-list-tile v-else :to="item.href ? item.href : ''">
				<v-list-tile-action>
					<v-icon>{{ item.icon }}</v-icon>
				</v-list-tile-action>
				<v-list-tile-content>
					<v-list-tile-title class="$root.chooseClasses('grey--text text--darken-2')">
						{{ item.text }}
					</v-list-tile-title>
				</v-list-tile-content>
			</v-list-tile>
		</div>
	</v-list>
</v-navigation-drawer>

</template>

<script>
import Treeview from '@/components/parts/Treeview.vue'
import Tagview from '@/components/parts/Tagview.vue'

export default {
	name: 'Sidebar',
	data: () => ({
		layout: [],
		notebooks: {
			title: 'All Notebooks',
			href: '/notebooks',
			children: null
		},
	}),
	methods: {
		load_notebooks() {
			// Dummy data!
			this.notebooks.children = this.$root.notebooks
		},
		setURLs(base_url, items) {
			// create URL 
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
		Tagview
	},
	created() {
		this.layout = [
			{ icon: 'edit', text: 'Create New Note', href: "/create-or-something"},
			{ divider: true },
			{ icon: 'notes', text: 'All Notes', href: "/"},
			{ icon: 'star', text: 'Favorites', href: "/favorites"},
			{ divider: true },
			{ heading: 'Notebooks', href: "/notebooks", hide_btn: true },
			{ treeview: true, data: this.notebooks },
			{ icon: 'add', text: 'Create new notebook' },
			{ divider: true },
			{ heading: 'Tags' },
			{ tagview: true, data: this.$root.tags },
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
<style lang="sass" scoped>
#vibrato_sidebar
	padding-top: 16px
	overflow-y: hidden
	&:hover
		overflow-y: scroll
</style>
