import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import App from './App';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import {store} from './store/store'

describe('App', () => { 
  

    it('render App', async() => {
  
        await act(async () => {
            render(
                <Provider store={store} >
                    <MemoryRouter>
                        <App />
                    </MemoryRouter>
                </Provider>
            );

        });
    });

    it('test UserPage for redirect to repo page', async () => {
        await act(async () => {
            render(
                <Provider store={store}>
                    <MemoryRouter initialEntries={['/user/facebook']}>
                        <App />
                    </MemoryRouter>
                </Provider>
            );
        });
    
        const loginText = screen.getByText(/Login:/i);
        expect(loginText).toBeInTheDocument();
    
        const repoLink = await screen.findAllByTestId('repo-item');
    
        fireEvent.click(repoLink[0]);
    
        await waitFor(async() => {
            const issue = await screen.findAllByTestId('issue-item');
            console.log(issue)
            expect(issue).not.toHaveLength(0)
        });
    
    });
 })