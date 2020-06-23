import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
  useLocation,
  Redirect
} from 'react-router-dom'
import {
  EuiPage,
  EuiPageBody,
  EuiPageSideBar,
  EuiSideNav,
  EuiHeader,
  EuiIcon,
  EuiHeaderSectionItem
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

const mainPageList = [
  { name: 'Home', path: '/', component: <Home /> },
  { name: 'List', path: '/list', component: <List /> },
  { name: 'Add', path: '/add', component: <AddList /> }
]

function SideBar() {
  const [isSideNavOpenOnMobile, setisSideNavOpenOnMobile] = useState(false)

  const toggleOpenOnMobile = () => {
    setisSideNavOpenOnMobile(!isSideNavOpenOnMobile)
  }
  const history = useHistory()
  const location = useLocation()

  function handleClick(path) {
    history.push(path)
  }

  const items = mainPageList.map((router, index) => ({
    name: router.name,
    id: index,
    onClick: () => handleClick(router.path),
    isSelected: location.pathname === router.path
  }))

  const sideNav = [
    {
      name: '主要頁面',
      id: 0,
      items
    }
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
        <EuiPageBody component="div" className="relative">
          <Switch>
            {
              mainPageList.map((router) => (
                <Route key={router.path} exact path={router.path}>
                  {router.component}
                </Route>
              ))
            }
            <Redirect from="*" to="/" />
          </Switch>
        </EuiPageBody>
      </EuiPage>
    </Router>

  )
}

export default Layout
