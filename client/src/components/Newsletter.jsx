import React, { useState } from 'react'
import api from '../api'

const Newsletter = () => {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      await api.post('/subscribe', { email })
      setStatus('success')
      setEmail('')
    } catch (err) {
      console.error(err)
      setStatus('error')
    }
  }

  return (
    <div className="newsletter-box" style={{ maxWidth: 400, margin: '0 auto' }}>
      <form
        onSubmit={handleSubmit}
        className="newsletter-form"
        style={{
          display: 'flex',
          gap: 10,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="newsletter-input"
          style={{
            flex: 1,
            padding: 10,
            borderRadius: 6,
            border: '1px solid #ddd',
          }}
        />
        <button
          type="submit"
          className="btn btn-primary"
          disabled={status === 'sending'}
          style={{ minWidth: 110 }}
        >
          Subscribe
        </button>
      </form>
      {status === 'success' && (
        <p style={{ marginTop: '10px', color: 'lightgreen' }}>
          Thank you for subscribing!
        </p>
      )}
      {status === 'error' && (
        <p style={{ marginTop: '10px', color: '#ff6b6b' }}>
          Subscription failed or already subscribed.
        </p>
      )}
    </div>
  )
}

export default Newsletter
