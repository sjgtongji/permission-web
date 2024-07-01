import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Modal, Result, Button, Form, DatePicker, Input, Select, Checkbox, InputNumber} from 'antd';
import styles from './style.less';
import CatagorySelector from '../../../components/SelectCatagory/index.jsx'
import GoodsSelector from '../../../components/SelectDKGoods/index.jsx'
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
  const [dkCatagoryId, setDkCatagoryId] = useState("");
  const [dkGoodsVisible, setDkGoodsVisible] = useState(false)
  useEffect(() => {
    if (form && !visible) {
      form.resetFields();
      setDkGoodsVisible(false)
    }
  }, [props.visible]);

  const handleSubmit = () => {
    let params = {
      dkCatagoryId: form.getFieldValue('dkCatagoryId'),
      dkGoodsId: form.getFieldValue('dkGoodsId'),
      quality: form.getFieldValue('quality')
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
        <CatagorySelector onCatagorySelected={onCatagorySelected}></CatagorySelector>

      </Form.Item>
    )
    if (dkGoodsVisible) {
      items.push(
        <Form.Item
          name='dkGoodsId'
          label='选择商品'
          rules={[
            {
              required: true,
              message: '请选择商品'
            }
          ]}>
          <GoodsSelector onGoodsSelected={onGoodsSelected} dkCatagoryId={dkCatagoryId} ></GoodsSelector>
        </Form.Item>
      )
    }
    items.push(
      <Form.Item
        name={'quality'}
        label={'购买数量'}
        rules={[{
          required: true,
          message: "购买数量为必填项"
        }]}>
        <InputNumber placeholder={'请输入购买数量'} min={0} style={{ width: '100%' }} />
      </Form.Item>
    )

    return items;
  }
  const onCatagorySelected = value => {
    console.log(value)
    form.setFieldsValue({
      dkCatagoryId: value
    });
    setDkCatagoryId(value)
    setDkGoodsVisible(true)
  }
  const onGoodsSelected = value => {
    form.setFieldsValue({
      dkGoodsId: value
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
