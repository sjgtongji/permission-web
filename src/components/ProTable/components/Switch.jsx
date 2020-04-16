import { DownOutlined, PlusOutlined ,CloseOutlined, CheckOutlined } from "@ant-design/icons";
import { Switch } from "antd";
import React, { useState } from "react";
const MySwitch = props => {
	const [loading, setLoading] = useState(false);
	const {
		data,
		onValueChange
	} = props;
	const onValidChange = checked => {
		setLoading(true)
		onValueChange && onValueChange(data)
	}
	return (
		<Switch checked={data.valid} onChange={onValidChange} checkedChildren={<CheckOutlined />}
				unCheckedChildren={<CloseOutlined />}/>
	)
}
export default MySwitch;
