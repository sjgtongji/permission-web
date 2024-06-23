import React, { useEffect , useState} from 'react';
import moment from 'moment';
import { Modal, Result, Button, Form, DatePicker, Input, Select } from 'antd';
import styles from './style.less';
import DKRoleSelector from '../../../components/SelectDKRole/index.jsx'
import StoreSelector from '../../../components/SelectStore/index.jsx'
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
	const [dkRoleVisible, setDKRoleVisible] = useState(false);
  const [dkStoreId, setDkStoreId] = useState("");
  useEffect(() => {
    if (form && !visible) {
      form.resetFields();
      setDKRoleVisible(false)
    }
  }, [props.visible]);
  useEffect(() => {
		let fieldsValue = parent ? {...current} : {...current}
		console.log(fieldsValue)
		form.setFieldsValue(fieldsValue);
		if(current != null){
      setDkStoreId(current.dkStoreId)
		}
  }, [props.current]);

  const handleSubmit = () => {
    if (!form) return;
    form.submit();
  };

  const handleFinish = values => {
    if (onSubmit) {
      onSubmit(values, current == null);
    }
  };
	const onStoreSelected = value => {
		form.setFieldsValue({
			dkStoreId : value
    });
    console.log(value, 'onStoreSelected')
    setDkStoreId(value)
    setDKRoleVisible(true)
	}
	const onRoleSelected = value => {
		form.setFieldsValue({
			dkRoleId : value
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
			<Form.Item
				name='dkStoreId'
				label='选择门店'
				rules={[
				{
					required: true,
					message: '请选择门店'
				}
			]}>
        <StoreSelector onStoreSelected={onStoreSelected} defaultValue={current ? current.dkStoreId : ""} disabled={current ? true : false}></StoreSelector>
			</Form.Item>
		)
    if (dkRoleVisible || current){
			items.push(
				<Form.Item
					name='dkRoleId'
					label='选择角色'
					rules={[
					{
						required: true,
						message: '请选择角色'
					}
				]}>
          <DKRoleSelector onRoleSelected={onRoleSelected} defaultValue={current ? current.dkRoleId : ""} dkStoreId={dkStoreId} disabled={current ? true : false}></DKRoleSelector>
				</Form.Item>
			)
		}

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
