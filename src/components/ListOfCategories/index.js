import React, {Fragment, useEffect, useState} from 'react'
import { Category } from '../Category'

import { List, Item } from './styles'
// import data from '../../../api/db.json' <-- don't need this, but i'll save it here :) 

export const ListOfCategories = () => {
  const [categories, setCategories] = useState([])
  const [showFixed, setShowFixed] = useState(false)
 // Hook.
  useEffect(function () {
    fetch('https://petgram-server-rsor.vercel.app/categories')
      .then(res => res.json())
      .then(response => {
        setCategories(response)
      })
  }, [])
////
//Top ListCategories show up when scroll down 200 px
  useEffect(function () {
    const onScroll = e =>{
      const newShowFixed = window.scrollY > 200
      showFixed !== newShowFixed && setShowFixed(newShowFixed)
    }
    document.addEventListener('scroll', onScroll)

    return () => document.removeEventListener('scroll', onScroll) // Avoid memory leak. 
  }, [showFixed])
//////// Render list to show categories - This will be use again at the return to get a mini one!  ////
  const renderList = (fixed) => (
      <List className={fixed ? 'fixed' : ''}>
        {
          categories.map(category => <Item key={category.id}><Category {...category} /></Item>)
        }
      </List>
  )

  return (
    <Fragment>
      {renderList()}
      {showFixed && renderList(true)}
    </Fragment>
  )
}
