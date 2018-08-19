<template>
<v-list-tile>
	<v-list-tile-action>
		<v-switch v-model="true_or_false" @change="onChange" ></v-switch>
	</v-list-tile-action>
	<v-list-tile-content>
		{{label}}
	</v-list-tile-content>
</v-list-tile>
</template>

<script>
export default {
	props: ['value', 'label'],
	data: () => ({
		true_or_false: false
	}),
	methods: {
		onChange(e) {
			this.$emit('input', this.true_or_false)
		}
	},
	created() {
		this.true_or_false = this.value
	}
}
</script>
