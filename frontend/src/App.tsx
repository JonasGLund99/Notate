import React, { useState } from 'react';
import logo from './Notate-blue-rounded.svg';
import './App.css';
import { Button } from 'react-bootstrap';

function App() {
    const [clickCount, setClickCount] = useState(0);

    return (
        <div className="App">
        <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
                Edit <code>src/App.tsx</code> and save to reload.
            </p>
            <p>
                Hi. This is cool. I'm going to make a change to this file and see if it updates in the browser.
            </p>
            <Button onClick={() => setClickCount(clickCount + 1)}>
                Clicked {clickCount} times
            </Button> 
        </header>
        </div>
    );
}

export default App;
