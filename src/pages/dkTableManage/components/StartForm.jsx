
import React, { useEffect ,useState} from 'react';
import moment from 'moment';
import { Modal, Result, Button, Form, DatePicker, Input, Select } from 'antd';
import styles from './style.less';
const StartForm = props => {
  const [form] = Form.useForm();
  const { done, visible, current, onDone, onCancel, onSubmit, columns } = props;
  useEffect(() => {
    if (form && !visible) {
      form.resetFields();
    }
  }, [props.visible]);
  useEffect(() => {
    let fieldsValue = current != null ? { ...current } : { ...current };
    form.setFieldsValue(fieldsValue);
  }, [props.current]);
  return (
    <Modal
      title={'确认开台'}
      className={styles.standardListForm}
      width={640}
      visible={visible}
      onOk={onSubmit}
      onCancel={onCancel}>
      <span className="ant-form-text">{current ? `确认${current.name}开始计费吗?` : ''}</span>
    </Modal>
  );
}

export default StartForm;