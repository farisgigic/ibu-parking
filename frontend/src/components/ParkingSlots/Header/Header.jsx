// src/components/Header.jsx
import React from 'react';

const Header = () => {
  return (
    <div style={{
      background: 'rgba(255, 255, 255, 0.95)',
      borderRadius: '20px',
      padding: '30px',
      marginBottom: '30px',
      boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
      backdropFilter: 'blur(10px)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
        <h1 style={{
          margin: 0,
          color: '#2d3748',
          fontWeight: 'bold',
          fontSize: '32px',
          background: 'linear-gradient(135deg, #667eea, #764ba2)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          🚗 PARKING SLOT BOOKING
        </h1>

        <div style={{ display: 'flex', gap: '25px', flexWrap: 'wrap', fontSize: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '20px', height: '20px', background: 'linear-gradient(135deg, #4299e1, #3182ce)', borderRadius: '50%' }}></div>
            <span>Your Selection</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '20px', height: '20px', background: 'linear-gradient(135deg, #48bb78, #38a169)', borderRadius: '50%' }}></div>
            <span>Available</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '20px', height: '20px', background: 'linear-gradient(135deg, #e53e3e, #c53030)', borderRadius: '50%' }}></div>
            <span>Occupied</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '20px', height: '20px', backgroundColor: '#a0aec0', borderRadius: '50%' }}></div>
            <span>Locked</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;