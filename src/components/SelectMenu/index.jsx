
import React from 'react';
import request from "@/utils/requestUtil";
import { Select } from 'antd';
import {
  GET_MENUS_FOR_SELECT
} from "@/utils/constant";
import { Tree } from 'antd';

const { TreeNode } = Tree;
class MenuSelector extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			expandedKeys : [],
			checkedKeys: [],
			selectedKeys: [],
			autoExpandParent: true,
			treeData:[]
		}
		this.onExpand = this.onExpand.bind(this)
		this.onCheck = this.onCheck.bind(this)
		this.onSelect = this.onSelect.bind(this)
	}
  componentDidMount() {
    request(GET_MENUS_FOR_SELECT, {}).then(res => {
			console.log(res)
			// this.setState({
			// 	projectList : res.data,
			// 	displayList : res.data
			// })
			this.setState({
				checkedKeys: res.checkedKeys,
				treeData:res.data
			})
		})
  }
	onExpand(expandedKeys){
	    console.log('onExpand', expandedKeys);
	    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
	    // or, you can remove all expanded children keys.
			this.setState({
				expandedKeys : expandedKeys,
				autoExpandParent : true
			})
	  };

	onCheck(checkedKeys){
	  console.log('onCheck', checkedKeys);
		this.setState({
			checkedKeys : checkedKeys
		})
		this.props.onMenuSelect(checkedKeys)
	};

	onSelect(selectedKeys, info){
		console.log('onSelect', info);
		this.setState({
			selectedKeys : selectedKeys
		})
	};
  render() {
		return (
			<Tree
	      checkable
	      onExpand={this.onExpand}
	      expandedKeys={this.state.expandedKeys}
	      autoExpandParent={this.state.autoExpandParent}
	      onCheck={this.onCheck}
	      checkedKeys={this.state.checkedKeys}
	      onSelect={this.onSelect}
	      selectedKeys={this.state.selectedKeys}
	      treeData={this.state.treeData}
    	/>
		)
  }
}

export default MenuSelector
