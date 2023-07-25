import { render, screen } from '@testing-library/react';
import Header from './Header';

test('renders main title', () => {
    render(<Header editMode={false} setEditMode={jest.fn()} />);

    const maintTitle = screen.getByText(/Github search/i);

    expect(maintTitle).toBeInTheDocument();
});
