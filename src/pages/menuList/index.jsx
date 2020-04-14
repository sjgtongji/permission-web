import {
  LOGIN,
  GET_PROJECTS,
  CREATE_PROJECT,
  MODIFY_PROJECT,
  BATCH_VALID_PROJECT,
  BATCH_UNVALID_PROJECT
} from "@/utils/constant";
import ProTable from '../../components/ProTable/index.jsx'
const MenuList = () => {
	const columns = [
    {
      title: "项目名称",
      dataIndex: "name",
      rules: [
        {
          required: true,
          message: "项目名称为必填项"
        }
      ]
    },
    {
      title: "公司名称",
      dataIndex: "companyName",
      rules: [
        {
          required: true,
          message: "公司名称为必填项"
        }
      ]
    },
    {
      title: "联系电话",
      dataIndex: "phone",
      rules: [
        {
          required: true,
          message: "联系电话为必填项"
        }
      ]
    },
    {
      title: "邮箱地址",
      dataIndex: "email",
      rules: [
        {
          required: true,
          message: "邮箱地址为必填项"
        }
      ]
    },
    {
      title: "项目创建时间",
      dataIndex: "createTime",
      sorter: true,
      valueType: "dateTime",
      hideInForm: true,
      hideInSearch: true
    }
  ];
	return (
		<ProTable
			columns = {columns}
			headerTitle = {'菜单列表'}
			queryUrl = {GET_PROJECTS}
			addUrl = {CREATE_PROJECT}
			updateUrl = {MODIFY_PROJECT}
			batchValidUrl = {BATCH_VALID_PROJECT}
			batchUnvalidUrl = {BATCH_UNVALID_PROJECT}></ProTable>
	)
}
export default MenuList;
