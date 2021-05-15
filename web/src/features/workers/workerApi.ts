import axios from "axios";
import * as constant from '../../common/constants'

const instance = axios.create({
  baseURL: constant.url,
});

export const getAllWorkers = async () => {
  const { data } = await instance.get(constant.workerGetAll, {withCredentials: true});
  return data;
};

export const getWorker = async (id:any) => {
  const { data } = await instance.get(`${constant.worker}/${id}`, {withCredentials: true});
  return data;
};

export const deleteWorker = async (id:any) => {
  const { data } = await instance.delete(`${constant.worker}/${id}`, {withCredentials: true});
  return data;
};

export const createWorker = async (person:any) => {
  const { data } = await instance.post(`${constant.worker}`,person, {withCredentials: true});
  return data;
};

export const updateWorker = async (person:any) => {
  const { data } = await instance.put(`${constant.worker}`,person, {withCredentials: true});
  return data;
};