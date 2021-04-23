import styled from 'styled-components';
import { LicenseKey } from '../../common/licenseKeyComponent/licenseKey';
import { FormProvider, useForm } from 'react-hook-form';
import * as FormStyle from '../../common/Styles/form.style';

const Container = styled.div`
    position: absolute;
    width: 700px;
    height: 900px;
    background: white;
    z-index: 400;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

const Name = styled.div`
    height: 80px;
`;

const Blur = styled.div`
    width: 100wh;
    height: 100vh;
    background: black;
`;

const LicenseModal = (props:any) => {
    const methods = useForm();

    function handleModal() {
        // console.log(props.switchModal)
        props.switchModal();
    }

    return (
        <Container>
            <Name>License</Name>
            <FormProvider {...methods}>
                <form>
                    <LicenseKey />
                    <FormStyle.TableConfirmationButton
                        primary={'primary'}
                        id={'Save'}
                        type='submit'>
                        Submit
                    </FormStyle.TableConfirmationButton>
                </form>
                <FormStyle.TableConfirmationButton onClick={handleModal}  type='button' primary={''}>
                    Cancel
                </FormStyle.TableConfirmationButton>
            </FormProvider>
        </Container>
    );
};

export default LicenseModal;
