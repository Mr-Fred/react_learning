import React from 'react';
import { render, screen, waitFor } from '@testing-library/react-native';
import { MockedProvider } from '@apollo/client/testing';
import { MemoryRouter, Route, Routes } from 'react-router-native';
import SingleRepositoryView from '../components/SingleRepositoryView';
import { GET_REPOSITORY } from '../graphQl/queries';

const mockRepository = {
  id: 'repo123',
  fullName: 'user/repo',
  description: 'A test repository',
  language: 'JavaScript',
  forksCount: 10,
  stargazersCount: 20,
  ratingAverage: 90,
  reviewCount: 5,
  ownerAvatarUrl: 'https://example.com/avatar.png',
};

const mocks = [
  {
    request: {
      query: GET_REPOSITORY,
      variables: { id: 'repo123' },
    },
    result: {
      data: {
        repository: mockRepository,
      },
    },
  },
];

describe('SingleRepositoryView', () => {
  it('renders repository data after loading', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter initialEntries={['/repository/repo123']}>
          <Routes>
            <Route path="/repository/:repositoryId" element={<SingleRepositoryView />} />
          </Routes>
        </MemoryRouter>
      </MockedProvider>
    );

    // Should show loading indicator first
    expect(screen.getByTestId('ActivityIndicator')).toBeTruthy();

    // Wait for repository data to appear
    await waitFor(() => {
      expect(screen.getByText('user/repo')).toBeTruthy();
      expect(screen.getByText('A test repository')).toBeTruthy();
    });
  });

  it('shows error message on error', async () => {
    const errorMocks = [
      {
        request: {
          query: GET_REPOSITORY,
          variables: { id: 'repo123' },
        },
        error: new Error('Test error'),
      },
    ];

    render(
      <MockedProvider mocks={errorMocks} addTypename={false}>
        <MemoryRouter initialEntries={['/repository/repo123']}>
          <Routes>
            <Route path="/repository/:repositoryId" element={<SingleRepositoryView />} />
          </Routes>
        </MemoryRouter>
      </MockedProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(/Error loading repository/i)).toBeTruthy();
    });
  });
});
