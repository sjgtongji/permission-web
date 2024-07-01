import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Modal, Result, Button, Form, DatePicker, Input, Select, Checkbox, InputNumber, Table} from 'antd';
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
  const { done, visible, current, onCancel, onSubmit , order} = props;
  const [dkCatagoryId, setDkCatagoryId] = useState("");
  const [dkGoodsVisible, setDkGoodsVisible] = useState(false)

  const columns = [
    {
      title: '商品名称',
      dataIndex: 'dkGoodsName',
    },
    {
      title: '商品单价',
      dataIndex: 'price',
    },
    {
      title: '商品数量',
      dataIndex: 'quality',
    },
    {
      title: '总价',
      dataIndex: 'totalPrice',
    },
    {
      title: '购买时间',
      dataIndex: 'createTime',
      valueType: "dateTime",
    },
  ];
  useEffect(() => {
    if (form && !visible) {
      form.resetFields();
    }
  }, [props.visible]);
  useEffect(() => {
    
  }, [props.visible]);

  const handleSubmit = () => {
    // let fieldsValue = form.getFieldsValue
    // let params = {
    //   dkCatagoryId: form.getFieldValue('dkCatagoryId'),
    //   dkGoodsId: form.getFieldValue('dkGoodsId'),
    //   quality: form.getFieldValue('quality')
    // }
    // props.onSubmit && props.onSubmit(params)
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
    if(!order){
      return []
    }
    let items = [];
    let timestamp = new Date().getTime();
    let period = timestamp - order.startTime;
    console.log(period)
    let hour = Math.floor(period / (60 * 1000 * 60))
    let min = Math.floor(period / (1000 * 60) - hour * 60);
    let showText = '已开台'
    if (hour > 0 && min > 0) {
      showText = `已开台${hour}小时${min}分钟`
    } else if (min > 0) {
      showText = `已开台${min}分钟`
    }
    items.push(
      <Form.Item
        name='period'
        label='开台时长'>
        
        <span className="ant-form-text">{showText}</span>

      </Form.Item>
    )

    items.push(
      <Form.Item
        name={'table'}
        label={'商品'}>
        
        <Table columns={columns} dataSource={order.goods} size="small" pagination={false}/>
      </Form.Item>
    )

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
      title={'开台明细'}
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
