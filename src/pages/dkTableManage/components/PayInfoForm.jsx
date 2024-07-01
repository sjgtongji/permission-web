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
  const { done, visible, current, onCancel, onSubmit , payInfo} = props;
  useEffect(() => {
    if (form && !visible) {
      form.resetFields();
    }
  }, [props.visible]);

  const handleSubmit = () => {
    let params = {
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
  const getFormItems = (current) => {
    let items = [];
    if(!payInfo){
      return items
    }
    items.push(
      <Form.Item
        name='payType'
        label='结账方式'>
        <span className="ant-form-text">{payInfo.member ? '会员卡结账' : '现金结账'}</span>
      </Form.Item>
    )
    items.push(
      <Form.Item
        name='originValue'
        label={payInfo.member ? '台费原价': '台费和商品总价'}>
        <span className="ant-form-text">{payInfo.originValue}</span>
      </Form.Item>
    )
    items.push(
      <Form.Item
        name='valueForMinus'
        label='台费优惠金额'>
        <span className="ant-form-text">{payInfo.valueForMinus}</span>
      </Form.Item>
    )
    items.push(
      <Form.Item
        name='valueByCash'
        label='现金支付金额'>
        <span className="ant-form-text">{payInfo.valueByCash}</span>
      </Form.Item>
    )
    if(payInfo.member){
      items.push(
        <Form.Item
          name='valueByCard'
          label='会员卡应扣款金额'>
          <span className="ant-form-text">{payInfo.valueByCard}</span>
        </Form.Item>
      )
      items.push(
        <Form.Item
          name='dkMemberName'
          label='会员姓名'>
          <span className="ant-form-text">{payInfo.dkMemberName}</span>
        </Form.Item>
      )
      items.push(
        <Form.Item
          name='dkMemberPhone'
          label='会员电话'>
          <span className="ant-form-text">{payInfo.dkMemberPhone}</span>
        </Form.Item>
      )
      items.push(
        <Form.Item
          name='dkMemberValue'
          label='会员卡当前余额'>
          <span className="ant-form-text">{payInfo.dkMemberValue}</span>
        </Form.Item>
      )
      items.push(
        <Form.Item
          name='dkMemberValue'
          label='会员卡是否足够支付'>
          <span className="ant-form-text">{payInfo.dkMemberValue - payInfo.valueByCard >= 0 ? '足够支付' : '会员卡余额不足'}</span>
        </Form.Item>
      )
      if (payInfo.dkMemberValue - payInfo.valueByCard < 0){
        items.push(
          <Form.Item
            name='dkMemberValue'
            label='会员卡还需充值'>
            <span className="ant-form-text">{payInfo.valueByCard - payInfo.dkMemberValue}</span>
          </Form.Item>
        )
      }
      
    }
    return items;
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
      title={'结账信息'}
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
