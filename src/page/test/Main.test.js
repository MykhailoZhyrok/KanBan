import React from 'react';
import { render, screen, waitFor, userEvent, act } from '@testing-library/react';
import axios from 'axios';
import { Main } from '../Main'; 
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { store } from '../../store/store';
import { renderWithRouter } from '../../renderWithRouter';


jest.mock('axios');
describe('Main', () => {
    let response;
    beforeEach(() => {
        response = {
            data: [
                { id: 1, title: 'Task 1', state: 'open', user: {login: 'user2'}  },
                { id: 2, title: 'Task 2', state: 'in progress', user: {login: 'user1'}  },
                { id: 3, title: 'Task 3', state: 'closed', user: {login: 'user3'} },
            ]
        }
    })

    afterEach(() => {
        jest.clearAllMocks();
    })
    it('should render Main component with columns', async () => {
        axios.get.mockReturnValue(response);

        await act (()=>{render(
            <Provider store={store}>
                <MemoryRouter>
                    <Main />
                </MemoryRouter>
            </Provider>
        )})

        await waitFor(() => {
            expect(screen.getByText('toDo')).toBeInTheDocument();
            expect(screen.getByText('inProgress')).toBeInTheDocument();
            expect(screen.getByText('done')).toBeInTheDocument();
            expect(screen.getByText('Task 1')).toBeInTheDocument();
            expect(screen.getByText('Task 2')).toBeInTheDocument();
            expect(screen.getByText('Task 3')).toBeInTheDocument();
        });
        const repo = await screen.findAllByTestId('issue-item');
        expect(repo.length).toBe(3);
        expect(axios.get).toBeCalledTimes(1);
        screen.debug();
        

    });
  
});
