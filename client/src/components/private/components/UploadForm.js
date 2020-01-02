import React from 'react'
import { keyParser } from './helpers'

const UploadForm = ({ formData, children, onChange, onSubmit }) => {
  const renderInputs = () => {
    const inputs = []
    for (const key in formData) {
      inputs.push(
        <>
          <label htmlFor={key}>{keyParser(key)}</label>
          <input
            type="text"
            name={key}
            value={formData[key]}
            placeholder={keyParser(key)}
            onChange={onChange}
          />
          {children}
        </>
      )
    }
    return inputs
  }

  return renderInputs().map(input => input)
}

export default UploadForm
