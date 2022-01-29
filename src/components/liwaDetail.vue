<template>
<div class="absolute z-10 inset-x-0 w-screen h-screen overflow-hidden items-center justify-center" style="top:64px;height:calc(100vh - 79px);">
    <div class="flex justify-center w-full h-screen items-start bg-gray-200 antialiased">
      <div class="flex flex-col mt-4 w-11/12 sm:w-5/6 lg:w-1/2 max-w-2xl mx-auto rounded-lg border border-gray-300 shadow-xl">
        <div class="relative flex flex-row justify-between p-6 bg-white border-b border-gray-200 rounded-tl-lg rounded-tr-lg text-center ">
          <div class="absolute w-40 h-10 p-1 top-[15px]">
            <div class="top-icon add"></div>
            <div class="top-icon config"></div>
            <div class="top-icon btnTest" @click="descShowTest1"></div>
          </div>
          <div class="w-8 h-full bg-white"></div>
          <p class="font-semibold text-gray-800">{{ detailTitle }}</p>
          <div class="w-8 h-full bg-white cursor-pointer">
            <svg
              class="w-6 h-6 float-left"
              fill="red"
              stroke="red"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              @click.prevent="sendToMaster()"
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
              :src="dataMain.image" 
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
                v-model="dataMain.name"
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
                v-model="dataMain.title"
                @change="showSaveBtn"
              />
          </div> 
          <div class="liwa-edit-00">
              <span class="liwa-label even">所屬部門</span>
              <input           
                id="department"
                type="text"
                name="department"
                placeholder="輸入員工所屬部門"
                class="border border-2 rounded-r px-4 py-2 w-5/6"
                v-model="dataMain.department"
                @change="showSaveBtn"
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
                v-model="dataMain.role"
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
                v-model="dataMain.email"
                @change="showSaveBtn"          
              />
          </div>     
        </form>      
      </div>
    </div>
</div>
</template>

<script setup>
import { ref, reactive, toRefs, inject } from "vue"

const dataMain = ref([])
const isSave = ref(false)

const props = defineProps({
  detailTitle: {
    type: String,
    default:''
  },
  mainID: {
    type: String,
    default: ''
  },
  action: {
    type: String,
    required: true,
    default:''
  }
})

const state = reactive({
  detailTitle: props.detailTitle,
  mainID: props.mainID,
  action: props.action
})

const emits = defineEmits(["toggleModal"])

const descShowTest = inject('showTest')

const descShowTest1 = () => {
    console.log('Run in grand child element~')
    descShowTest()
}

const showSaveBtn = () => {
    // 若為 view mode 改為 edit mode & isSave = true
    if (state.mainID !== '') {
        if (isSave.value == false) isSave.value = true
        state.action = 'edit'
    }
}

const saveDetail = async () => {
    let keydata = {
        mainID: state.mainID,
        name: dataMain.value.name,
        title: dataMain.value.title,
        department: dataMain.value.department,
        role: dataMain.value.role,
        email: dataMain.value.email,
        image: dataMain.value.image,
        action: state.action
    }
    let datastr = JSON.stringify(keydata)
    console.log('datastr = ', datastr)

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
    console.log('request = ', request)

    const res = await fetch(request)
    const data = await res.json()
    let msg = data.message
    if (msg == '') {
        isSave.value = false
    } else {
        alert('存檔錯誤; 訊息:'+msg)
    }
}

const sendToMaster = () => {
    emits("hideDetail")
}

const haveDetail = async (sID) => {
    try {
     let data = await fetch("http://localhost:8102/tmp_havePeople.php?mainID="+sID)
      if (!data.ok) {
        throw Error('無法載入資料')
      }
     let testData = await data.json()
     dataMain.value = testData.people[0]
    }
    catch (err) {
        error.value = err.message
        console.log(error.value)
    }
}

if (props.mainID !== '') {
    haveDetail(state.mainID)
    isSave.value = false
} else {
    isSave.value = true
}

</script>

<style>

</style>
