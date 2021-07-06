<template>
	<div style="position:relative;">
		<div class="box-esign">
			<autoFullScreen
				ref="esign"
				:width="width"
				:height="height"
				:isCrop="isCrop"
				:lineWidth="lineWidth"
				:lineColor="lineColor"
				:bgColor="bgColor"
			>
			</autoFullScreen>
		</div>
		<div class="button-sign" v-if="!fullStatus">
			<button @click="handleReset">清空画板</button>
			<button @click="handleGenerate">生成图片</button>
		</div>
		<div class="button-sign-full" v-if="fullStatus">
			<button @click="handleReset">清空画板</button>
			<button @click="handleGenerate">生成图片</button>
		</div>
	</div>
</template>

<script>
import autoFullScreen from './components/signatures.vue';

export default {
	components: {
		autoFullScreen,
	},
	data() {
		return {
			lineWidth: 6,
			lineColor: '#000000',
			bgColor: '',
			resultImg: '',
			isCrop: true,
			width: 800,
			height: 300,
			fullStatus: false,
		};
	},
	mounted() {
		this.$nextTick(() => {
			this.renderResize();
		});
		window.addEventListener('resize', this.renderResize, false);
	},

	beforeDestroy() {
		// 移除监听
		window.removeEventListener('resize', this.renderResize, false);
	},
	methods: {
		renderResize() {
			// 判断横竖屏
			let width = document.documentElement.clientWidth;
			let height = document.documentElement.clientHeight;
			if (width > height) {
				this.width = width;
				this.height = height;
				this.fullStatus = true;
			} else {
				this.width = width;
				this.height = 300;
				this.fullStatus = false;
			}
			// 做页面适配
			// 注意：renderResize 方法执行时虚拟 dom 尚未渲染挂载，如果要操作 vue 实例，最好在this.$nextTick()里进行。
		},
		handleReset() {
			this.$refs.esign.reset();
		},
		handleGenerate() {
			this.$refs.esign
				.generate()
				.then(res => {
					console.log(res);
					this.resultImg = res;
				})
				.catch(err => {
					alert(err); // 画布没有签字时会执行这里 'Not Signned'
				});
		},
	},
};
</script>

<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin: 0;
}
.box-esign {
	border: 1px solid #000000;
}
.button-sign {
	text-align: center;
	margin-top: 25px;
}
.button-sign-full {
	position: absolute;
	bottom: 15px;
	margin-left: 40%;
}
body {
	margin: 0;
}
</style>
