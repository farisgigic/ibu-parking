import React from 'react';

const HomePage = () => {
    const user = JSON.parse(localStorage.getItem('user')); // Get user from storage
    // console.log(user?.email);

    const userEmail = user?.email || ''; 

    if(userEmail.endsWith("@stu.ibu.edu.ba")){
        return (
            <div style={{ textAlign: 'center', marginTop: '50px' }}>
                <h1>Welcome, {user?.name}!</h1>
                <p>Glad to have you here 😊</p>
            </div>
        );
    }else{
        if(!user)  {
            window.location.href = "/login"; 
        }
        return (
            <div style={{ textAlign: 'center', marginTop: '50px' }}>
                <h1>Welcome, {user?.name}!</h1>
                <p>You are not registered as a student at International Burch University. </p>
            </div>
        );
    }
};

export default HomePage;
