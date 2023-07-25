import { render, act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

const successResponse = () => {
  return Promise.resolve({
    ok: true,
    status: 200,
    json: () => Promise.resolve({
      "items": [
        {
          "login": "roxxorDev1",
          "id": 12345,
          "node_id": "test",
          "avatar_url": "https://avatars.githubusercontent.com/u/1234?v=4",
          "gravatar_id": "",
          "url": "https://api.github.com/users/roxxordev1",
          "html_url": "https://github.com/roxxordev1",
          "followers_url": "https://api.github.com/users/roxxordev1/followers",
          "following_url": "https://api.github.com/users/roxxordev1/following{/other_user}",
          "gists_url": "https://api.github.com/users/roxxordev1/gists{/gist_id}",
          "starred_url": "https://api.github.com/users/roxxordev1/starred{/owner}{/repo}",
          "subscriptions_url": "https://api.github.com/users/roxxordev1/subscriptions",
          "organizations_url": "https://api.github.com/users/roxxordev1/orgs",
          "repos_url": "https://api.github.com/users/roxxordev1/repos",
          "events_url": "https://api.github.com/users/roxxordev1/events{/privacy}",
          "received_events_url": "https://api.github.com/users/roxxordev1/received_events",
          "type": "User",
          "site_admin": false,
          "score": 1
        }
      ],
    })
  });
};

global.structuredClone = (val) => JSON.parse(JSON.stringify(val));

test('app does not start in edit mode', () => {
  render(<App />);
  const editModeCheckbox:HTMLInputElement = screen.getByTestId('editModeCheckbox');
  expect(editModeCheckbox.checked).toBe(false);
});

test('handles toggling edit-mode', async () => {
  render(<App />);

  const editModeCheckbox:HTMLInputElement = screen.getByTestId('editModeCheckbox');

  await userEvent.click(editModeCheckbox);

  const selectionLabel = screen.getByText('0 elements selected');

  expect(selectionLabel).toBeInTheDocument();
});

test('app starts without results', () => {
  render(<App />);

  const emptyState = screen.getByText('No results');

  expect(emptyState).toBeInTheDocument();
});

test('search results are displayed after typing in the search form', async () => {
    jest.useFakeTimers();
    
    jest.spyOn(global as any, 'fetch').mockImplementationOnce(successResponse);
  
    render(<App />);
    
    const searchInput: HTMLInputElement = screen.getByPlaceholderText('Search users by name');
    await userEvent.type(searchInput, 'roxxorDev1');
  
    // allow any pending promises to be resolved
    await act(() => {
      jest.runOnlyPendingTimers();
    });
    
    const user = screen.getByText('roxxorDev1');
    expect(user).toBeInTheDocument();
  
    // clean up and restore the original (non-mocked) fetch implementation
    (global.fetch as jest.Mock).mockRestore();
});

test('selected user is duplicated when we click on the duplicate button', async () => {
    jest.useFakeTimers();
    
    jest.spyOn(global as any, 'fetch').mockImplementationOnce(successResponse);
  
    render(<App />);
    
    const editModeCheckbox:HTMLInputElement = screen.getByTestId('editModeCheckbox');
    const searchInput: HTMLInputElement = screen.getByPlaceholderText('Search users by name');

    await userEvent.click(editModeCheckbox);
    await userEvent.type(searchInput, 'roxxorDev1');
  
    // allow any pending promises to be resolved
    await act(() => {
      jest.runOnlyPendingTimers();
    });
    
    const userCheckbox = screen.getByTestId('userCheckbox');
    const duplicateButton:HTMLButtonElement = screen.getByTitle('Duplicate selection');

    await userEvent.click(userCheckbox);

    await userEvent.click(duplicateButton);

    const allUsers = screen.getAllByText('roxxorDev1');

    expect(allUsers.length).toBe(2);
  
    (global.fetch as jest.Mock).mockRestore();
});

test('selected user is deleted when we click on the delete button', async () => {
  jest.useFakeTimers();
  
  jest.spyOn(global as any, 'fetch').mockImplementationOnce(successResponse);

  render(<App />);
  
  const editModeCheckbox:HTMLInputElement = screen.getByTestId('editModeCheckbox');
  const searchInput: HTMLInputElement = screen.getByPlaceholderText('Search users by name');

  await userEvent.click(editModeCheckbox);
  await userEvent.type(searchInput, 'roxxorDev1');

  // allow any pending promises to be resolved
  await act(() => {
    jest.runOnlyPendingTimers();
  });
  
  const user = screen.getByText('roxxorDev1');
  const userCheckbox = screen.getByTestId('userCheckbox');
  const deleteButton:HTMLButtonElement = screen.getByTitle('Delete selection');

  await userEvent.click(userCheckbox);

  expect(user).toBeInTheDocument();

  await userEvent.click(deleteButton);

  expect(user).not.toBeInTheDocument();

  (global.fetch as jest.Mock).mockRestore();
});

test('selects all users at once when clicking on the selection checkbox', async () => {
  jest.useFakeTimers();
  
  jest.spyOn(global as any, 'fetch').mockImplementationOnce(successResponse);

  render(<App />);
  
  const editModeCheckbox:HTMLInputElement = screen.getByTestId('editModeCheckbox');
  const searchInput: HTMLInputElement = screen.getByPlaceholderText('Search users by name');

  await userEvent.click(editModeCheckbox);
  await userEvent.type(searchInput, 'roxxorDev1');

  // allow any pending promises to be resolved
  await act(() => {
    jest.runOnlyPendingTimers();
  });
  
  const allUsersCheckbox = screen.getByTestId('allUsersCheckbox');

  await userEvent.click(allUsersCheckbox);

  const userCheckbox:HTMLInputElement = screen.getByTestId('userCheckbox');

  expect(userCheckbox.checked).toBe(true);

  (global.fetch as jest.Mock).mockRestore();
});



test('unselects all users at once when clicking twice on the selection checkbox', async () => {
  jest.useFakeTimers();
  
  jest.spyOn(global as any, 'fetch').mockImplementationOnce(successResponse);

  render(<App />);
  
  const editModeCheckbox:HTMLInputElement = screen.getByTestId('editModeCheckbox');
  const searchInput: HTMLInputElement = screen.getByPlaceholderText('Search users by name');

  await userEvent.click(editModeCheckbox);
  await userEvent.type(searchInput, 'roxxorDev1');

  // allow any pending promises to be resolved
  await act(() => {
    jest.runOnlyPendingTimers();
  });
  
  const allUsersCheckbox = screen.getByTestId('allUsersCheckbox');

  await userEvent.click(allUsersCheckbox);

  const userCheckbox:HTMLInputElement = screen.getByTestId('userCheckbox');

  expect(userCheckbox.checked).toBe(true);

  await userEvent.click(allUsersCheckbox);

  expect(userCheckbox.checked).toBe(false);

  (global.fetch as jest.Mock).mockRestore();
});
