<template>
<v-layout fill-height>
	<v-flex xs3 :id="$root.darkmode ? 'dark_column' : 'light_column'">
		<v-list :three-line="!$root.compactmode">
			<v-subheader>
				Notes
			</v-subheader>
			<template v-for="(item, index) in items">
				<v-list-tile
					:key="item.title"
					avatar
					ripple
					@click="toggle(index)"
				>
					<v-list-tile-content>
						<v-list-tile-title class="text--primary">{{ item.title}} </v-list-tile-title>
						<v-list-tile-sub-title>{{ item.description }}</v-list-tile-sub-title>
					</v-list-tile-content>

					<v-list-tile-action>
						<v-list-tile-action-text>{{ item.date }}</v-list-tile-action-text>
						<!-- <v-icon -->
						<!-- 	color="grey lighten-1"> -->
						<!-- 	star_border -->
						<!-- </v-icon> -->

						<v-icon
							color="yellow darken-2"
						>
							star
						</v-icon>
					</v-list-tile-action>

				</v-list-tile>
				<v-divider
					v-if="index + 1 < items.length"
					:key="index"
				></v-divider>
			</template>
		</v-list>
	</v-flex>
	<v-flex xs9>My Countent</v-flex>
</v-layout>
</template>

<script>
export default {
  name: 'home',
	data: () => ({
		favorites: [0, 2],
		items: []
	}),
	created() {
		this.items = [
			{
				date: 'August 19, 2018',
				title: 'Brunch this weekend?',
				description: "I'll be in your neighborhood doing errands this weekend. Do you want to hang out?"
			},
			{
				date: 'August 16, 2018',
				title: 'Summer BBQ',
				description: "Wish I could come, but I'm out of town this weekend."
			},
			{
				date: 'July 25, 2018',
				title: 'Oui oui',
				description: 'Do you have Paris recommendations? Have you ever been?'
			},
			{
				date: 'July 23, 2018',
				title: 'Birthday gift',
				description: 'Have any ideas about what we should get Heidi for her birthday?'
			},
			{
				date: 'December 25, 2017',
				title: 'Recipe to try',
				description: 'We should eat this: Grate, Squash, Corn, and tomatillo Tacos.'
			}
		]
	}
}
</script>

<style scoped lang="sass">
#dark_column
	background: #424242
</style>
