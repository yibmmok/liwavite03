<template>
<div class="absolute z-10 inset-x-0 w-screen h-screen overflow-hidden items-center justify-center" style="top:64px;height:calc(100vh - 79px);">
    <div class="flex justify-center w-full h-screen items-start bg-gray-200 antialiased">
      <div class="flex flex-col mt-4 w-11/12 sm:w-5/6 lg:w-1/2 max-w-2xl mx-auto rounded-lg border border-gray-300 shadow-xl">
        <div class="relative flex flex-row justify-between p-6 bg-white border-b border-gray-200 rounded-tl-lg rounded-tr-lg text-center ">
          <div class="absolute w-40 h-10 p-1 top-[15px]">
            <div class="top-icon add"
              @click="clearInput"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="#fee" viewBox="-1 -1 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke="#fee" stroke-linejoin="round" stroke-width="6" d="M12 4v16m8-8H4" />
              </svg>              
            </div>
            <div class="top-icon config"
                 @click="showConfigPanel"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" viewBox="-1 -1 20 20" fill="#fee">
                <path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM7 13a4 4 0 100-6 4 4 0 000 6z" clip-rule="evenodd" />
              </svg>             
            </div>
            <div class="top-icon btnTest" @click="descShowTest1"></div>
          </div>
          <div class="w-8 h-full bg-white"></div>
          <p class="font-semibold text-gray-800">{{ state.detailTitle }}</p>
          <div class="w-8 h-full bg-white cursor-pointer">
            <svg
              class="w-6 h-6 float-left"
              fill="red"
              stroke="red"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              @click.prevent="closeDetail()"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>              
          </div>
          <div v-if="isSave" class="absolute w-15 h-10 p-1 top-[18px] right-12 cursor-pointer" title="menu">
            <svg 
              class="w-6 w-6 float-left mr-4"
              fill="#090"
              stroke="#090"
              xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24"
              @click.prevent="saveDetail()"
            >
              <path d="M0 12.116l2.053-1.897c2.401 1.162 3.924 2.045 6.622 3.969 5.073-5.757 8.426-8.678 14.657-12.555l.668 1.536c-5.139 4.484-8.902 9.479-14.321 19.198-3.343-3.936-5.574-6.446-9.679-10.251z"/>
            </svg>
          </div>
        </div>
        <form class="flex flex-col px-6 py-5 bg-gray-50" >
          <div class="relative flex flex-col h-full max-w-lg mx-auto bg-gray-800 rounded-lg mb-4 cursor-pointer">
            <img 
              :src="state.rowM.image" 
              class="rounded m-4"
              width="200" 
              height="200"
            />
          </div>
          <div class="liwa-edit-00">
              <span class="liwa-label even">姓名</span>
              <input
                id="name"
                type="text"
                name="name"
                placeholder="輸入員工姓名"
                class="border border-2 rounded-r px-4 py-2 w-5/6"
                v-model="state.rowM.name"
                @change="showSaveBtn"
              />
          </div>          
          <div class="liwa-edit-00">
              <span class="liwa-label odd">職稱</span>
              <input
                id="title"
                type="text"
                name="title"
                placeholder="輸入員工職稱"
                class="border border-2 rounded-r px-4 py-2 w-5/6"
                v-model="state.rowM.title"
                @change="showSaveBtn"
              />
          </div> 
          <div class="liwa-edit-00">
              <span class="liwa-label even">所屬部門</span>
              <liwaSelectBox
                ref="compDept"
                id="department"
                class="h-full"
                :splaceholder="deptDefault"
                :smainid="state.rowM.deptID"
                :svalue="state.rowM.department"
                :itemsdata="items"
                @itemChange="itemChange"
              />
          </div> 
          <div class="liwa-edit-00">
              <span class="liwa-label odd">角色</span>
              <input           
                id="role"
                type="text"
                name="role"
                placeholder="輸入員工角色"
                class="border border-2 rounded-r px-4 py-2 w-5/6"
                v-model="state.rowM.role"
                @change="showSaveBtn"
              />
          </div> 
          <div class="liwa-edit-00">
              <span class="liwa-label even">Email</span>
              <input           
                id="email"
                type="text"
                name="email"
                placeholder="輸入員工Email"
                class="border border-2 rounded-r px-4 py-2 w-5/6"
                v-model="state.rowM.email"
                @change="showSaveBtn"          
              />
          </div>     
        </form>      
      </div>
    </div>
</div>
</template>

<script setup>
import { ref, reactive, toRefs, onMounted } from "vue"
import liwaSelectBox from "./liwaSelectBox.vue"

const dataMain = ref([])
const isSave = ref(false)
const deptDefault = ref('請設定所屬部門')
const items = ref([]) // liwaSelectBox的資料來源
const compDept = ref(null)

const props = defineProps({
  detailTitle: {
    type: String,
    default:''
  },
  liwaRowM: {
    type: Array,
    default: []
  },
  action: {
    type: String,
    required: true,
    default:''
  }
})

const state = reactive({
  detailTitle: props.detailTitle,
  rowM: props.liwaRowM,
  action: props.action
})

const emits = defineEmits(["hideDetail", "showMsg", "showConfig", "reloadGrid"])

const showSaveBtn = () => {
    // 若為 view mode 改為 edit mode & isSave = true
    if (state.action == 'view') {
        if (isSave.value == false) isSave.value = true
        state.action = 'edit'
    }
}

const itemChange = () => {
  showSaveBtn()
}

const loaditems = async () => {
  try {
     let data = await fetch("http://localhost:8102/tmp_haveD1.php?mainID=")
      if (!data.ok) {
        throw Error('無法載入資料')
      }
     let res = await data.json()
     items.value = res.items    
  }
  catch (err) {
      error.value = err.message
      console.log(error.value)
  }
}

const saveDetail = async () => {
    let keydata = {
        mainID: state.rowM.mainID,
        name: state.rowM.name,
        title: state.rowM.title,
        deptID: state.rowM.deptID,
        department: state.rowM.department,
        role: state.rowM.role,
        email: state.rowM.email,
        image: state.rowM.image,
        action: state.action
    }
    // let datastr = JSON.stringify(keydata)
    // console.log('datastr = ', datastr)

    let url = 'http://localhost:8102/tmp_test01CUD.php'
    const request = new Request (
        url, {
            method: "POST",
            mode: "cors",
            cache: "default",
            headers: new Headers({
                'Content-Type': 'application/json; charset=utf-8'
            }),
            body: JSON.stringify(keydata)
        }
    )

    const res = await fetch(request)
    const data = await res.json()
    state.action = 'view'
    // 重新 run liwaGrid 的load()
    emits("reloadGrid")
    let msg = data.message
    if (msg == '') {
        isSave.value = false
    } else {
        emits("showMsg")
    }
}

const clearInput = () => {
  state.detailTitle = '新增員工聯絡資料'
  state.rowM.name = ''
  state.rowM.title = ''
  state.rowM.deptID = ''
  state.rowM.department = ''
  state.rowM.role = ''
  state.rowM.email = ''
  state.rowM.image = ''
  compDept.value.resetValue(state.rowM.deptID)
  isSave.value = true

}

const closeDetail = () => {
    emits("hideDetail")
}

const showConfigPanel = () => {
  console.log('Show liwaConfig')
  emits("showConfig")
}

onMounted(async () => {
  loaditems()

  if (state.action !== 'add') {
      isSave.value = false
  } else {
      isSave.value = true
  }  
})


</script>

<style>

</style>
