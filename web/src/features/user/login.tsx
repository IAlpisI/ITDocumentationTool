import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import {loginUser, userSelector} from "./userSlice"

const Login = () => {

    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const {error, status} = useSelector(userSelector);
    
    const onSubmit = (data:any) => {
        console.log(data)
      dispatch(loginUser(data));
    };
  
    // useEffect(() => {
    //   return () => {
    //     dispatch(clearState());
    //   };
    // }, [dispatch]);
  
    useEffect(() => {
        console.log(status);
      if (status==='failed') {
        console.log(error)
        console.log("nepavyko")
        // dispatch(clearState());
      }
  
      if (status==='completed') {
          console.log("testinis");
        // dispatch(clearState());
      }
    }, [dispatch, error, status]);

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input {...register("email")} />
                <input type="password" {...register("password")} />

                <input type="submit" />
            </form>
        </div>
    )
}

export default Login
