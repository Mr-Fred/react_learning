import {render, screen, within} from '@testing-library/react-native';
import {RepositoryListContainer} from '../components/RepositoryList';

describe('RepositoryList', () => {
  describe('RepositoryListContainer', () => {
    it('renders repository information correctly', () => {
      const repositories = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor:
            'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
        },
        edges: [
          {
            node: {
              id: 'jaredpalmer.formik',
              fullName: 'jaredpalmer/formik',
              description: 'Build forms in React, without the tears',
              language: 'TypeScript',
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars2.githubusercontent.com/u/4060187?v=4',
            },
            cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
          },
          {
            node: {
              id: 'async-library.react-async',
              fullName: 'async-library/react-async',
              description: 'Flexible promise-based React data loader',
              language: 'JavaScript',
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars1.githubusercontent.com/u/54310907?v=4',
            },
            cursor:
              'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          },
        ],
      };
      render(<RepositoryListContainer repositories={repositories} />);

      // Check if the repository items are rendered
      const repositoryItems = screen.getAllByTestId('repositoryItem');
      expect(repositoryItems).toHaveLength(repositories.edges.length);

      // Assertions for the first repository item
      const firstRepoData = repositories.edges[0].node;
      const firstItemElement = repositoryItems[0];
      // Check for fullName within the first item
      expect(within(firstItemElement).getByText(firstRepoData.fullName)).toBeVisible();
      // Check for description within the first item
      expect(within(firstItemElement).getByText(firstRepoData.description)).toBeVisible();
      // You would do similarly for language, and formatted counts (e.g., getByText('21.9k'), getByText('Stars'))

      // Assertions for the second repository item
      const secondRepoData = repositories.edges[1].node;
      const secondItemElement = repositoryItems[1];
      // Check for fullName within the second item
      expect(within(secondItemElement).getByText(secondRepoData.fullName)).toBeVisible();
      // Check for description within the second item
      expect(within(secondItemElement).getByText(secondRepoData.description)).toBeVisible();
    });
  });
});