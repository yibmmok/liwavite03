<template>
<div class="relative w-5/6" 
	:data-id="state.mainID"
	:data-value="state.sValue"
>
	<div class="border border-2 rounded-r px-4 py-2 w-full h-10/12 bg-white text-left" :class="fieldClass">{{ fieldValue }}</div>
	<div id="btnDrop" class="absolute top-1/3 right-6" @click="showList">
		<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#333"><path d="M0 7.33l2.829-2.83 9.175 9.339 9.167-9.339 2.829 2.83-11.996 12.17z"/></svg>
	</div>
	<div v-if="isList" class="absolute w-[98%] h-[150px] border border-2 border-slate-500 bg-white p-2 overflow-y-auto">
		<ul class="w-full h-full">
			<li class="text-left h-8" @click.prevent="hideList">請選擇...</li>
			<li class="text-left h-8 cursor-pointer" v-for="(item) in itemsdata" :key="item.mainID" @click.prevent="sendToInput(item.mainID, item.dept)">{{ item.dept }}</li>
		</ul>
	</div>
</div>	
</template>

<script setup>
	import { ref, reactive, onMounted } from "vue"

	/*  使用方式  :
	  	<liwaSelectBox
	  		id="dept"  // liwaSwelectBox的ID, 取值用
	  		class=""	// 設定元件 css
	  		:splaceholder=""	// input 的placeholder屬性
	  		:smainid="testID"  // 傳入的 mainID, 檢視或編輯用
	  		:svalue="testName" // 傳入的值, 檢視或編輯用
	  		:itemsdata="items"	// 傳入的下拉選項列表
	  		@itemChange="itemChange" // 若下拉選單改變, 執行父代component的itemChange
	  	/>	
	*/

	const isList = ref(false)
	const fieldClass = ref('isEmpty')

	const props = defineProps({
		splaceholder: {
			type:String,
			default:''
		},		
		smainid: {
			type:String,
			default:''
		},
		svalue: {
			type:String,
			default:'請選擇...'
		},
		itemsdata: {
			type:Array,
			default:[]
		}
	})

	const state = reactive({
		sPlaceholder: props.splaceholder,
		sValue: props.svalue,
		mainID: props.smainid,
	})

	const fieldValue = ref(state.sPlaceholder)

	const emits = defineEmits("itemChange")

	const showList = () => {
		if (isList.value == false) isList.value = true
	}

	const hideList = () => {
		if (isList.value == true) isList.value = false
	}

	const sendToInput = (sID, sName) => {
		if (sID !== '') {
			state.mainID = sID
			state.sValue = sName
		}
		resetValue(sID)
		hideList()
		emits("itemChange")			
	}

	const resetValue = (sID) => {
		console.log('mainID =', sID)
		if (sID == '') {
			fieldValue.value = state.sPlaceholder
			fieldClass.value = 'isEmpty'
		} else {
			fieldValue.value = state.sValue
			fieldClass.value = 'isSelected'
		}	
		console.log('fieldValue2 =', fieldValue.value)	
	}

	defineExpose({
		resetValue,
	})

	resetValue(state.mainID)

</script>

<style scoped>
	.isEmpty {
		color:#999;
	}

	.isSelected {
		color:inherit;
	}
</style>
