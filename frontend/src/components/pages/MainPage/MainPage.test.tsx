import { render, screen, waitFor } from '@testing-library/react';
import AuthServices from '../../../api/AuthServices';
import MainPage from './MainPage';
import { TypeUser } from '@/utils/types';

const mockContextValue = {
  appStyles: '',
};
const mockUsers = [
  { userId: '1', name: 'Иван', email: 'ivan@example.com', password: '123' },
];
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useContext: () => mockContextValue,
}));

jest.mock('../../../api/AuthServices');
jest.mock('../../simple/Sidebar/Sidebar', () => {
  return function MockSidebar() {
    return <div>MockSidebar</div>;
  };
});
jest.mock('../../simple/Users/Users', () => {
  return function MockUsers({ users }: { users: TypeUser[] }) {
    return (
      <div data-testid="mock-users" data-users={JSON.stringify(users)}></div>
    );
  };
});

const mockedGetUsers = AuthServices.getUsers as jest.MockedFunction<
  typeof AuthServices.getUsers
>;

describe('MainPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test('Отображение индикатора загрузки до получения списка пользователей', () => {
    mockedGetUsers.mockReturnValue(new Promise(() => {}));
    render(<MainPage />);
    expect(
      screen.getByText('Загрузка всех пользователей...')
    ).toBeInTheDocument();
  });
  test('Отображение списка всех пользователей', async () => {
    mockedGetUsers.mockResolvedValue(mockUsers);
    render(<MainPage />);

    expect(
      screen.getByText('Загрузка всех пользователей...')
    ).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByTestId('mock-users')).toBeInTheDocument();
    });
    screen.debug();

    await waitFor(() => {
      const usersElement = screen.getByTestId('mock-users');
      const usersProp = JSON.parse(usersElement.getAttribute('data-users')!);
      expect(usersProp).toEqual(mockUsers);
    });
    screen.debug();
  });
});
