import React from 'react'

const DropDown = ({ categories, onChange, label, name, value }) => (
  <>
    <label htmlFor={name}>{label}</label>
    <select onChange={e => onChange(e.target.value, name)} name={name}>
      {categories.map((category, index) => (
        <option
          key={category._id ? category._id : index}
          value={value ? category._id : index}
        >
          {category.gender
            ? `${category.name} ( ${category.gender} )`
            : `${category.name}`}
        </option>
      ))}
    </select>
  </>
)

export default DropDown
