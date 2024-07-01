
import React from 'react';
import request from "@/utils/requestUtil";
import { Select } from 'antd';
import {
  GET_DKGOODS_FOR_SELECT
} from "@/utils/constant";
import { connect } from 'dva';
class RoleSelector extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			roleList : []
		}
		this.onChange = this.onChange.bind(this)
		this.onFocus = this.onFocus.bind(this)
		this.onBlur = this.onBlur.bind(this)
		this.onSearch = this.onSearch.bind(this)
	}
  componentDidMount() {
    let params = { token: this.props.token, dkCatagoryId: this.props.dkCatagoryId};
    request(GET_DKGOODS_FOR_SELECT, { params }).then(res => {
			console.log(res)
			this.setState({
				roleList : res.data,
			})
		})
  }
	onChange(value) {
	  console.log(`selected ${value}`);
    this.props.onGoodsSelected && this.props.onGoodsSelected(value)
	}

	onBlur() {
	  console.log('blur');
	}

	onFocus() {
	  console.log('focus');
	}

	onSearch(val) {
	  console.log('search:', val)
	}
  render() {
		let {defaultValue} = this.props
		let children = []
		let {roleList} = this.state;
		roleList.forEach(row => {
			children.push(<Option value={row.id} key={row.id}>{row.name}</Option>)
		})
		return (
			<Select
				showSearch
				placeholder="选择商品"
				optionFilterProp="children"
				onChange={this.onChange}
				onFocus={this.onFocus}
				onBlur={this.onBlur}
				onSearch={this.onSearch}
				filterOption={(input, option) =>{
					return option.children.match(input)
				}}
				defaultValue={defaultValue}
				disabled={this.props.disabled != null ? this.props.disabled : false}>
				{children}
			</Select>
		)
  }
}
export default connect(({ login }) => ({
  token: login.token,
}))(RoleSelector);
