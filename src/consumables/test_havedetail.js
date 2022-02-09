import {ref, toRefs, reactive} from "vue"
import utilFetch from './util-fetch'

export default function test_haveDetail(sID) {
	let objData = reactive({
		rowM:[],
		error: null,
		fetching:false
	})

	const getDetail = async () => {
		const {response, error, fetchData, fetching} = utilFetch('http://localhost:8102/tmp_havePeople.php?mainID='+sID, {})
		await fetchData()
		objData.rowM = response
		objData.error = error
		objData.fetching = fetching	
	}
	return {getDetail, ...toRefs(objData)}
}
