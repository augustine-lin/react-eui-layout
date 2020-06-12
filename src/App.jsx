import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
} from 'react-router-dom'
import {
  EuiPage,
  EuiPageBody,
  EuiPageSideBar,
  EuiSideNav,
  EuiHeader,
  EuiIcon,
  EuiHeaderSectionItem,
} from '@elastic/eui'
import { ReactComponent as LogoIcon } from './assets/image/trident.svg'
import Home from './page/Home'
import List from './page/List'
import AddList from './page/AddList'

import './App.css'


function Header() {
  const history = useHistory()

  return (
    <EuiHeader position="static" style={{ justifyContent: 'center' }}>
      <EuiHeaderSectionItem className="cursor-pointer" border="none" onClick={() => history.push('/')}>
        <EuiIcon type={LogoIcon} className="mr-2" />
        Hell Article
        <EuiIcon type={LogoIcon} className="ml-2" />
      </EuiHeaderSectionItem>
    </EuiHeader>
  )
}

function SideBar() {
  const [isSideNavOpenOnMobile, setisSideNavOpenOnMobile] = useState(false)

  const toggleOpenOnMobile = () => {
    setisSideNavOpenOnMobile(!isSideNavOpenOnMobile)
  }
  const history = useHistory()

  function handleClick(path) {
    history.push(path)
  }

  const sideNav = [
    {
      name: '主要頁面',
      id: 0,
      items: [
        {
          name: 'Home',
          id: 1,
          onClick: () => handleClick('/'),
        },
        {
          name: 'List',
          id: 2,
          onClick: () => history.push('/list'),
        },
        {
          name: 'Add',
          id: 3,
          onClick: () => history.push('/add'),
        },
      ],
    },
  ]
  return (
    <EuiPageSideBar className="sideBar">
      <EuiSideNav
        mobileTitle="選單"
        toggleOpenOnMobile={() => toggleOpenOnMobile()}
        isOpenOnMobile={isSideNavOpenOnMobile}
        items={sideNav}
      />
    </EuiPageSideBar>
  )
}

function Layout() {
  return (
    <Router>
      <Header />
      <EuiPage className="page">
        <SideBar />
        <EuiPageBody component="div">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/list">
              <List />
            </Route>
            <Route path="/add">
              <AddList />
            </Route>
            <Route path="/:id" render={() => (<p> I want this text to show up for all routes other than /, /products and /category </p>)} />
          </Switch>
        </EuiPageBody>
      </EuiPage>
    </Router>

  )
}

export default Layout
