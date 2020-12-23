
import LuiLoading from "./LuiLoading.vue"
import Scroll from "./scroll.vue"
import LuiRow from "./LuiRow.vue"
import LuiInputTag from "./LuiInputTag"
import LuiInputIcon from "./LuiInputIcon"
import LuiCheckbox from "./LuiCheckbox"
import LuiCheckboxGroup from "./LuiCheckboxGroup.vue"
import LuiRadioGroup from "./LuiRadioGroup.vue"
import LuiSwitch from "./LuiSwitch.vue"
import LuiSelect from "./LuiSelect.vue"
import LuiDatetime from "./LuiDatetime"
import LuiFileImg from "./LuiFileImg"
import LuiFileSelect from "./LuiFileSelect"
import LuiColor from "./LuiColor"
import LuiStar from "./LuiStar"
import LuiTable from "./LuiTable"
import LuiTablePaging from "./LuiTablePaging"
import LuiTree from "./LuiTree"
import LuiLayer from "./LuiLayer"
import LuiPopupBody from "./LuiPopupBody"

const arr = {
  LuiLoading,
  Scroll,
  LuiRow,
  LuiInputTag,
  LuiInputIcon,
  LuiCheckbox,
  LuiCheckboxGroup,    
  LuiRadioGroup,
  LuiSwitch,
  LuiSelect,
  LuiDatetime,
  LuiFileImg,
  LuiFileSelect,
  LuiColor,
  LuiStar,
  LuiTable,
  LuiTablePaging,
  LuiTree,
  LuiLayer,
  LuiPopupBody
}
  
const components = {
  install: function (Vue) {
    for (let key in arr) {
      console.log(key)
      Vue.component(key, arr[key])
    }
  }
}

export default components