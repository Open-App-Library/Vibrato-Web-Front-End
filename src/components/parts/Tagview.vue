<template>
<div class="tag-view">
	<v-list>
		<v-list-tile v-for="tag in tags" :key="tag.id" :to="'/tag/'+tag.id">
			<v-list-tile-action>
				<v-icon>label</v-icon>
			</v-list-tile-action>
			<v-list-tile-content>
				<v-list-tile-title>{{tag.title}}</v-list-tile-title>
			</v-list-tile-content>
		</v-list-tile>
	</v-list>
</div>
</template>

<script>
export default {
  name: 'Treeview',
	props: ['tags', 'global_icon'],
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
			if (model_name == "ROOT") {
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
			return this.model.children && this.model.children.length
		}
	},
}
</script>
