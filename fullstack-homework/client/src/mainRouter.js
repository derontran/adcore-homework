import React from 'react'
import {Route, Switch} from 'react-router-dom'
import treeView from './component/treeView';
const MainRouter = () => {
    return (<div>
      <Switch>
        <Route exact path="/get_tree" component={treeView}/>
      </Switch> 
    </div>)
}

export default MainRouter
