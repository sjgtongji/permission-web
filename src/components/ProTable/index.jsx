import { DownOutlined, PlusOutlined ,CloseOutlined, CheckOutlined } from "@ant-design/icons";
import { Button, Divider, Dropdown, Menu, message, Modal} from "antd";
import React, { useState, useRef } from "react";
import { PageHeaderWrapper } from "@ant-design/pro-layout";
import ProTable from "@ant-design/pro-table";
import CreateForm from "./components/CreateForm";
import EditForm from "./components/EditForm";
import Switch from './components/Switch'
import request from "@/utils/requestUtil";
const { confirm } = Modal;
import { ExclamationCircleOutlined } from "@ant-design/icons";




const TableList = props => {
  const [sorter, setSorter] = useState("");
  const [createModalVisible, handleModalVisible] = useState(false);
	const [editModalvisible, handleEditModalVisible] = useState(false);
  const [editCurrent, setEditCurrent] = useState(undefined);
	const [done, setDone] = useState(false);


	// const handleDone = () => {
	// 	setDone(false);
	// 	handleEditModalVisible(false);
	// };
	//
	// const handleCancel = () => {
	// 	handleEditModalVisible(false);
	// };
	//
	// const handleSubmit = values => {
	// 	console.log(values)
	// 	setDone(true);
	// 	// dispatch({
	// 	// 	type: 'listBasicList/submit',
	// 	// 	payload: {
	// 	// 		id,
	// 	// 		...values,
	// 	// 	},
	// 	// });
	// };
	// const onValidChanged = record => {
	// 	console.log(record)
	// 	console.log(actionRef)
	// 	handleValid(record, actionRef);
	// }
  const {
		dataColumns,
		optionColumn,
		headerTitle,
		queryUrl,
		onAdd,
		onModify,
		onBatchValid,
		onBatchUnvalid,
		onDelete,
		onBatchDelete,
		onValidChange,
		children,
		actionRef,
    rowSelection,
    token
	} = props
	// const handleAdd = async fields => {
	//   const hide = message.loading("正在新建");
	//   try {
	//     console.log(fields);
	//     await request(addUrl, {
	// 	    method: "POST",
	// 	    data: { ...fields, method: "post" }
	// 	  });
	//     hide();
	//     message.success("新建成功");
	//     return true;
	//   } catch (error) {
	//     console.log(error);
	//     hide();
	//     message.error("新建失败请重试！");
	//     return false;
	//   }
	// };
	// /**
	//  * 更新节点
	//  * @param fields
	//  */
	//
	// const handleUpdate = async fields => {
	//   const hide = message.loading("正在配置");
	//
	//   try {
	//     await request(updateUrl, {
	// 	    method: "POST",
	// 	    data: fields
	// 	  });
	//     hide();
	//     message.success("配置成功");
	//     return true;
	//   } catch (error) {
	//     hide();
	//     message.error("配置失败请重试！");
	//     return false;
	//   }
	// };
	//
	// /**
	//  *  批量启用
	//  * @param selectedRows
	//  */
	//
	// const handleBatchValid = async selectedRows => {
	//   const hide = message.loading("正在启用");
	//   if (!selectedRows) return true;
	//
	//   try {
	//     await request(batchValidUrl, {
	// 	    method: "POST",
	// 	    data: { ids: selectedRows.map(row => row.id)}
	// 	  });
	//     hide();
	//     message.success("启用成功，即将刷新");
	//     return true;
	//   } catch (error) {
	//     console.log(error);
	//     hide();
	//     message.error("启用失败，请重试");
	//     return false;
	//   }
	// };
	// /**
	//  *  批量禁用
	//  * @param selectedRows
	//  */
	// const handleBatchUnvalid = async selectedRows => {
	//   const hide = message.loading("正在禁用");
	//   if (!selectedRows) return true;
	//
	//   try {
	//     await request(batchUnvalidUrl, {
	// 	    method: "POST",
	// 	    data: { ids: selectedRows.map(row => row.id)}
	// 	  });
	//     hide();
	//     message.success("禁用成功，即将刷新");
	//     return true;
	//   } catch (error) {
	//     console.log(error);
	//     hide();
	//     message.error("禁用失败，请重试");
	//     return false;
	//   }
	// };
	// const handleValid = (project, actionRef) => {
	//   console.log(project);
	//   confirm({
	//     title: project.valid ? "确认要禁用此项目?" : "确认要启用此项目?",
	//     icon: <ExclamationCircleOutlined />,
	//     content: "",
	//     onOk() {
	//       const hide = message.loading("正在修改");
	//       project.valid = !project.valid;
	// 			request(updateUrl, {
	// 		    method: "POST",
	// 		    data: project
	// 		  }).then(response => {
	//         console.log(response);
	//         hide();
	//         message.success("修改成功");
	//         if (actionRef.current) {
	//           actionRef.current.reload();
	//         }
	//       });
	//     },
	//     onCancel() {}
	//   });
	// };
	const validColmuns = [
		{
			title: "状态",
			dataIndex: "valid",
			hideInForm: true,
			hideInSearch: true,
			render: (_, record) => {
				return (
					<Switch data={record} onValueChange={onValidChange} />
				);
			}
		}
	]
	const defaultOptionColumn = [
		{
			title: "操作",
			dataIndex: "option",
			valueType: "option",
			render: (_, record) => {
				return (
					<>
						<a
							onClick={() => {
								onModify(record)
							}}
						>
							修改
						</a>
					</>
				);
			}
		}
	]

	const allColumns = dataColumns.concat(optionColumn? optionColumn : defaultOptionColumn)
  return (
    <PageHeaderWrapper>
      <ProTable
        headerTitle={headerTitle}
        actionRef={actionRef}
        rowKey="id"
        onChange={(_, _filter, _sorter) => {
          const sorterResult = _sorter;

          if (sorterResult.field) {
            setSorter(`${sorterResult.field}_${sorterResult.order}`);
          }
        }}
        params={{
          sorter,
          token: token
        }}
        toolBarRender={(action, { selectedRows }) => [
          <Button type="primary" onClick={() => onAdd()}>
            <PlusOutlined /> 新建
          </Button>,
          selectedRows && selectedRows.length > 0 && (
            <Dropdown
              overlay={
                <Menu
                  onClick={async e => {
                    if (e.key === "batchUnvalid") {
                      onBatchUnvalid(selectedRows)
                    } else if (e.key === "batchValid") {
											onBatchValid(selectedRows)
                    } else if(e.key === "batchDelete"){
											onBatchDelete(selectedRows)
										}
                  }}
                  selectedKeys={[]}
                >
                  <Menu.Item key="batchUnvalid">批量禁用</Menu.Item>
                  <Menu.Item key="batchValid">批量启用</Menu.Item>
									<Menu.Item key="batchDelete">批量删除</Menu.Item>
                </Menu>
              }
            >
              <Button>
                批量操作 <DownOutlined />
              </Button>
            </Dropdown>
          )
        ]}
        tableAlertRender={(selectedRowKeys, selectedRows) => (
          <div>
            已选择{" "}
            <a
              style={{
                fontWeight: 600
              }}
            >
              {selectedRows.length}
            </a>{" "}
            项&nbsp;&nbsp;
          </div>
        )}
        request={async params => {
          let result = await request(queryUrl, { params })
          return result;
        }}
        columns={allColumns}
        rowSelection={rowSelection ? {} : undefined}
      />
      {/* <CreateForm
        onCancel={() => handleModalVisible(false)}
        modalVisible={createModalVisible}
      >
        <ProTable
          onSubmit={async value => {
            const success = await handleAdd(value);

            if (success) {
              handleModalVisible(false);

              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          rowKey="id"
          type="form"
          columns={allColumns}
          rowSelection={{}}
        />
      </CreateForm>
			<CreateForm
        onCancel={() => handleEditModalVisible(false)}
        modalVisible={editModalvisible}
      >
        <ProTable
          onSubmit={async value => {
            const success = await handleAdd(value);

            if (success) {
              handleModalVisible(false);

              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          rowKey="id"
          type="form"
          columns={allColumns}
          rowSelection={editCurrent}
        />
      </CreateForm> */}
			{/* <EditForm
        done={done}
        current={editCurrent}
        visible={editModalvisible}
        onDone={handleDone}
        onCancel={handleCancel}
        onSubmit={handleSubmit}
      	/> */}
			{children}
    </PageHeaderWrapper>
  );
};

export default TableList;
