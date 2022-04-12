import './App.css';
import React, { useState } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import LoadingBar from 'react-top-loading-bar'


const App = () => {
  const pageSize=6;
  const api = process.env.REACT_APP_NEWS_API2;
  const [progress, setProgress] = useState(0)
    return (
      <div>
        <Router>
          <Navbar/> 
          <LoadingBar
            height={3}
            color='#f11946'
            progress={progress}
          />
          <Switch>
            <Route exact path="/">
            <News setProgress={setProgress} api={api} key="general" pageSize={pageSize} country="in" category="general"/>
            </Route>
            <Route exact path="/business">
            <News setProgress={setProgress} api={api} key="business" pageSize={pageSize} country="in" category="business"/>
            </Route>
            <Route exact path="/entertainment">
            <News setProgress={setProgress} api={api} key="entertainment" pageSize={pageSize} country="in" category="entertainment"/>
            </Route>
            <Route exact path="/health">
            <News setProgress={setProgress} api={api} key="health" pageSize={pageSize} country="in" category="health"/>
            </Route>
            <Route exact path="/science">
            <News setProgress={setProgress} api={api} key="science" pageSize={pageSize} country="in" category="science"/>
            </Route>
            <Route exact path="/sports">
            <News setProgress={setProgress} api={api} key="sports" pageSize={pageSize} country="in" category="sports"/>
            </Route>
            <Route exact path="/tech">
            <News setProgress={setProgress} api={api} key="technology" pageSize={pageSize} country="in" category="technology"/>
            </Route>
          </Switch>
        </Router>
      </div>
    )
}
export default App;
