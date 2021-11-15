<template>
	<el-container  class="container">
		<el-header class="header">
			<homeheader></homeheader>
		</el-header>
		<div class="tiao">

		</div>
		<el-container class="main">
			<el-aside class="leftaside">
				<leftaside></leftaside>
			</el-aside>
			<el-container class="homeimg">
				<el-main>
					<homemain></homemain>
				</el-main>
				<el-container>
					<el-aside class="rightaside">
						<rightaside></rightaside>
					</el-aside>
					<img :src="url" class="kaoyan">
				</el-container>
			</el-container>
		</el-container>
		<el-footer>
			<a style="color: orange;"><i style="margin-left:45%;color:#00aeef">powered by上岸组</i></a>
		</el-footer>
	</el-container>
</template>
<script>
	import homeheader from './homeheader.vue'
	import leftaside from './leftaside.vue'
	import rightaside from './rightaside.vue'
	import homemain from './homemain.vue'
	export default {
		data() {
			return {
				url: require("../assets/kaoyan.jpg")
			}

		},
		components: {
			homeheader,
			leftaside,
			rightaside,
			homemain

		}
	}
</script>

<style scoped>
	.container {
		position: absolute;
		background-color: #FCFCFC;
		width:100%
	}

	.header {

		width: 100%;
		height: 120px !important;
		margin-top: -10px;
		margin-left: -10px;
		margin-right: -10px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
	}

	.tiao {
		height: 10px;
		width: 100%;
		margin-left: -10px;
		background-color: #00aeef;
	}
	.main{
		width: 100%;
	}
	.leftaside {
		width: 465px !important;
		margin-top: 13px;
	}

	.rightaside {
		position: absolute;
		margin-top: 15px;
		width: 380px !important;
		left: 750px;

	}

	.el-main {
		width: 930px !important;
		margin-top: -6px;
	}

	.el-footer {
		margin-top: 1%;
	}

	.homeimg {
		position: absolute;
		margin-left: 25%;

	}

	/* .homeimg {
		width: 900px;
		margin-top: 13px;

	} */

	.kaoyan {
		width: 380px;
		height: 270px;
		position: absolute;
		top: 50%;
		left: 750px;
	}
</style>
