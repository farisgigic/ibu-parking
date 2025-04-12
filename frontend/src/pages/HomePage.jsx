import React from 'react';

const HomePage = () => {
    const user = JSON.parse(localStorage.getItem('user')); // Get user from storage
    const userEmail = user?.email || ''; 

    if (!user) {
        window.location.href = "/login"; 
        return null;
    }

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Welcome, {user.name}!</h1>
            {user.profilePicture && (
                <img 
                    src={user.profilePicture} 
                    alt="Profile" 
                    style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover' }}
                />
            )}
            {userEmail.endsWith("@stu.ibu.edu.ba") ? (
                <p>Glad to have you here 😊</p>
            ) : (
                <p>You are not registered as a student at International Burch University.</p>
            )}
        </div>
    );
};

export default HomePage;
