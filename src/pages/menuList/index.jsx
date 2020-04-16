import {
  LOGIN,
  GET_PROJECTS,
  CREATE_PROJECT,
  MODIFY_PROJECT,
  BATCH_VALID_PROJECT,
  BATCH_UNVALID_PROJECT,
	GET_MENUS
} from "@/utils/constant";
import ProTable from '../../components/ProTable/index.jsx'
import ProjectSelector from '../../components/SelectProject/index.jsx'
import { Button, Divider, Dropdown, Menu, message, Modal} from "antd";
const MenuList = () => {
	// const columns = [
  //   {
  //     title: "项目名称",
  //     dataIndex: "name",
  //     rules: [
  //       {
  //         required: true,
  //         message: "项目名称为必填项"
  //       }
  //     ]
  //   },
  //   {
  //     title: "公司名称",
  //     dataIndex: "companyName",
  //     rules: [
  //       {
  //         required: true,
  //         message: "公司名称为必填项"
  //       }
  //     ]
  //   },
  //   {
  //     title: "联系电话",
  //     dataIndex: "phone",
  //     rules: [
  //       {
  //         required: true,
  //         message: "联系电话为必填项"
  //       }
  //     ]
  //   },
  //   {
  //     title: "邮箱地址",
  //     dataIndex: "email",
  //     rules: [
  //       {
  //         required: true,
  //         message: "邮箱地址为必填项"
  //       }
  //     ]
  //   },
  //   {
  //     title: "项目创建时间",
  //     dataIndex: "createTime",
  //     sorter: true,
  //     valueType: "dateTime",
  //     hideInForm: true,
  //     hideInSearch: true
  //   }
  // ];
	const dataColumns = [
		{
			title: "菜单名称",
			dataIndex: "name",
			rules: [
				{
					required: true,
					message: "菜单名称为必填项"
				}
			]
		},
		{
			title: "菜单路径",
			dataIndex: "url",
			rules: [
				{
					required: true,
					message: "菜单名称为必填项"
				}
			]
		},
		{
			title: "创建时间",
			dataIndex: "createTime",
			sorter: true,
			valueType: "dateTime",
			hideInForm: true,
			hideInSearch: true
		}
	];
	const optionColumn = [
		{
			title: "操作",
			dataIndex: "option",
			valueType: "option",
			render: (_, record) => {
				return (
					<>
						<a
							onClick={() => {
								handleEditModalVisible(true);
								setEditCurrent(record);
							}}
						>
							修改
						</a>
						<Divider type="vertical" />
						<a
							onClick={() => {

							}}
						>
							新建子菜单
						</a>
					</>
				);
			}
		}
	]
	//		<ProjectSelector></ProjectSelector>
	return (
		<ProTable dataColumns={dataColumns} headerTitle={'菜单列表'} queryUrl={GET_MENUS}></ProTable>


	)
}
export default MenuList;
