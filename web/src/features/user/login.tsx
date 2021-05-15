import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, userSelector } from './userSlice';
import styled from 'styled-components';
import * as Module from '../../common/Styles/form.style'
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import {clearState} from './userSlice'

const LoginFormContainer = styled.div`
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 380px;
    width: 350px;
    padding: 50px;
    background: ${(props) => props.theme.colors.white};
    border: 1px solid ${props => props.theme.colors.grey1};
    z-index: 90000;
`;

const FormName = styled.div`
  font-size: 25px;
  margin-bottom: 10px;
`

const FormLabel = styled.label`
  margin-bottom: 10px;
  margin-top: 20px;
`;

const ErrorMessage = styled.span`
  font-size: 12px;
  color: red;
`

const FormSubmitButton = styled.button`
  color: ${props => props.theme.colors.white};
  background: ${props => props.theme.colors.violet1};
  margin-top: 20px;
  width: 70px;
  height: 25px;
  cursor: pointer;
`

const LoginForm = () => {
    const dispatch = useDispatch();
    let history = useHistory();
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();
    const { error, status } = useSelector(userSelector);

    const onSubmit = async (data: any) => {
        await dispatch(loginUser(data));
        // if(status === 'completed') {
            
        // }   
    };

    useEffect(() => {

        if (status === 'completed') {
            dispatch(clearState())
            history.push('/dashboard');
        }
    }, [dispatch, error, status]);

    return (
        <form autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
            <LoginFormContainer>
                <FormName>Sign in</FormName>
                <FormLabel>Username</FormLabel>
                <Module.Input width={'100%'} {...register('username', { required: 'required', })} />
                {error.username && (
                    <ErrorMessage role='alert'>{errors.username.message}</ErrorMessage>
                )}
                <FormLabel>Password</FormLabel>
                <Module.Input width={'100%'}
                    id='password'
                    type='password'
                    {...register('password', {
                        required: 'required',
                        minLength: {
                            value: 3,
                            message: 'password min length is 3'
                        }
                    })}
                />
                {errors.password && <ErrorMessage role="alert">{errors.password.message}</ErrorMessage>}
                <FormSubmitButton type='submit'>Login</FormSubmitButton>
            </LoginFormContainer>
        </form>
    );
};

export default LoginForm;
