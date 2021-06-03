import styled from 'styled-components';
import { LicenseKey } from '../../common/licenseKeyComponent/licenseKey';
import { FormProvider, useForm } from 'react-hook-form';
import * as FormStyle from '../../common/Styles/form.style';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createLicenseKey, updateLicenseKey, getLicenseForApplication, resetSingleLicense } from './applicationSlice';
import { useEffect } from 'react';

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
`;



const LicenseModal = (props: any) => {
    const methods = useForm();
    const { switchModal, applicationId, license } = props;
    let history = useHistory();
    const dispatch = useDispatch();
    const singleLicense = useSelector((state: any) => state.application.singleLicense);
    let licenseKey:any = {};
    async function handleModal() {
        // await dispatch(resetSingleLicense());
        switchModal();
    }

    useEffect(() => {
        if(license) dispatch(getLicenseForApplication(license))
    }, [])

    const onSubmit = async (data: any) => {
        licenseKey = {
            amount: data.amount,
            keyInformation: data.key,
            serial: data.serial,
            expireDate: data.expireDate,
            pricePerUnit: data.pricePerUnit,
            applicationId: applicationId,
            description: data.licenseDescription
        };

        console.log(license);

        if (license !== null) {
            licenseKey['id'] = license;
            await dispatch(updateLicenseKey(licenseKey));
        } else {
            await dispatch(createLicenseKey(licenseKey));
        }

        history.push(`/application/detail/${applicationId}`);
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
                        {license ? (singleLicense.status === 'completed' && <LicenseKey { ...singleLicense.data} /> ) : <LicenseKey /> }
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
