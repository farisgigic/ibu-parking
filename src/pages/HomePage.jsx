import React from 'react';

const HomePage = () => {
    const user = JSON.parse(localStorage.getItem('user')); // Get user from storage

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Welcome, {user?.name}!</h1>
            <p>Glad to have you here 😊</p>
        </div>
    );
};

export default HomePage;
