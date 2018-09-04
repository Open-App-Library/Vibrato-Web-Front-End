<template>
<div class="tree-view">
	<li>
		<template v-if="is_root">
			<v-list-tile>
				<v-list-tile-action>
					<v-btn v-if="isFolder" v-on:click.stop.prevent="toggle" flat icon>
						<v-icon>keyboard_arrow_{{open ? 'down' : 'right'}}</v-icon>
					</v-btn>
				</v-list-tile-action>
				<v-list-tile-content>
					<v-list-tile-title>All Notebooks</v-list-tile-title>
				</v-list-tile-content>
			</v-list-tile>
			<ul v-show="this.open"">
				<Treeview
					v-for="notebook in model"
					:key="notebook.id"
					:object="notebook">
				</Treeview>
			</ul>
		</template>
		<template v-else>
			<v-list-tile :to="!isNaN(model.id) ? '/notebook/'+model.id : ''">
				<v-list-tile-action>
					<v-btn v-if="isFolder" v-on:click.stop.prevent="toggle" flat icon>
						<v-icon>keyboard_arrow_{{open ? 'down' : 'right'}}</v-icon>
					</v-btn>
				</v-list-tile-action>
				<v-list-tile-content>
					<v-list-tile-title>{{model.title ? model.title : "Untitled Notebook"}} -  {{JSON.stringify(model.parent)}}</v-list-tile-title>
				</v-list-tile-content>
			</v-list-tile>

			<ul v-show="this.open"">
				<Treeview
					v-for="(model, index) in model.children"
					:key="index"
					:object="model">
				</Treeview>
			</ul>
		</template>
	</li>
</div>
</template>

<script>
export default {
  name: 'Treeview',
	props: ['object', 'is_root'],
	data: () => ({
		open: false,
		model: null
	}),
	methods: {
		toggle() {
			if (this.isFolder) {
				this.open = !this.open
			}
		},
		changeType() {
			if (!this.isFolder) {
				this.model.children = []
				this.addChild()
				this.open = true
			}
		},
		addChild() {
			this.model.children.push({
				name: 'New Item'
			})
		},
		shouldShow(model_name) {
			if (model_name == "All Notebooks") {
				return true
			} else if (this.open) {
				return true
			} else {
				return false
			}
		}
	},
	computed: {
		isFolder() {
			return this.is_root ? true : this.model.children && this.model.children.length
		}
	},
	created() {
		if (this.is_root) {
			this.open = true
		}
		this.model = this.object
	},
	watch: {
		object(newObj) {
			this.model = newObj
			console.log("new", this.model)
		},
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
.tree-view
	list-style: none
	padding: 8px 0
	ul.root_ul
		padding: 0
	#tree_label
		color: #303030
</style>
