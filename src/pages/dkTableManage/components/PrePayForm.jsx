import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Modal, Result, Button, Form, DatePicker, Input, Select, Checkbox, InputNumber } from 'antd';
import styles from './style.less';
import CatagorySelector from '../../../components/SelectCatagory/index.jsx'
import GoodsSelector from '../../../components/SelectDKGoods/index.jsx'
import DKMemberSelector from '../../../components/SelectDKMember/index.jsx'
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
  const { done, visible, current, onCancel, onSubmit } = props;
  const [member, setMember] = useState(false);
  useEffect(() => {
    if (form && !visible) {
      form.resetFields();
      setMember(false)
    }
  }, [props.visible]);

  const handleSubmit = () => {
    let params = {
      member: form.getFieldValue('member'),
      dkMemberId: form.getFieldValue('dkMemberId'),
      valueForMinus: form.getFieldValue('valueForMinus'),
      minusDesc: form.getFieldValue('minusDesc')
    }
    onSubmit && onSubmit(params)
  };

  const handleFinish = values => {
    if (onSubmit) {
      onSubmit(values, current == null);
    }
  };
  const modalFooter = {
    okText: '确定',
    onOk: handleSubmit,
    onCancel,
  };
  const onCheckboxChange = value => {
    console.log(value)
    form.setFieldsValue({
      member: value.target.checked
    });
    setMember(value.target.checked)
  }
  const getFormItems = (current) => {
    let items = [];
    items.push(
      <Form.Item
        name='member'
        label='是否是会员'>
        <Checkbox onChange={onCheckboxChange} defaultChecked={false}></Checkbox>
      </Form.Item>
    )
    
    if (member) {
      items.push(
        <Form.Item
          name='dkMemberId'
          label='选择会员'>
          <DKMemberSelector onMemberSelected={onMemberSelected}></DKMemberSelector>
        </Form.Item>
      )
    }

    items.push(
      <Form.Item
        name={'valueForMinus'}
        label={'优惠金额'}>
        <InputNumber placeholder={'请输入优惠金额'} min={0} style={{ width: '100%' }} />
      </Form.Item>
    )
    items.push(
      <Form.Item
        name={'minusDesc'}
        label={'优惠原因'}>
        <Input placeholder='请输入优惠原因' />
      </Form.Item>
    )
    return items;
  }
  const onMemberSelected = value => {
    console.log(value)
    form.setFieldsValue({
      dkMemberId: value
    });
  }
  
  const getModalContent = () => {
    return (
      <Form {...formLayout} form={form} onFinish={handleFinish}>
        {getFormItems(current)}
      </Form>
    );
  };

  return (
    <Modal
      title={'选择商品'}
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
