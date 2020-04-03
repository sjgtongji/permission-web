import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Dropdown, Menu, message, Modal } from 'antd';
import React, { useState, useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import CreateForm from './components/CreateForm';
import UpdateForm from './components/UpdateForm';
import { queryRule, updateRule, addRule, removeRule } from './service';
const { confirm } = Modal;
import { ExclamationCircleOutlined } from '@ant-design/icons';
/**
 * 添加节点
 * @param fields
 */

const handleAdd = async fields => {
  const hide = message.loading('正在新建');

  try {
		console.log(fields)
    await addRule({ ...fields });
    hide();
    message.success('新建成功');
    return true;
  } catch (error) {
		console.log(error)
    hide();
    message.error('新建失败请重试！');
    return false;
  }
};
/**
 * 更新节点
 * @param fields
 */

const handleUpdate = async fields => {
  const hide = message.loading('正在配置');

  try {
    await updateRule({
      name: fields.name,
      desc: fields.desc,
      key: fields.key,
    });
    hide();
    message.success('配置成功');
    return true;
  } catch (error) {
    hide();
    message.error('配置失败请重试！');
    return false;
  }
};
/**
 *  删除节点
 * @param selectedRows
 */

const handleRemove = async selectedRows => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;

  try {
    await removeRule({
      key: selectedRows.map(row => row.key),
    });
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};

const handleValid = (project,actionRef) => {
	console.log(project)
	confirm({
	    title: project.valid ? '确认要禁用此项目?': '确认要启用此项目?',
	    icon: <ExclamationCircleOutlined />,
	    content: '',
	    onOk() {
				const hide = message.loading('正在修改');
				project.valid = !project.valid;
				updateRule(project).then(response => {
					console.log(response)
					hide();
					message.success('修改成功');
					if (actionRef.current) {
						actionRef.current.reload();
					}
				})
	    },
	    onCancel() {},
	  });
};

const TableList = () => {
  const [sorter, setSorter] = useState('');
  const [createModalVisible, handleModalVisible] = useState(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState(false);
  const [stepFormValues, setStepFormValues] = useState({});
  const actionRef = useRef();
  const columns = [
    {
      title: '项目名称',
      dataIndex: 'name',
      rules: [
        {
          required: true,
          message: '项目名称为必填项',
        },
      ],
    },
		{
      title: '公司名称',
      dataIndex: 'companyName',
      rules: [
        {
          required: true,
          message: '公司名称为必填项',
        },
      ],
    },
		{
			title: '联系电话',
			dataIndex: 'phone',
			rules: [
				{
					required: true,
					message: '联系电话为必填项',
				},
			],
		},
		{
			title: '邮箱地址',
			dataIndex: 'email',
			rules: [
				{
					required: true,
					message: '邮箱地址为必填项',
				},
			],
		},
    {
      title: '项目创建时间',
      dataIndex: 'createTime',
      sorter: true,
      valueType: 'dateTime',
      hideInForm: true,
			hideInSearch: true
    },
		{
      title: '状态',
      dataIndex: 'valid',
      hideInForm: true,
      valueEnum: {
        false : {
          text: '已禁用',
          status: 'Error',
        },
        true : {
          text: '启用中',
          status: 'Success',
        }
      }
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => {
				return (<>
          <a
            onClick={() => {
              handleUpdateModalVisible(true);
              setStepFormValues(record);
            }}
          >
            修改
          </a>
					<Divider type="vertical" />
					<a
						onClick={() => {
							handleValid(record,actionRef);
						}}
					>
						{record.valid ? "禁用" : "启用"}
					</a>
        </>
      )},
    },
  ];
  return (
    <PageHeaderWrapper>
      <ProTable
        headerTitle="项目列表"
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
        }}
        toolBarRender={(action, { selectedRows }) => [
          <Button type="primary" onClick={() => handleModalVisible(true)}>
            <PlusOutlined /> 新建
          </Button>,
          selectedRows && selectedRows.length > 0 && (
            <Dropdown
              overlay={
                <Menu
                  onClick={async e => {
                    if (e.key === 'remove') {
                      await handleRemove(selectedRows);
                      action.reload();
                    }
                  }}
                  selectedKeys={[]}
                >
                  <Menu.Item key="remove">批量删除</Menu.Item>
                  <Menu.Item key="approval">批量审批</Menu.Item>
                </Menu>
              }
            >
              <Button>
                批量操作 <DownOutlined />
              </Button>
            </Dropdown>
          ),
        ]}
        tableAlertRender={(selectedRowKeys, selectedRows) => (
          <div>
            已选择{' '}
            <a
              style={{
                fontWeight: 600,
              }}
            >
              {selectedRowKeys.length}
            </a>{' '}
            项&nbsp;&nbsp;
            <span>
              服务调用次数总计 {selectedRows.reduce((pre, item) => pre + item.callNo, 0)} 万
            </span>
          </div>
        )}
        request={params => {
					let result = queryRule(params); return result
				}}
        columns={columns}
        rowSelection={{}}
      />
      <CreateForm onCancel={() => handleModalVisible(false)} modalVisible={createModalVisible}>
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
          rowKey="name"
          type="form"
          columns={columns}
          rowSelection={{}}
        />
      </CreateForm>
      {stepFormValues && Object.keys(stepFormValues).length ? (
        <UpdateForm
          onSubmit={async value => {
            const success = await handleUpdate(value);

            if (success) {
              handleModalVisible(false);
              setStepFormValues({});

              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          onCancel={() => {
            handleUpdateModalVisible(false);
            setStepFormValues({});
          }}
          updateModalVisible={updateModalVisible}
          values={stepFormValues}
        />
      ) : null}
    </PageHeaderWrapper>
  );
};

export default TableList;
