import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Modal, Result, Button, Form, DatePicker, Input, Select } from 'antd';
import styles from './style.less';
const ResultForm = props => {
  const { done, visible, current, onDone, onCancel, onSubmit, columns ,title , status} = props;
  return (
    <Modal
      title={'结果'}
      className={styles.standardListForm}
      width={640}
      visible={visible}
      onOk={onSubmit}
      onCancel={onCancel}>
      <Result
        status={status}
        title={title}
        subTitle=""
        className={styles.formResult}
      />
    </Modal>
  );
}

export default ResultForm;