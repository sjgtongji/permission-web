import { DownOutlined, PlusOutlined ,CloseOutlined, CheckOutlined, PropertySafetyFilled } from "@ant-design/icons";
import { Button, Divider, Dropdown, Menu, message, Modal} from "antd";
import React, { useState, useRef } from "react";
import { PageHeaderWrapper } from "@ant-design/pro-layout";
import ProTable from '../../components/ProTable/index.jsx'
import EditForm from "./components/EditForm.jsx";
import request from "@/utils/requestUtil";
import {
  GET_DKTABLES,
  CREATE_DKTABLE,
  MODIFY_DKTABLE
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
      title: "球台名称",
      dataIndex: "name",
      rules: [
        {
          required: true,
          message: "球台名称为必填项"
        }
      ]
    },
    {
      title: "单价(元)",
      dataIndex: "price",
      rules: [
        {
          required: true,
          message: "单价为必填项"
        }
      ],
      hideInSearch: true
    },
    {
      title: "收费间隔(分钟)",
      dataIndex: "payInterval",
      rules: [
        {
          required: true,
          message: "收费间隔默认为15分钟"
        }
      ],
      hideInSearch: true
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
      let result = await request(CREATE_DKTABLE, {
		    method: "POST",
		    data: { ...fields, method: "post" , token : props.token}
      });
      console.log(result)
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
      await request(MODIFY_DKTABLE, {
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
			headerTitle={'球台列表'}
      queryUrl={GET_DKTABLES}
			onAdd={onAdd}
			onModify={onModify}
      token={props.token}>
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
