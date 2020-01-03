import React from 'react'

const DetailCard = ({ details, onClick }) => (
  <div className="detail-wrapper">
    <h3>Added Details</h3>
    <div className="wrapper detail-card-wrapper">
      {details.map((detail, index) => (
        <div className="card" key={index}>
          <button type="button" onClick={() => onClick(index)}>
            X
          </button>
          <h3>Quantity: {detail.quantity}</h3>
          <h3>Color: {detail.color}</h3>
          <h3>Size: {detail.size}</h3>
        </div>
      ))}
    </div>
  </div>
)

export default DetailCard
