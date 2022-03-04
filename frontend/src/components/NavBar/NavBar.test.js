import React from 'react';
import { render, screen } from '@testing-library/react';
import NavBar from './NavBar';

// const links = [
//     { class: 'NavBar', location: "/" },
//     { text: 'Contact', location: "/contact" },
//     { text: 'About', location: "/about" },
//     { text: 'Search', location: "/search" },
// ];

// test.each(links)(
//     "Check if NavBar has the %s link.",
//     (link) => {
//       render(<NavBar />);
//       //Ensure the text is in the dom, will throw error it can't find
//       const linkDom = getElementsByClassName(link.text); 
          
//       //use jest assertion to verify the link property
//       expect(linkDom).toHaveAttribute("to", link.location);
//     }
// );

test('render navbar app title', () => {
    render(<NavBar />);
    expect(screen.getByText(/this.jobs/i)).toBeInTheDocument();
    expect()
})

