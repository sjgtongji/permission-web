import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Typography, Alert } from 'antd';
import styles from './Welcome.less';

const CodePreview = ({ children }) => (
  <pre className={styles.pre}>
    <code>
      <Typography.Text copyable>{children}</Typography.Text>
    </code>
  </pre>
);

export default () => (
  <PageHeaderWrapper>
    <Card>
      <Typography.Text strong>
        <a target="_blank" rel="noopener noreferrer" >
          欢迎使用欣悦台球俱乐部管理系统
        </a>
      </Typography.Text>
    </Card>
  </PageHeaderWrapper>
);
