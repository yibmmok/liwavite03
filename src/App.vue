<template>
  <Nav/>
  <h1 class="text-4xl text-gray-500 text-center">Home</h1>
  <liwaGrid 
  	ref="mainGrid"
    @showDetail="showDetail"
  />
  <liwaDetail 
    v-if="isDetail"
    :liwaRowM="liwaRowM"
    :detailTitle="detailTitle"
    :action="action"
    @hideDetail="hideDetail"
    @showMsg="showMsg"
    @showConfig="showConfig"
    @reloadGrid="reloadGrid"
  />
  <liwaMsg 
  	v-if="isMsg"
  	:msgTitle="msgTitle"
  	:msgBody="msgBody"
  	:modalType="modalType"
  	@hideMsg="hideMsg"
  	@confirmOK="confirmOK"
  />  
  <liwaConfig
  	v-if="isConfig"
  	@hideConfig="hideConfig"
  />
  <div 
    class="absolute w-12 h-8 text-white top-2 left-1"
    @click=""
  >
 	 <svg 
 	 	xmlns="http://www.w3.org/2000/svg" 
 	 	width="35" 
 	 	height="35" 
 	 	viewBox="0 0 35 35"
 	 	fill="#363"
 	 	stroke="#000"
 	 >
 	 	<path d="M24 6h-24v-4h24v4zm0 4h-24v4h24v-4zm0 8h-24v4h24v-4z"/>
 	 </svg>
  </div>
  <div 
    class="absolute w-12 h-8 text-white top-2 right-[12px]"
    title="測試按鈕"
    @click="reloadGrid"
  >
	<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="red" stroke="yellow">
		<path d="M20.759 20.498c-2.342-3.663-5.575-6.958-5.743-11.498h-2.016c.173 5.212 3.512 8.539 5.953 12.356.143.302-.068.644-.377.644h-1.264l-4.734-7h-3.52c.873-1.665 1.85-3.414 1.936-6h-2.01c-.169 4.543-3.421 7.864-5.743 11.498-.165.347-.241.707-.241 1.057 0 1.283 1.023 2.445 2.423 2.445h13.153c1.4 0 2.424-1.162 2.424-2.446 0-.35-.076-.709-.241-1.056zm-4.759-15.498c0 1.105-.896 2-2 2s-2-.895-2-2 .896-2 2-2 2 .895 2 2zm-5-1.5c0 .829-.672 1.5-1.5 1.5s-1.5-.671-1.5-1.5.672-1.5 1.5-1.5 1.5.671 1.5 1.5zm0 3.5c0 .552-.447 1-1 1s-1-.448-1-1 .447-1 1-1 1 .448 1 1zm3-6c0 .552-.447 1-1 1s-1-.448-1-1 .447-1 1-1 1 .448 1 1z"/></svg>
  </div>
  <div
  	class="w-[200px] h-[200px] ring-2 rounded-4 bg-slate-500 border-2 border-yellow-500 my-4"
  	@click="testProc"
  >
    <img 
      :src="" 
      class="rounded m-4"
      width="200" 
      height="200"
    />  
  </div>
</template>

<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
  import { ref, reactive, onMounted } from "vue"
  import Nav from "./components/Nav.vue"
  import liwaGrid from "./components/liwaGrid.vue"
  import liwaDetail from "./components/liwaDetail.vue"
  import liwaMsg from "./components/liwaMsg.vue"
  import liwaConfig from "./components/liwaConfig.vue"
  import test_haveDetail from "./consumables/test_havedetail"

  const isMsg = ref(false)
  const isDetail = ref(false)
  const isConfig = ref(false)
  const detailTitle = ref('')
  const action = ref('view')
  const msgTitle = ref('')
  const msgBody = ref('')
  const modalType = ref(1)
  const liwaRowM = ref({})
  const mainGrid = ref(null)

  const showDetail = async (sID) => {
  	
  	const { getDetail, rowM, error, fetching } = test_haveDetail(sID)
  	await getDetail()
	if (sID !== "") {
      detailTitle.value = '修改員工聯絡資料'
      action.value = 'view'
	} else {
      detailTitle.value = '新增員工聯絡資料'
      action.value = 'add'
	}

	liwaRowM.value = rowM._object.rowM
	// 以上為權宜之計, 應自 test_haveDetail處修改
  	isDetail.value = true
  }

  const hideDetail = () => {
  	isDetail.value = false
  }

  const showMsg = (sTitle, sBody, iType = 1) => {
  	msgTitle.value = sTitle
  	msgBody.value = sBody
  	modalType.value = iType 
  	isMsg.value = true
  }

  const hideMsg = () => {
  	// const { initConfirm } = useMsgParam()
  	// initConfirm()
  	isMsg.value = false
  }

  const confirmOK = () => {
  	alert("Press the Confirm button")
  	isMsg.value = false
  }

  const showConfig = () => {
  	isConfig.value = true
  }

  const hideConfig = () => {
  	isConfig.value = false
  }

  const reloadGrid = () => {
  	// 重新載入列表
  	mainGrid.value.reload()
  }

  const testProc = () => {
  	console.log('Import photos')
  }

  // const showDropbox = () => {
  // 	const objDept = document.getElementById('dept')
  // 	const sID = objDept.getAttribute('data-id')
  // 	console.log('data-id in dept = ', sID)
  // 	const sValue = objDept.getAttribute('data-value')
  // 	console.log('data-value in dept = ', sValue)
  // }

</script>
