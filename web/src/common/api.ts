import axios from "axios";
import * as constant from './constants'

const instance = axios.create({
  baseURL: constant.url,
});

export const getOnCriteria = async (criteriaa:any, getAllAddress: string) => {
  const { data } = await instance.post(getAllAddress, criteriaa, {withCredentials: true});
  return data;
};

export const getAll = async (getAllAddress: string) => {
  const { data } = await instance.get(getAllAddress, {withCredentials: true});
  return data;
};

export const getData = async (id: any, address: string) => {
  const { data } = await instance.get(`${address}/${id}`, {withCredentials: true});
  return data;
};

export const deleteData = async (id: any, address: string) => {
  const { data } = await instance.delete(`${address}/${id}`, {withCredentials: true});
  return data;
};

export const createData = async (sendData: any, address: string) => {
  const { data } = await instance.post(`${address}`, sendData, {withCredentials: true});
  console.log(data)
  return data;
};

export const updateData = async (sendData: any, address: string) => {
  const { data } = await instance.put(`${address}`, sendData, {withCredentials: true});
  return data;
};