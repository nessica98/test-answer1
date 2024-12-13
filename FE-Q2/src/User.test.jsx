import { render, screen, waitFor } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node'
import UserProfile from './User';
import { describe } from 'vitest';


describe('User component test', () => {
  const server = setupServer(
    http.get('https://api.example.com/users/:userId', (req) => {
      const { userId } = req.params;
      if (userId === '1') {
        return HttpResponse.json(({
          name: 'John Doe',
          email: 'johndoe@example.com',
        }))

      } else {
        return HttpResponse.json({ message: 'User not found' }, { status: 404 })
       }
    })
  );

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());
    test('renders default case', async () => {
        render(<UserProfile userId="1"/>);
        expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
      
    });

    test('renders user data successfully', async () => {
      render(<UserProfile userId="1" />);
  
      await waitFor(() => expect(screen.getByText('John Doe')).toBeInTheDocument());
      expect(screen.getByText('Email: johndoe@example.com')).toBeInTheDocument();
    });

    test('renders user data not found', async () => {
      render(<UserProfile userId="2" />);
  
      await waitFor(() => expect(screen.getByText(/Error:/i)).toBeInTheDocument());
      expect(screen.getByText(/Failed to fetch user data/i)).toBeInTheDocument();
    });

    test('handles network failure gracefully', async () => {
      server.use(
        http.get('https://api.example.com/users/:userId', () => {
          return HttpResponse.json({ message: 'Api error' }, { status: 500 })
        })
      );
  
      render(<UserProfile userId="1" />);
  
      await waitFor(() => expect(screen.getByText(/Error:/i)).toBeInTheDocument());
      expect(screen.getByText(/Failed to fetch user data/i)).toBeInTheDocument();
    })
})
