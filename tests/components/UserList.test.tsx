import { render, screen } from '@testing-library/react';
import UserList from '../../src/components/UserList';
import { User } from '../../src/entities';
import { describe, expect, it } from 'vitest';
import React from 'react'; 

describe('UserList', () => {
  it('should render no users when the users array is empty', () => {
    render(<UserList users={[]} />);
    screen.debug()
    expect(screen.getByText(/no users/i)).toBeInTheDocument();
  });

  it('should render a list of users', () => {
    const users: User[] = [
      { id: 1, name: 'Mosh' },
      { id: 2, name: 'John' },
    ];

    render(<UserList users={users} />);

    users.forEach(user => {
      const link = screen.getByRole('link', { name: user.name });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', `/users/${user.id}`);
    })
  });
})