import { DownOutlined, PlusOutlined ,CloseOutlined, CheckOutlined, PropertySafetyFilled } from "@ant-design/icons";
import { Button, Divider, Dropdown, Menu, message, Modal, List, Skeleton, Switch, Card, Icon, Avatar, Popconfirm} from "antd";
const { Meta } = Card;
import React, { useState, useRef, useEffect } from "react";
import { PageHeaderWrapper } from "@ant-design/pro-layout";
import ProTable from '../../components/ProTable/index.jsx'
import request from "@/utils/requestUtil";
import StartForm from "./components/StartForm.jsx";
import GoodsForm from "./components/GoodsForm.jsx";
import ReadForm from "./components/ReadForm.jsx";
import PrePayForm from "./components/PrePayForm.jsx";
import PayInfoForm from "./components/PayInfoForm.jsx";
import ResultForm from "./components/ResultForm.jsx";
import {
  GET_DKTABLES,
  TABLE_ORDER_START,
  TABLE_ORDER_BUY,
  TABLE_ORDER_PAYINFO,
  TABLE_ORDER_END,
  TABLE_ORDER_READ
} from "@/utils/constant";
const { confirm } = Modal;
import { connect } from 'dva';
import { ExclamationCircleOutlined } from "@ant-design/icons";

import styles from './components/style.less';
const moment = require('moment')

const TableList = (props) => {
  const [startModalVisible, setStartModalVisible] = useState(false);
  const [goodsModalVisible, setGoodsModalVisible] = useState(false);
  const [readModalVisible, setReadModalVisible] = useState(false);
  const [prepayModalVisible, setPrePayModalVisible] = useState(false)
  const [payInfoModalVisible, setPayInfoModalVisible] = useState(false)
  const [current, setCurrent] = useState(undefined);
  const [payInfo, setPayInfo] = useState(undefined)
  const [readOrder, setReadOrder] = useState(undefined)
  const [resultTitle, setResultTitle] = useState('');
  const [resultStatus , setResultStatus] = useState('success');  
  const actionRef = useRef();
  const [tables, setTables] = useState([]);

  useEffect(() => {
    loadTables();
  }, []);
  const loadTables = () => {
    let params = { token: props.token };
    request(GET_DKTABLES, { params }).then(res => {
      console.log(res)
      setTables(res.data)
    })
  }
  const onStart = (table) => {
    console.log(table)
    setCurrent(table)
    setStartModalVisible(true)
  }
  const onRead = (table) => {
    console.log(table)
    
    request(TABLE_ORDER_READ, {
      method: "POST",
      data: { method: "post", token: props.token, dkTableId: table.id }
    }).then((result) => {
      console.log(result)
      for(var i in result.goods){
        result.goods[i].createTime = moment(result.goods[i].createTime).format('YYYY-MM-DD HH:mm:ss')
      }
      setReadOrder(result)
      setReadModalVisible(true)
    }, error => {
      message.error(error.message);
    });
  }
  const onBuy = (table) => {
    console.log(table)
    setCurrent(table)
    setGoodsModalVisible(true)
  }
  const onEnd = (table) => {
    console.log(table)
    setCurrent(table)
    setPrePayModalVisible(true)
  }

  const onStartConfirm = async () => {
    request(TABLE_ORDER_START, {
      method: "POST",
      data: {method: "post", token: props.token, dkTableId : current.id}
    }).then((result) => {
      console.log(result)
      message.success('开台成功');
      setCurrent(undefined)
      setStartModalVisible(false)
      loadTables();
    }, error => {
        message.error(error.message);
        setCurrent(undefined)
        setStartModalVisible(false)
    });
    
  }
  const onReadCancel = () => {
    setReadModalVisible(false)
  };

  const onReadSubmit = (values) => {
    console.log(values)
    setReadModalVisible(false)
    // setDone(true);
  };
  const onPrepayCancel = () => {
    setPrePayModalVisible(false)
    setCurrent(undefined)
  };

  const onPrepaySubmit = (values) => {
    console.log(values)
    request(TABLE_ORDER_PAYINFO, {
      method: "POST",
      data: { method: "post", token: props.token, dkTableId: current.id, ...values}
    }).then((result) => {
      console.log(result)
      message.success('提交成功');
      setPrePayModalVisible(false)
      setPayInfo(result)
      setPayInfoModalVisible(true)
    }, error => {
      message.error(error.message);
      setCurrent(undefined)
      setPrePayModalVisible(false)
    });
  };
  const onPayInfoCancel = () => {
    setPayInfoModalVisible(false)
    setCurrent(undefined)
    setPayInfo(undefined)
  };

  const onPayInfoSubmit = (values) => {
    console.log(values)
    request(TABLE_ORDER_END, {
      method: "POST",
      data: { method: "post", token: props.token, dkTableId: current.id}
    }).then((result) => {
      console.log(result)
      message.success('购买成功');
      setCurrent(undefined)
      setPayInfoModalVisible(false)
      loadTables();
    }, error => {
      message.error(error.message);
      setCurrent(undefined)
      setPayInfoModalVisible(false)
    });
  };
  const onBuyCancel = () => {
    setGoodsModalVisible(false)
  };
  const onBuySubmit = (values) => {
    console.log(values)
    request(TABLE_ORDER_BUY, {
      method: "POST",
      data: { method: "post", token: props.token, dkTableId: current.id , dkGoodsId : values.dkGoodsId, quality : values.quality}
    }).then((result) => {
      console.log(result)
      message.success('购买成功');
      setCurrent(undefined)
      setGoodsModalVisible(false)
      loadTables();
    }, error => {
      message.error(error.message);
      setCurrent(undefined)
      setStartModalVisible(false)
    });
    // setDone(true);
  };
  const onStartCancel = () => {
    setCurrent(undefined)
    setStartModalVisible(false)
  }
  const renderItem = (item) => {
    let actions = item.opened ? [
      <Button type="primary" onClick={(event) => onRead(item)}>
        查看计费信息
      </Button>,
      <Button onClick={(event) => onBuy(item)}>
        购买商品
      </Button>,
      <Button type="danger" onClick={(event) => onEnd(item)}>
        结账
      </Button>
    ] : [
        <Button type="primary" onClick={(event) => onStart(item)}>
          开台
        </Button>
      ];
    let timestamp = new Date().getTime();
    let period = timestamp - item.startTime;
    console.log(period)
    let hour = Math.floor(period / (60 * 1000 * 60))
    let min = Math.floor(period / (1000 * 60) - hour * 60);
    let showText = '已开台'
    if(hour > 0 && min > 0){
      showText = `已开台${hour}小时${min}分钟`
    }else if(min > 0){
      showText = `已开台${min}分钟`
    }
    let metaTitle = item.opened ? showText : item.booked ?  '已预订' : '空闲中'
    let metaDes = item.price + '/小时'
    return (
      <List.Item>
        <Card title={item.name}
          actions={actions}>
          <Meta
            title={metaTitle}
            description={metaDes}
          />
        </Card>

      </List.Item>
    )
  }
  return (
    <div style={{width : '100%' , height: '100%'}}>
      <List
        grid={{ gutter: 16, column: 3 }}
        dataSource={tables}
        renderItem={renderItem}>
      </List>
      <StartForm
        current={current}
        visible={startModalVisible}
        onCancel={() => onStartCancel()}
        onSubmit={() => onStartConfirm()}
        />
      <GoodsForm
        current={current}
        visible={goodsModalVisible}
        onCancel={() => onBuyCancel()}
        onSubmit={(values) => onBuySubmit(values)}
      />
      <ReadForm
        current={current}
        visible={readModalVisible}
        onCancel={() => onReadCancel()}
        onSubmit={(values) => onReadSubmit(values)}
        order={readOrder}
      />
      <PrePayForm
        visible={prepayModalVisible}
        current={current}
        onCancel={() => onPrepayCancel()}
        onSubmit={(values) => onPrepaySubmit(values)}></PrePayForm>
      <PayInfoForm
        visible={payInfoModalVisible}
        current={current}
        payInfo={payInfo}
        onCancel={() => onPayInfoCancel()}
        onSubmit={(values) => onPayInfoSubmit(values)}></PayInfoForm>
    </div>
    
  );
};

export default connect(({ login }) => ({
  token: login.token,
}))(TableList);
