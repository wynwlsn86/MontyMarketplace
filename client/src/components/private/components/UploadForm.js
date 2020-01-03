import React from 'react'
import { keyParser } from './helpers'

const UploadForm = ({ formData, children, onChange, dataValue, onSubmit }) => {
  const renderInputs = () => {
    const inputs = []
    for (const key in formData) {
      inputs.push(
        <React.Fragment key={key}>
          <label htmlFor={key}>{keyParser(key)}</label>
          <input
            key={key}
            type="text"
            name={key}
            value={formData[key]}
            placeholder={keyParser(key)}
            onChange={e => onChange(e.target.value, key, dataValue)}
          />
          {children}
        </React.Fragment>
      )
    }
    return inputs
  }

  return renderInputs().map(input => input)
}

export default UploadForm
