
import React from 'react';
import request from "@/utils/requestUtil";
import { Select } from 'antd';
import {
  GET_STORES_FOR_SELECT
} from "@/utils/constant";
class StoreSelector extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			storeList : []
		}
		this.onChange = this.onChange.bind(this)
		this.onFocus = this.onFocus.bind(this)
		this.onBlur = this.onBlur.bind(this)
		this.onSearch = this.onSearch.bind(this)
	}
  componentDidMount() {
    request(GET_STORES_FOR_SELECT, {}).then(res => {
			console.log(res)
			this.setState({
        storeList : res.data,
			})
		})
  }
	onChange(value) {
	  console.log(`selected ${value}`);
    this.props.onStoreSelected && this.props.onStoreSelected(value)
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
		this.state.storeList.forEach(row => {
			children.push(<Option value={row.id} key={row.id}>{row.name}</Option>)
		})
		return (
			<Select
				showSearch
				placeholder="选择门店"
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

export default StoreSelector
