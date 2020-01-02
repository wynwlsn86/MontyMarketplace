import React from 'react'

const DropDown = ({ categories, onChange, label, name }) => (
  <>
    <label htmlFor={name}>{label}</label>
    <select onChange={onChange} name={name}>
      {categories.map(category => (
        <option key={category._id} value={category._id}>
          {category.gender
            ? `${category.name} ( ${category.gender} )`
            : `${category.name}`}
        </option>
      ))}
    </select>
  </>
)

export default DropDown
