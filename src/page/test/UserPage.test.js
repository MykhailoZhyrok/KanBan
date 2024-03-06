import { UserPage } from "../UserPage";
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Router } from "react-router-dom";
import { createMemoryHistory } from 'history'; // Додано імпорт з history
import { store } from '../../store/store';
import React from "react";
import axios from 'axios';

jest.mock('axios');

describe('UserPage', () => { 
    afterEach(() => {
        jest.clearAllMocks();
    });

    const userData = {
        id: 1,
        name: "Test User",
        login: "testuser",
        followers: 10,
        bio: "Test bio",
        avatar_url: "https://example.com/avatar.png"
    };

    const userRepoData = [
        { id: 1, name: "Repo1", html_url: "https://github.com/testuser/repo1", description: "Test repo 1" },
        { id: 2, name: "Repo2", html_url: "https://github.com/testuser/repo2", description: "Test repo 2" }
    ];

    it('should render UserPage', async () => {
        axios.get
            .mockResolvedValueOnce({ data: userData })
            .mockResolvedValueOnce({ data: userRepoData });

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <UserPage/>
                </MemoryRouter>
            </Provider>
        );

        await waitFor(() => {
            expect(screen.getByText('Test User')).toBeInTheDocument();
            expect(screen.getByText('Test bio')).toBeInTheDocument();
            expect(screen.getByText('Login: testuser')).toBeInTheDocument();
            expect(screen.getByText('Followers: 10')).toBeInTheDocument();
            expect(screen.getByText('Repo1')).toBeInTheDocument();
            expect(screen.getByText('Repo2')).toBeInTheDocument();
        });
        const repo = await screen.findAllByTestId('repo-item');
        expect(repo.length).toBe(2);
        expect(axios.get).toBeCalledTimes(2);
        

    });
   
});
