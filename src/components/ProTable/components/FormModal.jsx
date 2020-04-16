import React from "react";
import { Modal } from "antd";

const FormModal = props => {
  const { modalVisible, onCancel, columns , data} = props;
	const [form] = Form.useForm();
  const { done, visible, current, onDone, onCancel, onSubmit } = props;
  useEffect(() => {
    if (form && !visible) {
      form.resetFields();
    }
  }, [props.visible]);
  useEffect(() => {
    if (current) {
      form.setFieldsValue({
        ...current,
        createdAt: current.createdAt ? moment(current.createdAt) : null,
      });
    }
  }, [props.current]);

  const handleSubmit = () => {
    if (!form) return;
    form.submit();
  };

  const handleFinish = values => {
    if (onSubmit) {
      onSubmit(values);
    }
  };
	const children = [];
	columns.forEach(val => {
		let comp = null
		if()
	})
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
			const getModalContent = () => {
		    if (done) {
		      return (
		        <Result
		          status="success"
		          title="操作成功"
		          subTitle=""
		          extra={
		            <Button type="primary" onClick={onDone}>
		              知道了
		            </Button>
		          }
		          className={styles.formResult}
		        />
		      );
		    }

		    return (
		      <Form {...formLayout} form={form} onFinish={handleFinish}>

		        <Form.Item
		          name="name"
		          label="项目名称"
		          rules={[
		            {
		              required: true,
		              message: '请输入项目名称',
		            },
		          ]}
		        >
		          <Input placeholder="请输入项目名称" />
		        </Form.Item>
						<Form.Item
		          name="companyName"
		          label="公司名称"
		          rules={[
		            {
		              required: true,
		              message: '请输入公司名称',
		            },
		          ]}
		        >
		          <Input placeholder="请输入公司名称" />
		        </Form.Item>
						<Form.Item
		          name="phone"
		          label="联系电话"
		          rules={[
		            {
		              required: true,
		              message: '请输入联系电话',
		            },
		          ]}
		        >
		          <Input placeholder="请输入联系电话" />
		        </Form.Item>
						<Form.Item
							name="email"
							label="邮箱地址"
							rules={[
								{
									required: true,
									message: '请输入邮箱地址',
								},
							]}>
							<Input placeholder="请输入邮箱地址" />
						</Form.Item>
		      </Form>
		    );
		  };

  return (
    <Modal
      destroyOnClose
      title={data != null ? '修改' : '新建'}
      visible={modalVisible}
      onCancel={() => onCancel()}
      footer={null}
    >
      {props.children}
    </Modal>
  );
};

export default FormModal;
