import React from 'react';
import ReactDom from 'react-dom';
import { Router, BrowserRouter } from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import {createMemoryHistory} from 'history'
import Home from './Home';
import NavBar from '../../components/NavBar/NavBar'
import PostCard from './PostCard/PostCard';
import PostBox from '../../components/PostBox/PostBox';

import "@testing-library/jest-dom/extend-expect";
import { shallow, mount, configure } from "enzyme";
import Adapter from 'enzyme-adapter-react-16'
import renderer from 'react-test-renderer';

test('Homepage rendered right', () => {  
    const TextInputComponent = renderer.create(<BrowserRouter>
        <Home />
      </BrowserRouter>).toJSON();
    expect(TextInputComponent).toMatchSnapshot();
});

test('Navbar rendered right', () => {  
    const TextInputComponent = renderer.create(<BrowserRouter>
        <NavBar />
      </BrowserRouter>).toJSON();
    expect(TextInputComponent).toMatchSnapshot();
});

test('PostBox rendered right', () => {  
    const TextInputComponent = renderer.create(<BrowserRouter>
        <PostBox />
      </BrowserRouter>).toJSON();
    expect(TextInputComponent).toMatchSnapshot();
});

test('PostCard rendered right', () => {  
    const TextInputComponent = renderer.create(<BrowserRouter>
        <PostCard />
      </BrowserRouter>).toJSON();
    expect(TextInputComponent).toMatchSnapshot();
});


