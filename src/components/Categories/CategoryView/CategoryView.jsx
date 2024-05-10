import React from 'react'

function CategoryView(props) {
    const category = props.category;
  return (
    <tr>
        <td>{category.id}</td>
        <td>{category.name}</td>
        <td>{category.parent_category_id}</td>
    </tr>
  )
}

export default CategoryView