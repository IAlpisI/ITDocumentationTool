import styled from 'styled-components';
import { LicenseKey } from '../../common/licenseKeyComponent/licenseKey';
import { FormProvider, useForm } from 'react-hook-form';
import * as FormStyle from '../../common/Styles/form.style';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createLicenseKey, updateLicenseKey } from './applicationSlice';

const Container = styled.div`
    position: absolute;
    width: 700px;
    height: 700px;
    z-index: 400;
    top: 50%;
    left: 60%;
    transform: translate(-50%, -50%);
`;

const Blur = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background: #00000070;
    /* filter: blur(1000px); */
`;

let licenseKey = {};

const LicenseModal = (props: any) => {
    const methods = useForm();
    const { switchModal, id } = props;
    let history = useHistory();
    const dispatch = useDispatch();
    const isEdit = window.location.href.includes('edit');

    function handleModal() {
        switchModal();
    }

    const onSubmit = async (data: any) => {
        licenseKey = {
            amount: data.amount,
            key: data.key,
            serial: data.serial,
            expireDate: data.expireDate,
            pricePerUnit: data.pricePerUnit,
            applicationId: id,
            description: data.licenseDescription
        };

        if (isEdit) {
            await dispatch(updateLicenseKey(licenseKey));
        } else {
            await dispatch(createLicenseKey(licenseKey));
        }

        history.push(`/application/detail/${id}`);
    };

    const checkKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
        if (e.code === 'Enter') e.preventDefault();
    };

    return (
        <>
            <Blur />
            <Container>
                <FormProvider {...methods}>
                    <form
                        onKeyDown={(e) => checkKeyDown(e)}
                        autoComplete='off'
                        onSubmit={methods.handleSubmit(onSubmit)}>
                        <LicenseKey />
                        <FormStyle.FormSpacingButtons>
                            <FormStyle.TableConfirmationButton
                                primary={'primary'}
                                id={'Save'}
                                type='submit'>
                                Submit
                            </FormStyle.TableConfirmationButton>
                            <FormStyle.TableConfirmationButton
                                onClick={handleModal}
                                type='button'
                                primary={''}>
                                Cancel
                            </FormStyle.TableConfirmationButton>
                        </FormStyle.FormSpacingButtons>
                    </form>
                </FormProvider>
            </Container>
        </>
    );
};

export default LicenseModal;
