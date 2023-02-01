import React from 'react'
import { useParams } from 'react-router-dom'
import UserEdit from '../../../pages/Users/UserEdit/UserEdit'

type Props = {}

const UserEditDetail = (props: Props) => {
    const { id } = useParams()
  return (
    <UserEdit userId={Number(id)}/>
  )
}

export default UserEditDetail