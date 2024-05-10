import React from 'react'

function userView(props) {
    const user = props.user;
  return (
    <tr>
        <td>{user.id}</td>
        <td>{user.name}</td>
        <td>{user.price}</td>
        <td>{user.quantity}</td>
        <td>{user.description}</td>
        <td>{user.category_id}</td>
        <td>{user.image_path}</td>
    </tr>
  )
}

export default userView