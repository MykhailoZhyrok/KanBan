import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Header } from '../Header';
import {store} from '../../store/store'
import { Provider } from 'react-redux';

test('redirects to new page after button click with valid URL', async () => {
  const { getByPlaceholderText, getByText } = render(
    <Provider store={store}>
    <Router>
      <Header setTasks={() => {}} />
    </Router>
    </Provider>
  );

  const input = getByPlaceholderText('Enter repository URL');
  const button = getByText('Button');

  // Введення дійсного URL і натискання кнопки
  fireEvent.change(input, { target: { value: 'https://github.com/facebook/react' } });
  fireEvent.click(button);

  // Очікування переходу на нову сторінку
  await waitFor(() => expect(window.location.pathname).toBe('/facebook/react'));
});

