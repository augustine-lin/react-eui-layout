import React from 'react'

import {
  EuiPageContent,
  EuiPageContentBody,
  EuiPageContentHeader,
  EuiPageContentHeaderSection,
  EuiPageHeader,
  EuiPageHeaderSection,
  EuiTitle,
} from '@elastic/eui'


function List() {
  return (
    <>
      <EuiPageHeader>
        <EuiPageHeaderSection>
          <EuiTitle size="l">
            <h1>List Page</h1>
          </EuiTitle>
        </EuiPageHeaderSection>
      </EuiPageHeader>
      <EuiPageContent>
        <EuiPageContentHeader>
          <EuiPageContentHeaderSection>
            <EuiTitle>
              <h2>List title</h2>
            </EuiTitle>
          </EuiPageContentHeaderSection>
          <EuiPageContentHeaderSection>
            List abilities
          </EuiPageContentHeaderSection>
        </EuiPageContentHeader>
        <EuiPageContentBody>List body</EuiPageContentBody>
      </EuiPageContent>
    </>
  )
}

export default List
