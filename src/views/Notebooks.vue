<template>
<v-container>
	<v-layout wrap>
		<v-flex
			xs3
			v-for="notebook in $root.notebooks_all"
			:key="notebook.id"
		>

			<v-card class="notebook-card" :to="'/notebook/'+notebook.id+'/'">
				<h2 class="notebook-title">{{notebook.title}}</h2>
			</v-card>
		</v-flex>
	</v-layout>
</v-container>
</template>

<script>
	export default {
		data: () => ({
		}),
		created() {
		}
	}
</script>

<style lang="sass" scoped>
.notebook-card
	display: flex
	width: 150px
	height: 150px
	font-size: 9px
	align-items: center
	padding: 15px
	margin: 15px auto
	justify-content: center
	.notebook-title
		text-align: center
</style>
