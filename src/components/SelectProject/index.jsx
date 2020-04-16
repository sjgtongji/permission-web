
import React from 'react';
import request from "@/utils/requestUtil";
import { Select } from 'antd';
import {
  GET_PROJECTS_FOR_SELECT
} from "@/utils/constant";
class ProjectSelector extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			projectList : [],
			displayList: []
		}
		this.onChange = this.onChange.bind(this)
		this.onFocus = this.onFocus.bind(this)
		this.onBlur = this.onBlur.bind(this)
		this.onSearch = this.onSearch.bind(this)
	}
  componentDidMount() {
    request(GET_PROJECTS_FOR_SELECT, {}).then(res => {
			console.log(res)
			this.setState({
				projectList : res.data,
				displayList : res.data
			})
		})
  }
	onChange(value) {
	  console.log(`selected ${value}`);
		this.props.onProjectSelected && this.props.onProjectSelected(value)
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
		let { displayList } = this.state
		let {defaultValue} = this.props
		let children = []
		displayList.forEach(row => {
			children.push(<Option value={row.id} key={row.id}>{row.name}</Option>)
		})
		return (
			<Select
				showSearch
				placeholder="选择项目"
				optionFilterProp="children"
				onChange={this.onChange}
				onFocus={this.onFocus}
				onBlur={this.onBlur}
				onSearch={this.onSearch}
				filterOption={(input, option) =>{
					return option.children.match(input)
				}}
				defaultValue={defaultValue}>
				{children}
			</Select>
		)
  }
}

export default ProjectSelector
