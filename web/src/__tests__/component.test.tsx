import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CPUTab from '../common/Tabs/cpuTab';
import { ThemeProvider } from 'styled-components';
import { theme } from '../theme/theme';
import { CPU } from '../common/cpuComponent/cpu';
import { FormProvider, useForm } from 'react-hook-form';
import {LoginForm} from '../features/user/login'
import { FormFactor } from '../common/formFactoryComponent/formfactor';
import { HostAddress } from '../common/hostAddress/hostAddress';
import { LicenseKey } from '../common/licenseKeyComponent/licenseKey';
import { Memory } from '../common/memoryComponent/memory';
import PowerConsumerTab from '../common/Tabs/powerConsumerTab';
import HostAddressTab from '../common/Tabs/hostAddressTab';

const mockLogin = jest.fn((user, password) => {
    return Promise.resolve({ user, password });
  });

describe('Components', () => {
    beforeEach(() => {
        render(<LoginForm login={mockLogin} />);
      });

    test('Render cpu tab and check if data is correct', () => {
        const { getByText } = render(
            <ThemeProvider theme={theme}>
                <CPUTab title='CPUone' />
            </ThemeProvider>
        );
        getByText('CPUone');
    });

    test('Check if general tab is rendered correctly', () => {
        const { getByText } = render(
            <ThemeProvider theme={theme}>
                <CPUTab title='CPUone' />
            </ThemeProvider>
        );
        getByText('CPUone');
    });

    test('should display require values when value is invalid', async () => {
        fireEvent.submit(screen.getByRole("button"));

        expect(await screen.findAllByRole("alert")).toHaveLength(2);
        expect(mockLogin).not.toBeCalled();
    });

    test('Password should be at least 3 characters long', async () => {
        fireEvent.input(screen.getByRole("textbox",{ name: /user/i }), {
            target: {
              value: "test"
            }
          });
      
          fireEvent.input(screen.getByLabelText("password"), {
            target: {
              value: "pass"
            }
          });
      
          fireEvent.submit(screen.getByRole("button"));
      
          expect(await screen.findAllByRole("alert")).toHaveLength(1);
          expect(mockLogin).not.toBeCalled();
          expect(screen.getByLabelText("password")).toBe("pass");
    });

    test('Show no error if values are valid', () => {
        fireEvent.input(screen.getByRole("textbox", { name: /user/i }), {
            target: {
              value: "user"
            }
          });
      
          fireEvent.input(screen.getByLabelText("password"), {
            target: {
              value: "user"
            }
          });
      
          fireEvent.submit(screen.getByRole("button"));
    });

    test('Render formFactor componet and check if data is correct', () => {
        const { getByText } = render(
            <ThemeProvider theme={theme}>
                <FormFactor name='formFactor'  />
            </ThemeProvider>
        );
        getByText('formFactor');
    });

    test('Render hostAddress componet and check if data is correct', () => {
        const { getByText } = render(
            <ThemeProvider theme={theme}>
                <HostAddress title='hostAddress' />
            </ThemeProvider>
        );
        getByText('hostAddress');
    });

    test('Render licenseKey componet and check if data is correct', () => {
        const { getByText } = render(
            <ThemeProvider theme={theme}>
                <LicenseKey title='licenseKey' />
            </ThemeProvider>
        );
        getByText('licenseKey');
    });

    test('Render memory componet and check if data is correct', () => {
        const { getByText } = render(
            <ThemeProvider theme={theme}>
                <Memory size='MemorySize' />
            </ThemeProvider>
        );
        getByText('MemorySize');
    });

    test('Render powerConsumer componet and check if data is correct', () => {
        const { getByText } = render(
            <ThemeProvider theme={theme}>
                <PowerConsumerTab title='Powerconsumer' />
            </ThemeProvider>
        );
        getByText('Powerconsumer');
    });

    test('Render hostAddress tab and check if data is correct', () => {
        const { getByText } = render(
            <ThemeProvider theme={theme}>
                <HostAddressTab title='hostAddressTab' />
            </ThemeProvider>
        );
        getByText('hostAddressTab');
    });

    test('Render memory tab and check if data is correct', () => {
        const { getByText } = render(
            <ThemeProvider theme={theme}>
                <MemoryTab title='MemoryTab' />
            </ThemeProvider>
        );
        getByText('MemoryTab');
    });

    test('Render powerConsumer tab and check if data is correct', () => {
        const { getByText } = render(
            <ThemeProvider theme={theme}>
                <PowerConsumerTab title='PowerConsumerTab' />
            </ThemeProvider>
        );
        getByText('PowerConsumerTab');
    });
});
