import axios from "axios";
import * as constant from './constants'

const instance = axios.create({
  baseURL: constant.url,
});

export const getAll = async (getAllAddress: string) => {
  const { data } = await instance.get(getAllAddress);
  return data;
};

export const getData = async (id: any, address: string) => {
  const { data } = await instance.get(`${address}/${id}`);
  return data;
};

export const deleteData = async (id: any, address: string) => {
  const { data } = await instance.get(`${address}/${id}`);
  return data;
};

export const createData = async (person: any, address: string) => {
  const { data } = await instance.post(`${address}`, person);
  return data;
};

export const updateData = async (person: any, address: string) => {
  const { data } = await instance.put(`${address}`, person);
  return data;
};