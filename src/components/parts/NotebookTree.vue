<template>
<div class="tree-view">
	<li>
		<template v-if="is_root">
			<v-list-tile to="/notebooks/">
				<v-list-tile-action>
					<v-btn v-if="isFolder" v-on:click.stop.prevent="toggle" flat icon>
						<v-icon>keyboard_arrow_{{open ? 'down' : 'right'}}</v-icon>
					</v-btn>
				</v-list-tile-action>
				<v-list-tile-content>
					<v-list-tile-title>All Notebooks</v-list-tile-title>
				</v-list-tile-content>
			</v-list-tile>
			<ul v-show="this.open">
				<!-- Since this is a root element, notebookObject is an array and not a dictionary. -->
				<NotebookTree
					v-for="(notebook,index) in notebookObject"
					:key="index"
					:notebookObject="notebook">
				</NotebookTree>
			</ul>
		</template>
		<template v-else>
			<v-list-tile :to="!isNaN(notebookObject.id) ? '/notebook/'+notebookObject.id : ''">
				<v-list-tile-action>
					<v-btn v-if="isFolder" v-on:click.stop.prevent="toggle" flat icon>
						<v-icon>keyboard_arrow_{{open ? 'down' : 'right'}}</v-icon>
					</v-btn>
				</v-list-tile-action>
				<v-list-tile-content>
					<v-list-tile-title>{{notebookObject.title ? notebookObject.title : "Untitled Notebook"}}</v-list-tile-title>
				</v-list-tile-content>
			</v-list-tile>

			<ul v-show="this.open">
				<!-- Since this is NOT a root element, notebookObject is a dictionary and not an array. -->
				<NotebookTree
					v-for="(notebook,index) in notebookObject.children"
					:key="index"
					:notebookObject="notebook">
				</NotebookTree>
			</ul>
		</template>
	</li>
</div>
</template>

<script>
export default {
  name: 'NotebookTree',
	props: ['notebookObject', 'is_root'],
	data: () => ({
		open: false, // whether notebook is showing or hiding children
	}),
	methods: {
		toggle() {
			if (this.isFolder) {
				this.open = !this.open
			}
		}
	},
	computed: {
		isFolder() {
			// if is_root, return true; else return true if has children property and has more than zero children
			return this.is_root ? true : this.notebookObject.children && this.notebookObject.children.length
		}
	},
	created() {
		// If root element, make it open by default.
		if (this.is_root) {
			this.open = true
		}
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
