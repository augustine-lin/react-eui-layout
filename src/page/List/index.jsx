import React, { useState, useEffect } from 'react'
import firebase from 'firebase'

import {
  EuiPageContent,
  EuiPageContentBody,
  EuiPageContentHeader,
  EuiPageContentHeaderSection,
  EuiPageHeader,
  EuiPageHeaderSection,
  EuiTitle,
  EuiBasicTable,
  EuiButton,
  EuiConfirmModal,
  EuiOverlayMask,
  EuiFieldText,
  EuiFormRow,
  EuiForm,
  EuiModal,
  EuiModalHeader,
  EuiModalHeaderTitle,
  EuiModalBody,
  EuiModalFooter,
  EuiButtonEmpty,
  EuiIcon,
  EuiToast
} from '@elastic/eui'

const config = {
  apiKey: 'AIzaSyAqQMiKQaQLWxumSivvH2siyKrq7SiM2pk',
  authDomain: 'lunchpicker-570ca.firebaseapp.com',
  databaseURL: 'https://lunchpicker-570ca.firebaseio.com',
  projectId: 'lunchpicker-570ca',
  storageBucket: 'lunchpicker-570ca.appspot.com',
  messagingSenderId: '191555540873',
  appId: '1:191555540873:web:5b36e94aef3c12a46cb358'
}

firebase.initializeApp(config)

// function DeleteModal(props) {
//   console.log(props)
//   const { isVisible, close, confirm } = props
//   let destroyModal = null

//   if (isVisible) {
//     destroyModal = (
//       <EuiOverlayMask>
//         <EuiConfirmModal
//           title="Do this destructive thing"
//           onCancel={close}
//           onConfirm={confirm}
//           cancelButtonText="No, don't do it"
//           confirmButtonText="Yes, do it"
//           buttonColor="danger"
//           defaultFocusedButton="confirm"
//         >
//           <p>You&rsquo;re about to destroy something.</p>
//           <p>Are you sure you want to do this?</p>
//         </EuiConfirmModal>
//       </EuiOverlayMask>
//     )
//   }
//   return destroyModal
// }

function List() {
  const [isLoading, setIsLoading] = useState(true)
  const [restaurantList, setRestaurantList] = useState([])
  const [currentItem, setCurrentItem] = useState()
  const [isDestroyModalVisible, setIsDestroyModalVisible] = useState(false)
  const [isAddModalVisible, setIsAddModalVisible] = useState(false)
  const [isSuccessToastVisible, setIsSuccessToastVisible] = useState(false)
  const [toastTitle, setToastTitle] = useState('')
  const [restaurantInfo, setRestaurantInfo] = useState({
    name: '',
    description: ''
  })
  const [restaurantInfoRule, setRestaurantInfoRule] = useState({
    name: {
      rule: ['require'],
      isError: false
    },
    description: {
      rule: ['require'],
      isError: false
    }
  })

  const showAddModal = () => {
    setRestaurantInfo({
      name: '',
      description: ''
    })
    setRestaurantInfoRule({
      name: {
        rule: ['require'],
        isError: false
      },
      description: {
        rule: ['require'],
        isError: false
      }
    })
    setIsAddModalVisible(true)
  }

  const closeAddModal = () => setIsAddModalVisible(false)

  const showDestroyModal = () => setIsDestroyModalVisible(true)
  const closeDestroyModal = () => setIsDestroyModalVisible(false)

  let successToastTimeOut
  const closeSuccessToast = () => setIsSuccessToastVisible(false)

  const showSuccessToast = (title) => {
    setToastTitle(title)
    setIsSuccessToastVisible(true)
    successToastTimeOut = setTimeout(closeSuccessToast, 3000)
  }

  const confirmDestroyModal = () => {
    const newRestaurantList = restaurantList.filter(
      (restaurant) => restaurant.name !== currentItem.name
    )
    firebase.database().ref('/restaurants')
      .set(newRestaurantList)
      .then(() => {
        setRestaurantList(newRestaurantList)
      })
      .catch((err) => {
        console.error(err)
      })
    closeDestroyModal()
    showSuccessToast('刪除成功')
  }

  const handleInputOnChange = (e, type) => {
    const newRestaurantInfo = {
      ...restaurantInfo,
      [type]: e.target.value
    }
    setRestaurantInfo(newRestaurantInfo)
  }

  const validate = () => {
    const checkList = Object.keys(restaurantInfoRule)
    return checkList.reduce(
      (accumulator, currentValue) => {
        const isTrue = Boolean(restaurantInfo[currentValue])
        setRestaurantInfoRule((pre) => {
          const newRule = { ...pre }
          newRule[currentValue].isError = !isTrue
          return newRule
        })
        return accumulator && isTrue
      }, true
    )
  }
  const confirmAddModal = () => {
    if (validate()) {
      closeAddModal()
      const { name, description } = restaurantInfo
      const newRestaurantList = restaurantList.concat([{ name, description }])
      console.log(newRestaurantList)
      firebase.database().ref('/restaurants')
        .set(newRestaurantList)
        .then(() => {
          setRestaurantList(newRestaurantList)
        })
        .catch((err) => {
          console.error(err)
        })
      showSuccessToast('新稱成功')
    }
  }

  const handleDeleteButtonClick = (value, item) => {
    setCurrentItem(item)
    showDestroyModal()
  }

  const columns = [
    { name: '名稱', field: 'name' },
    { name: '描述', field: 'description' },
    {
      name: '',
      field: 'action',
      width: '100px',
      align: 'center',
      render: (value, item) => (
        <EuiButton
          size="s"
          color="danger"
          onClick={() => handleDeleteButtonClick(value, item)}
        >
          刪除
        </EuiButton>
      )
    }
  ]
  const clear = () => {
    clearTimeout(successToastTimeOut)
  }
  useEffect(() => {
    const fetchRestaurantList = () => {
      setIsLoading(true)
      firebase.database().ref('/restaurants').once('value').then((res) => {
        if (Array.isArray(res.val())) {
          const list = res.val().map((item) => ({
            name: item.name,
            description: item.description
          }))
          setRestaurantList(list)
          setIsLoading(false)
        }
      })
    }
    fetchRestaurantList()
    return clear
  }, [])

  let destroyModal

  if (isDestroyModalVisible) {
    destroyModal = (
      <EuiOverlayMask>
        <EuiConfirmModal
          title={`是否要刪除 ${currentItem.name}`}
          onCancel={closeDestroyModal}
          onConfirm={confirmDestroyModal}
          cancelButtonText="取消"
          confirmButtonText="刪除"
          buttonColor="danger"
          defaultFocusedButton="confirm"
        >
          <p>你確定要刪除嗎？</p>
        </EuiConfirmModal>
      </EuiOverlayMask>
    )
  }

  let addModal
  if (isAddModalVisible) {
    const addForm = (
      <EuiForm>
        <EuiFormRow label="餐廳名稱" isInvalid={restaurantInfoRule.name.isError} error="這是必填的，別懶惰！">
          <EuiFieldText
            name="name"
            value={restaurantInfo.name}
            onChange={(e) => handleInputOnChange(e, 'name')}
            isInvalid={restaurantInfoRule.name.isError}
          />
        </EuiFormRow>

        <EuiFormRow label="餐廳描述" isInvalid={restaurantInfoRule.description.isError} error="這是必填的，別懶惰！">
          <EuiFieldText
            name="restaurant"
            onChange={(e) => handleInputOnChange(e, 'description')}
            isInvalid={restaurantInfoRule.description.isError}
          />
        </EuiFormRow>
      </EuiForm>
    )
    addModal = (
      <EuiOverlayMask>
        <EuiModal onClose={closeAddModal} initialFocus="[name=popswitch]">
          <EuiModalHeader>
            <EuiModalHeaderTitle>新增餐廳</EuiModalHeaderTitle>
          </EuiModalHeader>

          <EuiModalBody>{addForm}</EuiModalBody>

          <EuiModalFooter>
            <EuiButtonEmpty onClick={closeAddModal}>取消</EuiButtonEmpty>

            <EuiButton onClick={confirmAddModal} fill>
              新增
            </EuiButton>
          </EuiModalFooter>
        </EuiModal>
      </EuiOverlayMask>
    )
  }

  function SuccessToast(props) {
    return (
      <div style={{
        position: 'absolute',
        left: 0,
        right: 0,
        marginLeft: 'auto',
        marginRight: 'auto',
        width: 300
      }}
      >
        <EuiToast
          title={props.title || '成功'}
          color="success"
          iconType="check"
          onClose={closeSuccessToast}
        />
      </div>
    )
  }

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
          {/* <EuiPageContentHeaderSection>
            <EuiTitle>
              <h2>Restaurant</h2>
            </EuiTitle>
          </EuiPageContentHeaderSection> */}
          <EuiPageContentHeaderSection>
            <EuiButton size="s" color="primary" onClick={() => showAddModal()}>
              新增
            </EuiButton>
          </EuiPageContentHeaderSection>
        </EuiPageContentHeader>
        <EuiPageContentBody>
          <EuiBasicTable items={restaurantList} columns={columns} />
        </EuiPageContentBody>
      </EuiPageContent>
      { destroyModal }
      { addModal }
      { isSuccessToastVisible && <SuccessToast title={toastTitle} /> }
    </>
  )
}

export default List
