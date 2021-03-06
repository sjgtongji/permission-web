import request from "@/utils/requestUtil";
import sysRequest from "@/utils/request";
import {
  LOGIN,
  GET_PROJECTS,
  CREATE_PROJECT,
  MODIFY_PROJECT,
  BATCH_VALID_PROJECT,
  BATCH_UNVALID_PROJECT
} from "@/utils/constant";
export async function queryRule(params) {
  // console.log(params)
  // return new Promise((resolve , reject) => {
  // 	request(GET_PROJECTS,{
  //     params,
  //   }).then(response => {
  // 		console.log(response)
  // 		if(response.code && response.code === 200){
  // 			resolve(response.data)
  // 		}else{
  // 			resolve({})
  // 		}
  // 	});
  // })
  return request(GET_PROJECTS, { params });
}
export async function batchUnvalid(params) {
  console.log(params);
  return request(BATCH_UNVALID_PROJECT, {
    method: "POST",
    data: { ids: params }
  });
}
export async function batchValid(params) {
  console.log(params);
  return request(BATCH_VALID_PROJECT, {
    method: "POST",
    data: { ids: params }
  });
}
export async function addRule(params) {
  return request(CREATE_PROJECT, {
    method: "POST",
    data: { ...params, method: "post" }
  });
}
export async function updateRule(params) {
  console.log(params);
  return sysRequest(MODIFY_PROJECT, {
    method: "POST",
    data: params
  });
}
