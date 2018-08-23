<template>
	<v-container>
		<v-layout wrap>
			<v-flex xs3 v-for="notebook in notebooks" :key="notebook.id">
				<v-card color="blue">
					<v-card-text height="400">
						<v-container
							fill-height
							fluid
							pa-2
						>
							<v-layout fill-height>
								<v-flex xs12 align-end flexbox>
									<span class="headline white--text">{{notebook.title}}</span>
								</v-flex>
							</v-layout>
						</v-container>
					</v-card-text>

					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn icon>
							<v-icon>favorite</v-icon>
						</v-btn>
						<v-btn icon>
							<v-icon>bookmark</v-icon>
						</v-btn>
						<v-btn icon>
							<v-icon>share</v-icon>
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script>
	const dummy_notebooks = require('../../dummy/notebooks.json')
	export default {
		data: () => ({
			notebooks: []
		}),
		created() {
			this.notebooks = dummy_notebooks
		}
	}
</script>
