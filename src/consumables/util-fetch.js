import {toRefs, reactive} from "vue";

export default function utilFetch(url, options) {
  const state = reactive({
    response: [],
    error: null,
    fetching: false
  });
  const fetchData = async () => {
    state.fetching = true;
    try {
      const res = await fetch(url, options);
      const json = await res.json();
      state.response = json.people[0];
    } catch (errors) {
      state.error = errors;
    } finally {
      state.fetching = false;
    }
  };
  return {...toRefs(state), fetchData};
}