import {
	GET_DKMENUS,
	CREATE_DKMENUS,
	MODIFY_DKMENUS
} from "@/utils/constant";
import ProTable from '../../components/ProTable/index.jsx'
import EditForm from './components/EditForm.jsx'
import { Button, Divider, Dropdown, Menu, message, Modal} from "antd";
import React, { useState, useRef } from "react";
import request from "@/utils/requestUtil";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useModel } from 'umi';
import { connect } from 'dva';
const { confirm } = Modal;
const MenuList = (props) => {
	const [modalVisible, handleModalVisible] = useState(false);
  const [current, setCurrent] = useState(undefined);
	const [done, setDone] = useState(false);
  const actionRef = useRef();
	const dataColumns = [
		{
      title: "id",
      dataIndex: "id",
      rules: [
        {
          required: false,
          message: "项目名称为必填项"
        }
      ],
			hideInForm: true,
      hideInSearch: true,
			hideInTable: true
    },
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
			dataIndex: "path",
			rules: [
				{
					required: true,
					message: "菜单名称为必填项"
				}
      ],
      hideInSearch: true
		},
    {
      title: "门店名称",
      dataIndex: "dkStoreName",
      rules: [
        {
          required: true,
          message: "门店为必填项"
        }
      ],
      hideInForm: true
    },
    {
      title: "权限等级",
      dataIndex: "permission",
      rules: [
        {
          required: true,
          message: "权限等级为必填项"
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
	]
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
								setCurrent(record);
								handleModalVisible(true);
							}}
						>
							修改
						</a>
					</>
				);
			}
		}
	]
	const handleAdd = async fields => {
    const hide = message.loading("正在新建");
    console.log(props)
	  try {
	    console.log(fields);
	    await request(CREATE_DKMENUS, {
		    method: "POST",
		    data: { ...fields, method: "post" , token : props.token}
		  });
	    hide();
	    message.success("新建成功");
	    return true;
	  } catch (error) {
	    console.log(error);
	    hide();
	    message.error("新建失败请重试！");
	    return false;
	  }
	};
	const handleUpdate = async fields => {
		const hide = message.loading("正在修改");
	  try {
	    console.log(fields);
	    await request(MODIFY_DKMENUS, {
		    method: "POST",
        data: { ...fields, method: "post", token: props.token}
		  });
	    hide();
	    message.success("修改成功");
	    return true;
	  } catch (error) {
	    console.log(error);
	    hide();
	    message.error("修改失败请重试！");
	    return false;
	  }
	}
	const handleBatchValid = async selectedRows => {
		// if (!selectedRows) return true;
	  // const hide = message.loading("正在启用");
	  // try {
	  //   await request(BATCH_VALID_PROJECT, {
		//     method: "POST",
		//     data: { ids: selectedRows.map(row => row.id)}
		//   });
	  //   hide();
	  //   message.success("启用成功，即将刷新");
		// 	actionRef && actionRef.current && actionRef.current.reload()
	  //   return true;
	  // } catch (error) {
	  //   console.log(error);
	  //   hide();
	  //   message.error("启用失败，请重试");
	  //   return false;
	  // }
	}
	/**
	 *  批量禁用
	 * @param selectedRows
	 */
	const handleBatchUnvalid = async selectedRows => {
	  // const hide = message.loading("正在禁用");
	  // if (!selectedRows) return true;
		//
	  // try {
	  //   await request(BATCH_UNVALID_PROJECT, {
		//     method: "POST",
		//     data: { ids: selectedRows.map(row => row.id)}
		//   });
	  //   hide();
		// 	actionRef && actionRef.current && actionRef.current.reload()
	  //   message.success("禁用成功，即将刷新");
	  //   return true;
	  // } catch (error) {
	  //   console.log(error);
	  //   hide();
	  //   message.error("禁用失败，请重试");
	  //   return false;
	  // }
	};

	const handleValid = async project => {
		const hide = message.loading(`正在上传数据`);
		project.valid = !project.valid;
		try {
	    await request(MODIFY_MENUS, {
		    method: "POST",
		    data: project
		  });
	    hide();
			actionRef && actionRef.current && actionRef.current.reload()
	    message.success("操作成功，即将刷新");
	    return true;
	  } catch (error) {
	    console.log(error);
	    hide();
	    message.error("操作失败，请重试");
	    return false;
	  }
	};
	const onAdd = () => {
    console.log("onAdd")
    console.log(props)
		setCurrent(undefined)
		handleModalVisible(true)
	}

	const onModify = (data) => {
		console.log("onModify")
		setCurrent(data);
		handleModalVisible(true)
	}
	const handleDone = () => {
		setDone(false);
		handleModalVisible(false);
	};

	const handleCancel = () => {
		setDone(false);
		handleModalVisible(false);
	};

	const handleSubmit = async (values, isAdd) => {
		console.log(values)
		console.log(isAdd)
		setDone(true);
		try {
			if(isAdd){
				await handleAdd(values)
			}else{
				await handleUpdate(values)
			}
			setDone(true)
			actionRef && actionRef.current && actionRef.current.reload()
		} catch (e) {
		}
	};
  return (
    <ProTable
			dataColumns={dataColumns}
			optionColumn={optionColumn}
			actionRef={actionRef}
			headerTitle={'菜单列表'}
			queryUrl={GET_DKMENUS}
			onAdd={onAdd}
			onModify={onModify}>
			<EditForm
				done={done}
				columns={dataColumns}
				current={current}
				visible={modalVisible}
				onDone={handleDone}
				onCancel={handleCancel}
				onSubmit={handleSubmit}
				/>
		</ProTable>
  );
}

export default connect(({ login }) => ({
  token: login.token,
}))(MenuList);
