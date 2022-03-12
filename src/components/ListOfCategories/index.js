import React, {Fragment, useEffect, useState} from 'react'
import { Category } from '../Category'
import { TailSpin } from 'react-loader-spinner'
import LoadingEffect from '../loadingEffect'

import { List, Item } from './styles'
// import data from '../../../api/db.json' <-- don't need this, but i'll save it here :) 
function useCategoriesData(){ // HOOK
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(function () {
    setLoading(true)
    fetch('https://petgram-server-rsor.vercel.app/categories')
      .then(res => res.json())
      .then(response => {
        setCategories(response)
        setLoading(false)
      })
  }, [])

  return {categories, loading}
}
export const ListOfCategories = () => {
  const {categories, loading} = useCategoriesData([])
  const [showFixed, setShowFixed] = useState(false)
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
      <List fixed={fixed}>
        {
          loading ? <TailSpin color="#00BFFF" height={80} width={80} />
          :
          categories.map(category => <Item key={category.id}><Category {...category} /></Item>)
        }
      </List>
  )
  return (
    <Fragment>
      {renderList()}
      {showFixed && renderList()}
    </Fragment>
  )
}
