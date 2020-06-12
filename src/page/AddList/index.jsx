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


function AddList() {
  return (
    <>
      <EuiPageHeader>
        <EuiPageHeaderSection>
          <EuiTitle size="l">
            <h1>Add List Page</h1>
          </EuiTitle>
        </EuiPageHeaderSection>
      </EuiPageHeader>
      <EuiPageContent>
        <EuiPageContentHeader>
          <EuiPageContentHeaderSection>
            <EuiTitle>
              <h2>Add List title</h2>
            </EuiTitle>
          </EuiPageContentHeaderSection>
          <EuiPageContentHeaderSection>
            Add List abilities
          </EuiPageContentHeaderSection>
        </EuiPageContentHeader>
        <EuiPageContentBody>Add List body</EuiPageContentBody>
      </EuiPageContent>
    </>
  )
}

export default AddList
