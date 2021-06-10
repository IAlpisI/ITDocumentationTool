import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CPUTab from '../common/Tabs/cpuTab';
import { ThemeProvider } from 'styled-components';
import { theme } from '../theme/theme';
import LoginForm from '../features/user/login'

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


});
