import React, { useEffect } from 'react';
import moment from 'moment';
import { Modal, Result, Button, Form, DatePicker, Input, Select } from 'antd';
import styles from './style.less';
import ProjectSelector from '../../../components/SelectProject/index.jsx'
const { TextArea } = Input;
const formLayout = {
  labelCol: {
    span: 7,
  },
  wrapperCol: {
    span: 13,
  },
};

const EditForm = props => {
  const [form] = Form.useForm();
  const { done, visible, current, parent, onDone, onCancel, onSubmit , columns} = props;
  useEffect(() => {
    if (form && !visible) {
      form.resetFields();
    }
  }, [props.visible]);
  useEffect(() => {
		let fieldsValue = parent ? {...current, parentId : parent.id} : {...current}
		console.log(fieldsValue)
		form.setFieldsValue(fieldsValue);
  }, [props.current, props.parent]);

  const handleSubmit = () => {
    if (!form) return;
    form.submit();
  };

  const handleFinish = values => {
    if (onSubmit) {
      onSubmit(values, current == null);
    }
  };
	const onProjectSelected = value => {
		form.setFieldsValue({
			projectId : value
		});
	}
  const modalFooter = done
    ? {
        footer: null,
        onCancel: onDone,
      }
    : {
        okText: '保存',
        onOk: handleSubmit,
        onCancel,
      };
	const getFormItems = (columns, current) => {
		let items = [];
		columns.forEach(row => {
			if(!row.hideInForm){
				if(!row.valueType){
					items.push(
						<Form.Item
		          name={row.dataIndex}
		          label={row.title}
		          rules={row.rules}
		        >
		          <Input placeholder={row.placeholder} defaultValue={current ? current[row.dataIndex] : ''}/>
		        </Form.Item>
					)
				}
			}else if(row.dataIndex === 'id'){
				items.push(
					<div style={{ display: 'none'}}>
						<Form.Item
							name='id'
							label='id'
							rules={[
							{
								required: false,
								message: 'id'
							}
						]}>
						</Form.Item>
					</div>
				)
			}
		})
		items.push(
			<div style={{ display: 'none'}}>
				<Form.Item
					name='parentId'
					label='选择父菜单'
					rules={[
					{
						required: false,
						message: '选择父菜单'
					}
				]}>
				</Form.Item>
			</div>
		)
		items.push(
			<Form.Item
				name='projectId'
				label='选择项目'
				rules={[
				{
					required: true,
					message: '请选择项目'
				}
			]}>
				<ProjectSelector onProjectSelected={onProjectSelected} defaultValue={current ? current.projectId : ""}></ProjectSelector>
			</Form.Item>
		)
		return items;
	}
  const getModalContent = () => {
    if (done) {
      return (
        <Result
          status="success"
          title="操作成功"
          subTitle=""
          extra={
            <Button type="primary" onClick={onDone}>
              关闭
            </Button>
          }
          className={styles.formResult}
        />
      );
    }

    return (
      <Form {...formLayout} form={form} onFinish={handleFinish}>
        {getFormItems(columns, current)}
      </Form>
    );
  };

  return (
    <Modal
      title={done ? null : `${current ? '修改' : '新增'}`}
      className={styles.standardListForm}
      width={640}
      bodyStyle={
        done
          ? {
              padding: '72px 0',
            }
          : {
              padding: '28px 0 0',
            }
      }
      destroyOnClose
      visible={visible}
      {...modalFooter}
    >
      {getModalContent()}
    </Modal>
  );
};

export default EditForm;
