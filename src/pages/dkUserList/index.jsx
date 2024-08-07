import { DownOutlined, PlusOutlined ,CloseOutlined, CheckOutlined, PropertySafetyFilled } from "@ant-design/icons";
import { Button, Divider, Dropdown, Menu, message, Modal} from "antd";
import React, { useState, useRef } from "react";
import { PageHeaderWrapper } from "@ant-design/pro-layout";
import ProTable from '../../components/ProTable/index.jsx'
import EditForm from "./components/EditForm.jsx";
import request from "@/utils/requestUtil";
import {
  GET_USERS,
	CREATE_USER,
  MODIFY_DKUSER,
  CREATE_DKUSER,
  GET_DKUSERS
} from "@/utils/constant";
const { confirm } = Modal;
import { connect } from 'dva';
import { ExclamationCircleOutlined } from "@ant-design/icons";




const TableList = (props) => {
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
          message: ""
        }
      ],
			hideInForm: true,
      hideInSearch: true,
			hideInTable: true
    },
    {
      title: "用户名称",
      dataIndex: "userName",
      rules: [
        {
          required: true,
          message: "用户名称为必填项"
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
      title: "门店",
      dataIndex: "dkStoreName",
      rules: [
        {
          required: true,
          message: "门店为必填项"
        }
      ],
      hideInForm : true
    },
    {
      title: "角色",
      dataIndex: "dkRoleName",
      rules: [
        {
          required: true,
          message: "角色为必填项"
        }
      ],
      hideInForm: true
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
	const handleAdd = async fields => {
	  const hide = message.loading("正在新建");
	  try {
	    console.log(fields);
	    await request(CREATE_DKUSER, {
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
      await request(MODIFY_DKUSER, {
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
		if (!selectedRows) return true;
	  const hide = message.loading("正在启用");
	  try {
	    await request(BATCH_VALID_USER, {
		    method: "POST",
		    data: { ids: selectedRows.map(row => row.id)}
		  });
	    hide();
	    message.success("启用成功，即将刷新");
			actionRef && actionRef.current && actionRef.current.reload()
	    return true;
	  } catch (error) {
	    console.log(error);
	    hide();
	    message.error("启用失败，请重试");
	    return false;
	  }
	};
	/**
	 *  批量禁用
	 * @param selectedRows
	 */
	const handleBatchUnvalid = async selectedRows => {
	  const hide = message.loading("正在禁用");
	  if (!selectedRows) return true;

	  try {
	    await request(BATCH_UNVALID_USER, {
		    method: "POST",
		    data: { ids: selectedRows.map(row => row.id)}
		  });
	    hide();
			actionRef && actionRef.current && actionRef.current.reload()
	    message.success("禁用成功，即将刷新");
	    return true;
	  } catch (error) {
	    console.log(error);
	    hide();
	    message.error("禁用失败，请重试");
	    return false;
	  }
	};

	const handleValid = async val => {
		const hide = message.loading(`正在上传数据`);
		val.valid = !val.valid;
		try {
	    await request(MODIFY_USER, {
		    method: "POST",
		    data: val
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
		handleModalVisible(true)
	}

	const onModify = (data) => {
		console.log("onModify")
		setCurrent(data);
		handleModalVisible(true)
	}
	const onBatchValid = async (rows) => {
		if (!rows) return true;
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
	const onBatchDelete = async (rows) => {
		console.log("onBatchDelete")
		console.log(rows)
		const hide = message.loading(`正在删除`);
		try {
	    await request(BATCH_DELETE_USER, {
		    method: "POST",
		    data: { ids: rows.map(row => row.id)}
		  });
	    hide();
			actionRef && actionRef.current && actionRef.current.reload()
	    message.success("删除成功，即将刷新");
	    return true;
	  } catch (error) {
	    console.log(error);
	    hide();
	    message.error("删除失败，请重试");
	    return false;
	  }
	}
	const onDelete = async (data) => {
		console.log("onDelete")
		console.log(data)
		const hide = message.loading(`正在删除`);
		try {
	    await request(DELETE_USER, {
		    method: "POST",
		    data: data
		  });
	    hide();
			actionRef && actionRef.current && actionRef.current.reload()
	    message.success("删除成功，即将刷新");
	    return true;
	  } catch (error) {
	    console.log(error);
	    hide();
	    message.error("删除失败，请重试");
	    return false;
	  }
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
		// setDone(true);
		try {
			var result = false;
			if(isAdd){
				result = await handleAdd(values)
			}else{
				result = await handleUpdate(values)
			}
			setDone(result)
			actionRef && actionRef.current && actionRef.current.reload()
		} catch (e) {
		}
	};
  return (
    <ProTable
			dataColumns={dataColumns}
			actionRef={actionRef}
			headerTitle={'用户列表'}
			queryUrl={GET_DKUSERS}
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
};

export default connect(({ login }) => ({
  token: login.token,
}))(TableList);
