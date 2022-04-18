import React from 'react';
import { Router, BrowserRouter } from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import {createMemoryHistory} from 'history'
import Search from './Search';
import PeopleSearchCard from './PeopleSearchCard';
import JobsSearchCard from './JobsSearchCard';

test("NavBar is rendering", () => {
    const {container} = render(
        <BrowserRouter>
           <Search />
        </BrowserRouter>);
    expect(container.classList.contains("NaviBar"));
});

test("Search textbox functioning", () => {
    const {container} = render(
        <BrowserRouter>
           <Search />
        </BrowserRouter>);
    expect(container.classList.contains("optionSearch"));    
});

test("People div functioning", () => {
    const {container} = render(
        <BrowserRouter>
           <Search />
        </BrowserRouter>);
    expect(container.classList.contains("peopleID"));    
});

test("Jobs div functioning", () => {
    const {container} = render(
        <BrowserRouter>
           <Search />
        </BrowserRouter>);
    expect(container.classList.contains("JobsID"));    
});

test("Displaying all Search Components", () => {
    const {container} = render(
        <BrowserRouter>
           <Search />
        </BrowserRouter>);
    expect(container.classList.contains("cardDisplay"));    
});

//People Search Card - 

test("Displaying the user's name in PeopleSearch Card", () => {
    const {container} = render(
        <BrowserRouter>
           <PeopleSearchCard />
        </BrowserRouter>);
    expect(container.classList.contains("searchJobTitle"));    
});

test("Displaying the user's email in PeopleSearch Card", () => {
    const {container} = render(
        <BrowserRouter>
           <PeopleSearchCard />
        </BrowserRouter>);
    expect(container.classList.contains("searchOrg"));    
});

test("Displaying the user's bio in PeopleSearch Card", () => {
    const {container} = render(
        <BrowserRouter>
           <PeopleSearchCard />
        </BrowserRouter>);
    expect(container.classList.contains("searchlocation"));    
});

// JobSearch Card 
test("Displaying all the elements of JobSearchCard", () => {
    const {container} = render(
        <BrowserRouter>
           <JobsSearchCard />
        </BrowserRouter>);
    expect(container.classList.contains("jobCard"));    
});

