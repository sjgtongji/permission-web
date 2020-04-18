import {
	GET_MENUS,
	CREATE_MENUS,
	MODIFY_MENUS,
	DELETE_MENUS
} from "@/utils/constant";
import ProTable from '../../components/ProTable/index.jsx'
import ProjectSelector from '../../components/SelectProject/index.jsx'
import EditForm from './components/EditForm.jsx'
import { Button, Divider, Dropdown, Menu, message, Modal} from "antd";
import React, { useState, useRef } from "react";
import request from "@/utils/requestUtil";
import { ExclamationCircleOutlined } from "@ant-design/icons";
const { confirm } = Modal;
const MenuList = () => {
	const [modalVisible, handleModalVisible] = useState(false);
  const [current, setCurrent] = useState(undefined);
	const [done, setDone] = useState(false);
	const [parent, setParent] = useState(undefined);
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
			dataIndex: "url",
			rules: [
				{
					required: true,
					message: "菜单名称为必填项"
				}
			]
		},
		{
			title: "组件路径",
			dataIndex: "component",
			rules: [
				{
					required: true,
					message: "组件路径为必填项"
				}
			],
			hideInSearch: true,
			hideInTable: true
		},
		{
			title: "项目名称",
			dataIndex: "projectName",
			hideInForm: true,
			rules: [
				{
					required: true,
					message: "请选择项目"
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
								setParent(undefined)
								handleModalVisible(true);
							}}
						>
							修改
						</a>
						<Divider type="vertical" />
						<a
							onClick={() => {
								setCurrent(undefined);
								setParent(record)
								handleModalVisible(true);
							}}
						>
							新建子菜单
						</a>
						<Divider type="vertical" />
						<a
							onClick={() => {
								onDelete(record)
							}}
						>
							删除
						</a>
					</>
				);
			}
		}
	]
	const handleAdd = async fields => {
	  const hide = message.loading("正在新建");
	  try {
	    console.log(fields);
	    await request(CREATE_MENUS, {
		    method: "POST",
		    data: { ...fields, method: "post" }
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
	    await request(MODIFY_MENUS, {
		    method: "POST",
		    data: { ...fields, method: "post" }
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
		setCurrent(undefined)
		setParent(undefined)
		handleModalVisible(true)
	}

	const onModify = (data) => {
		console.log("onModify")
		setParent({id : data.parentId})
		setCurrent(data);
		handleModalVisible(true)
	}
	const onBatchValid = async (rows) => {
		if (!rows) return true;
		console.log(rows)
		try {
			handleBatchValid(rows)
		} catch (error) {
			console.log(error);
		}
	}
	const onBatchUnvalid = (rows) => {
		console.log("onBatchUnvalid")
		console.log(rows)
		if (!rows) return true;
		try {
			handleBatchUnvalid(rows)
		} catch (error) {
			console.log(error);
		}
	}
	const onBatchDelete = (rows) => {
		console.log("onBatchDelete")
		console.log(rows)
	}
	const onDelete = (data) => {
		console.log("onDelete")
		console.log(data)
		confirm({
			title: "确认要删除此项目?",
			icon: <ExclamationCircleOutlined />,
			content: "",
			onOk() {
				const hide = message.loading("正在删除");
				request(DELETE_MENUS, {
					method: "POST",
					data: data
				}).then(response => {
					console.log(response);
					hide();
					message.success("删除成功");
					if (actionRef.current) {
						actionRef.current.reload();
					}
				})
			},
			onCancel() {}
		});
	}
	const onValidChange = (data) => {
		console.log("onValidChange")
		console.log(data)
		try {
			handleValid(data)
		} catch (error) {
			console.log(error);
		}
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
			queryUrl={GET_MENUS}
			onAdd={onAdd}
			onModify={onModify}
			onBatchValid={onBatchValid}
			onBatchUnvalid={onBatchUnvalid}
			onDelete={onDelete}
			onBatchDelete={onBatchDelete}
			onValidChange={onValidChange}>
			<EditForm
				done={done}
				columns={dataColumns}
				current={current}
				parent={parent}
				visible={modalVisible}
				onDone={handleDone}
				onCancel={handleCancel}
				onSubmit={handleSubmit}
				/>
		</ProTable>
  );
}
export default MenuList;
