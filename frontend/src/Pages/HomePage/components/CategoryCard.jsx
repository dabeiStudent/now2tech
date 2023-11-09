import React from 'react';

import './CategoryCard.css';

const CategoryCard = props => {
  return (
    <div className='category-card'>{props.children}</div>
  )
}

export default CategoryCard