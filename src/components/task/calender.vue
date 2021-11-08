<template>
	<div class="task-contain">
		<!-- 	<vue-cal style="height: 85%;width: 98%;" :events="events" /> -->
		<vue-cal selected-date="2021-10-21" hide-weekends :events="events">
			<!--<template v-slot:event="{ event, view }">


			</template>-->
		</vue-cal>
	</div>
</template>
<script>
	import VueCal from 'vue-cal'
	import 'vue-cal/dist/vuecal.css'
	//https://blog.csdn.net/AcongMiss/article/details/88703504
	export default {
		// eslint-disable-next-line vue/no-unused-components
		components: {
			VueCal
		},
		computed: {
			username() {
				return this.$store.state.username;
			}
		},
		data() {
			return {
				events: [{
						start: '2021-10-21 14:00',
						end: '2021-10-21 18:00',
						title: '需要去购物',
						icon: 'shopping_cart', // 自定义属性
						content: '点击查看我的购物清单',
						class: 'leisure'
					},
					{
						start: "2021-10-21 06:00",
						end: "2021-10-21 07:00",
						title: "任务1",
						information: "1111"
					}

				]
			}
		},
		methods: {
			getUserCalender() {
				this.$axioss({
					method: "get",
					url: this.HOST + "/getUserCalender",
					crossDomain: true,
					params: {
						user: this.username,
					}
				}).then(response => {
					if (response.data.code == "200") {
						this.events = response.data.data;
					}
				})
			}
		},
		mounted() {
			//后端获取数据
			this.getUserCalender();
		}
	}
</script>
<style>

</style>
