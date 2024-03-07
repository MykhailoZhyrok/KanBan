import { getIssue } from '../issueSlice';
import axios from 'axios';


jest.mock('axios');

describe("issueSlice", () => {
    it('should GET data', async () => {
        // Моковані дані
        const mockTodos = [{
            id: 1, title: 'test', status: 'open', userName: 'Bob'
        }];

        const dispatch = jest.fn();
        const thunk = getIssue({ owner: 'facebook', repo: 'akd' });

        // Встановлюємо повернене значення для мокованого axios.get
        axios.get.mockResolvedValue({ data: mockTodos });

        await thunk(dispatch);

        // Розпочинаємо тестування
        expect(dispatch).toBeDefined();
        const { calls } = dispatch.mock;
        expect(calls).toHaveLength(2);
        console.log(calls)
        const [start, end] = calls;
        expect(end[0].type).toBe('issue/fetch/fulfilled');
        expect(end[0].payload).toBe(mockTodos);
    });
    
});
