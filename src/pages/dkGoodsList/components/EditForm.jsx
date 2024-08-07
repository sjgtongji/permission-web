import React, { useEffect ,useState} from 'react';
import moment from 'moment';
import { Modal, Result, Button, Form, DatePicker, Input, Select, Checkbox } from 'antd';
import styles from './style.less';
import CatagorySelector from '../../../components/SelectCatagory/index.jsx'
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
  const { done, visible, current, onDone, onCancel, onSubmit , columns} = props;
  const [dkCatagoryId, setDkCatagoryId] = useState("");
  useEffect(() => {
    if (form && !visible) {
      form.resetFields();
    }
  }, [props.visible]);
  useEffect(() => {
    let fieldsValue = current != null ? { ...current } : { ...current , payByCash: true};
		console.log(fieldsValue)
		form.setFieldsValue(fieldsValue);
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
        name='payByCash'
        label='是否现金支付'>
        <Checkbox onChange={onCheckboxChange} defaultChecked={current ? current.payByCash : true}></Checkbox>

      </Form.Item>
    )
    items.push(
      <Form.Item
        name='dkCatagoryId'
        label='选择商品类别'
        rules={[
          {
            required: true,
            message: '选择商品类别'
          }
        ]}>
        <CatagorySelector onCatagorySelected={onCatagorySelected} defaultValue={current ? current.dkCatagoryId : ""} disabled={current ? true : false}></CatagorySelector>

      </Form.Item>
    )

		return items;
  }

  const onCheckboxChange = value => {
    console.log(value)
    form.setFieldsValue({
      payByCash: value.target.checked
    });
  }
  const onCatagorySelected = value => {
    console.log(value)
    form.setFieldsValue({
      dkCatagoryId: value
    });
    setDkCatagoryId(value)
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
