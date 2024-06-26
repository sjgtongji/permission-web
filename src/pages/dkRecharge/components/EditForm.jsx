import React, { useEffect ,useState} from 'react';
import moment from 'moment';
import { Modal, Result, Button, Form, DatePicker, Input, Select, InputNumber} from 'antd';
import styles from './style.less';
import MemberSelector from '../../../components/SelectDKMember/index.jsx'
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
	const [menuVisible, setMenuVisible] = useState(false);
  const [dkMember, setDKMember] = useState({});
  const [rechargeValue, setRechargeValue] = useState(0)
  const [extraValue, setExtraValue] = useState(0)
  const [valueBeforeRecharge, setValueBeforeRecharge] = useState('')
  const [valueAfterRecharge, setValueAfterRecharge] = useState('')
  useEffect(() => {
    if (form && !visible) {
      form.resetFields();
    }
  }, [props.visible]);
  useEffect(() => {
		let fieldsValue = current != null ? {...current} : {...current};
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
    items.push(
      <Form.Item
        name={'rechargeValue'}
        label={'充值金额'}
        rules={[{
          required: true,
          message: "充值金额为必填项"
        }]}>
        <InputNumber placeholder={'请输入充值金额'} min={0} value={rechargeValue} style={{ width: '100%' }}/>
      </Form.Item>
    )
    items.push(
      <Form.Item
        name={'extraValue'}
        label={'赠送金额'}
        rules={[{
          required: true,
          message: "赠送金额为必填项"
        }]}>
        <InputNumber placeholder={'请输入赠送金额'} min={0} value={extraValue} style={{ width: '100%' }}/>
      </Form.Item>
    )
    items.push(
      <Form.Item
        name='dkMemberId'
        label='选择会员'
        rules={[
          {
            required: true,
            message: '选择会员'
          }
        ]}>
        <MemberSelector onMemberSelected={onMemberSelected}></MemberSelector>

      </Form.Item>
    )
    // items.push(
    //   <Form.Item
    //     name={'dkMemberId'}
    //     label={'选择会员'}
    //     rules={[{
    //       required: true,
    //       message: "会员为必填项"
    //     }]}>
    //     <Input placeholder={row.placeholder} defaultValue={current ? current[row.dataIndex] : ''} disabled={current && row.dataIndex === 'phone' ? true : false} />
    //   </Form.Item>
    // )
    // items.push(
    //   <Form.Item
    //     name={'dkMemberId'}
    //     label={'选择会员'}
    //     rules={[{
    //         required: true,
    //         message: "会员为必填项"
    //       }]}>
    //     <Input placeholder={row.placeholder} defaultValue={current ? current[row.dataIndex] : ''} disabled={current && row.dataIndex === 'phone' ? true : false} />
    //   </Form.Item>
    // )
		// columns.forEach(row => {
		// 	if(!row.hideInForm){
		// 		if(!row.valueType){
		// 			items.push(
		// 				<Form.Item
		//           name={row.dataIndex}
		//           label={row.title}
		//           rules={row.rules}
		//         >
		//           <Input placeholder={row.placeholder} defaultValue={current ? current[row.dataIndex] : ''} disabled={current && row.dataIndex === 'phone'? true : false}/>
		//         </Form.Item>
		// 			)
		// 		}
		// 	}else if(row.dataIndex === 'id'){
		// 		items.push(
		// 			<div style={{ display: 'none'}}>
		// 				<Form.Item
		// 					name='id'
		// 					label='id'
		// 					rules={[
		// 					{
		// 						required: false,
		// 						message: 'id'
		// 					}
		// 				]}>
		// 				</Form.Item>
		// 			</div>
		// 		)
		// 	}
    // })

		return items;
  }
  const onMemberSelected = value => {
    form.setFieldsValue({
      dkMemberId: value
    });

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
      title={'会员充值'}
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
