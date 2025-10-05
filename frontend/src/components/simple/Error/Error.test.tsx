import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Error from './Error';

const renderErrorPage = (path: string) => {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="*" element={<Error />} />
      </Routes>
    </MemoryRouter>
  );
};
describe('Error', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test('Отображение заголовка ошибки', () => {
    renderErrorPage('/not-found');
    expect(screen.getByText('Error 404')).toBeInTheDocument();
  });

  test('Отображение ссылки ненайденного адреса', () => {
    renderErrorPage('/not-found');
    const element = screen.getByTestId('error-message');
    expect(element).toHaveTextContent('not-found');
  });
  test('Отображение Unknown при пустом адресе', () => {
    renderErrorPage('');
    const element = screen.getByTestId('error-message');
    expect(element).toHaveTextContent('Unknown');
  });
  test('Отображение ссылки для перехода на главную страницу', () => {
    renderErrorPage('');
    const link = screen.getByRole('link', {
      name: /Нажмите, чтобы вернуться на главную страницу!/i,
    });
    expect(link).toHaveAttribute('href', '/');
  });
});
