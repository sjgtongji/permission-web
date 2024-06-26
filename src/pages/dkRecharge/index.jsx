import { DownOutlined, PlusOutlined ,CloseOutlined, CheckOutlined, PropertySafetyFilled } from "@ant-design/icons";
import { Button, Divider, Dropdown, Menu, message, Modal} from "antd";
import React, { useState, useRef } from "react";
import { PageHeaderWrapper } from "@ant-design/pro-layout";
import ProTable from '../../components/ProTable/index.jsx'
import EditForm from "./components/EditForm.jsx";
import request from "@/utils/requestUtil";
import {
  GET_DKRECHARGES,
  CREATE_DKRECHARGE
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
      title: "会员电话号码",
      dataIndex: "dkMemberPhone",
      rules: [
        {
          required: true,
          message: "电话号码为必填项"
        }
      ],
      hideInForm: true
    },
    {
      title: "会员姓名",
      dataIndex: "dkMemberName",
      rules: [
        {
          required: true,
          message: "会员姓名为必填项"
        }
      ],
      hideInForm: true
    },
    {
      title: "充值金额",
      dataIndex: "rechargeValue",
      hideInForm: true,
      hideInSearch: true
    },
    {
      title: "赠送金额",
      dataIndex: "extraValue",
      hideInForm: true,
      hideInSearch: true
    },
    {
      title: "本次充值前卡内余额",
      dataIndex: "valueBeforeRecharge",
      hideInForm: true,
      hideInSearch: true
    },
    {
      title: "本次充值后卡内余额",
      dataIndex: "valueAfterRecharge",
      hideInForm: true,
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
      let result = await request(CREATE_DKRECHARGE, {
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
      await request(MODIFY_DKMEMBER, {
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
			headerTitle={'会员充值列表'}
      queryUrl={GET_DKRECHARGES}
			onAdd={onAdd}
			onModify={onModify}
      token={props.token}
      hideOptionColumn={true}>
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
