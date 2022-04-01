import React from 'react';
import { Router, BrowserRouter } from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import {createMemoryHistory} from 'history'
import Jobs from './Jobs'
import MyApps from './MyApps/MyApps';
import AppCard from './MyApps/AppCard';
import PostedJobs from './PostedJobs/PostedJobs';
import PostJob from './PostedJobs/PostJob';
import PJCard from './PostedJobs/PJCard';

import "@testing-library/jest-dom/extend-expect";
import { shallow, mount, configure } from "enzyme";
import Adapter from 'enzyme-adapter-react-16'
import renderer from 'react-test-renderer';
import PJBoxComp from './PostedJobs/PJBoxComp';
import JobSearch from  './JobSearch/JobSearch';
import JobDescriptionCard from '../../components/JobDescriptionCard/JobDescriptionCard';
import JobDisplayCard from '../../components/JobDisplayCard/JobDisplayCard';

configure({adapter: new Adapter()});

//Jobs Page tests - 

test('Contains NavBar', () => {
  render(
  <BrowserRouter>
    <Jobs />
  </BrowserRouter>);
  expect(screen.getByText(/this.jobs/i)).toBeInTheDocument();
});

test("My Applications Tab rendering", () => {
    render(
        <BrowserRouter>
          <Jobs />
        </BrowserRouter>);
    expect(screen.getByText(/My Applications/i)).toBeInTheDocument();
});

test("Employer Dashboard Rendering", () => {
    render(
        <BrowserRouter>
          <Jobs />
        </BrowserRouter>);
    expect(screen.getByText(/Employer View/i)).toBeInTheDocument();
});

// MyApps page test - 

test("MyApps Rendering Server Lost Page", () => {
    const {container} = render(
        <BrowserRouter>
           <MyApps />
        </BrowserRouter>);
    expect(container.classList.contains("serverLost"));
});

test("MyApps Rendering Feed Empty Page", () => {
    const {container} = render(
        <BrowserRouter>
           <MyApps />
        </BrowserRouter>);
    expect(container.classList.contains("feedEmpty"));
});

test("MyApps Rendering Applied jobs", () => {
    const {container} = render(
        <BrowserRouter>
           <MyApps />
        </BrowserRouter>);
    expect(container.classList.contains("appCard"));
});


// PostedApps tests - 
test("Rendering PostJob box component", () => {
    const {container} = render(
        <BrowserRouter>
           <PostedJobs />
        </BrowserRouter>);
    expect(container.classList.contains("job-posting"));
});

test("Employer posts display component", () => {
    const {container} = render(
        <BrowserRouter>
           <PostedJobs />
        </BrowserRouter>);
    expect(container.classList.contains("grid-container-element"));
});

test("Rendering PJBoxComp", () => {
    const {container} = render(
        <BrowserRouter>
           <PostedJobs />
        </BrowserRouter>);
    expect(container.classList.contains("posted-jobs"));
});

test('rendering a component that uses /getjobposts/2', () => {
    const history = createMemoryHistory()
    const route = '/getjobposts/2'
    history.push(route)
    render(
      <BrowserRouter history={history}>
        <PostedJobs />
      </BrowserRouter>)
});

//PostJob Test-

test("Rendering all components of PostJob component", () => {
    const {container} = render(
        <BrowserRouter>
           <PostJob />
        </BrowserRouter>);
    expect(container.classList.contains("PostBox1"));  
    expect(container.classList.contains("buttons1"));
    expect(container.classList.contains("dropdown1"));
    expect(container.classList.contains("icon1"));
});

test('Post Button test', () => {
    const {getByPlaceholderText} = render(<BrowserRouter>
        <PostJob />
      </BrowserRouter>);
    expect(getByPlaceholderText('').tagName).toBe('BUTTON')
    fireEvent.click(getByPlaceholderText(''))
});

test('hitting the API /jobpost', () => {
    const history = createMemoryHistory()
    const route = '/jobpost'
    history.push(route)
    render(
      <BrowserRouter history={history}>
        <PostJob />
      </BrowserRouter>)
});

//PJCompBox tests

test("PJCompBox Rendering Feed Empty Page ", () => {
    const {container} = render(
        <BrowserRouter>
           <PJBoxComp />
        </BrowserRouter>);
    expect(container.classList.contains("feedEmpty1"));
});

test("PJCompBox Rendering PostedJobs", () => {
    const {container} = render(
        <BrowserRouter>
           <PJBoxComp />
        </BrowserRouter>);
    expect(container.classList.contains("grid-child-element purple"));
});

//JobSearch

test("Jobs component rendering", () => {
    const {container} = render(
        <BrowserRouter>
           <MyApps />
        </BrowserRouter>);
    expect(container.classList.contains("jsearch"));
});


test("Rendering all components of JobSearch", () => {
    const {container} = render(
        <BrowserRouter>
           <JobSearch />
        </BrowserRouter>);
    expect(container.classList.contains("JobsListAndDesc"));  
    expect(container.classList.contains("JobsList"));
    expect(container.classList.contains("JobsDesc"));
});


test('hitting the API /getalljobposts', () => {
    const history = createMemoryHistory()
    const route = '/getalljobposts'
    history.push(route)
    render(
      <BrowserRouter history={history}>
        <JobSearch />
      </BrowserRouter>)
});

//Job description card

test("Rendering all components of JobDescriptionCard", () => {
    const {container} = render(
        <BrowserRouter>
           <JobDescriptionCard />
        </BrowserRouter>);
    expect(container.classList.contains("descOrg"));  
    expect(container.classList.contains("descJob"));
    expect(container.classList.contains("locAndTime"));
    expect(container.classList.contains("salary"));
    expect(container.classList.contains("descriptionJob"));
    expect(container.classList.contains("descContent"));
});

test('hitting the API /applyjob', () => {
    const history = createMemoryHistory()
    const route = '/applyjob'
    history.push(route)
    render(
      <BrowserRouter history={history}>
        <JobDescriptionCard />
      </BrowserRouter>)
});

// JobDisplayCard

test("Rendering all components of JobDisplayCard", () => {
    const {container} = render(
        <BrowserRouter>
           <JobDisplayCard />
        </BrowserRouter>);
    expect(container.classList.contains("listCardJobs"));  
    expect(container.classList.contains("jobTitleList"));
    expect(container.classList.contains("jobOrgList"));
    expect(container.classList.contains("jobLocList"));
    expect(container.classList.contains("jobTimeList"));
});