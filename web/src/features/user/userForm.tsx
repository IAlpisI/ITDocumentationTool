import { Controller, FormProvider, useForm } from 'react-hook-form';
import * as FormStyle from '../../common/Styles/form.style';
import Scrollspy from 'react-scrollspy';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchUser, createUser, updateUser } from './userSlice';
import 'react-quill/dist/quill.snow.css';
import React from 'react';
import { scrolIds } from './userData';
import { useHistory, useParams } from 'react-router-dom';

function UserForm() {
    const methods = useForm();
    const dispatch = useDispatch();
    const currentUser: any = useSelector(
        (state: any) => state.user.currentUser
    );
    let { id } = useParams<{ id: string }>();
    let user: any = { general: {} };
    let history = useHistory();

    useEffect(() => {
        if (id) dispatch(fetchUser(id));
    }, [dispatch, id]);

    const onSubmit = async (data: any) => {
        user = {
            username: data.username,
            password: data.password,
            name: data.name,
            role: data.role
        };
        if (window.location.href.includes('edit')) {
            user['id'] = id;
            console.log(user);
            await dispatch(updateUser(user));
        } else {
            await dispatch(createUser(user));
        }
        history.push('/user');
    };

    const checkKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
        if (e.code === 'Enter') e.preventDefault();
    };

    return (
        <FormStyle.FormContainer>
            <FormStyle.InfoRow>
                <FormStyle.FormName>Create a new user</FormStyle.FormName>
            </FormStyle.InfoRow>
            <FormStyle.FormsContainer>
                <FormProvider {...methods}>
                    <form
                        onKeyDown={(e) => checkKeyDown(e)}
                        autoComplete='off'
                        onSubmit={methods.handleSubmit(onSubmit)}>
                        <FormStyle.Container id={'User'}>
                            {((currentUser.data &&
                                currentUser.status === 'completed') ||
                                !window.location.href.includes('edit')) && (
                                <FormStyle.Column>
                                    <FormStyle.ComponentName>
                                        User
                                    </FormStyle.ComponentName>
                                    <FormStyle.Label>Name</FormStyle.Label>
                                    <FormStyle.Input
                                        {...methods.register('name')}
                                        defaultValue={currentUser.data.name}
                                    />
                                    <FormStyle.Label>Username</FormStyle.Label>
                                    <FormStyle.Input
                                        {...methods.register('username')}
                                        defaultValue={currentUser.data.username}
                                    />
                                    <FormStyle.Label>Password</FormStyle.Label>
                                    <FormStyle.Input
                                        type={'password'}
                                        {...methods.register('password')}
                                        // defaultValue={currentUser.data.password}
                                    />
                                    <FormStyle.Label>Role</FormStyle.Label>
                                    <FormStyle.Select
                                        {...methods.register('role')}
                                        defaultValue={currentUser.data.role}
                                    >
                                        {/* <option value={'Admin'}>Admin</option> */}
                                        <option value={'Manager'}>Manager</option>
                                        <option value={'Editor'}>Editor</option>
                                        <option value={'User'}>User</option>
                                    </FormStyle.Select>
                                </FormStyle.Column>
                            )}
                        </FormStyle.Container>

                        <FormStyle.FormSpacingButtons>
                            <FormStyle.TableConfirmationButton
                                primary={'primary'}
                                id={'Save'}
                                type='submit'>
                                Submit
                            </FormStyle.TableConfirmationButton>
                            <FormStyle.TableConfirmationButton 
                                onClick={() => {
                                    history.push('/user')
                                }}
                            primary={''}>
                                Cancel
                            </FormStyle.TableConfirmationButton>
                        </FormStyle.FormSpacingButtons>
                    </form>
                </FormProvider>
                {/* <FormStyle.SpyMenu>
                    <Scrollspy
                        items={scrolIds}
                        currentClassName='is-current'
                        style={{ listStyle: 'none' }}
                        offset={-450}>
                        {scrolIds.map((item, index) => (
                            <FormStyle.SpyLi key={index}>
                                <FormStyle.SpyA href={`#${item}`}>
                                    {item}
                                </FormStyle.SpyA>
                            </FormStyle.SpyLi>
                        ))}
                    </Scrollspy>
                </FormStyle.SpyMenu> */}
            </FormStyle.FormsContainer>
        </FormStyle.FormContainer>
    );
}

export default UserForm;
