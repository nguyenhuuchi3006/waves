import React from 'react';

import MyButton from '../utills/button';

const RegisterLogin = () => {
    return (
        <div className="page_wrapper">
            <div className="container">
                <div className="register_login_container">
                    <div className="left">
                        <h1>New Customers</h1>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestias quaerat labore odio, voluptate esse delectus ut voluptas amet aperiam perferendis, quae sit deserunt asperiores nihil ab laboriosam eius earum error.</p>
                        <MyButton 
                            type="default"
                            title="Create an account"
                            linkTo="/register"
                            addStyle={{
                                margin: '10px 0 0 0'
                            }}
                        />
                    </div>
                    <div className="right">
                        <h2>Registered customers</h2>
                        <p>If you have an account please log in</p>
                        LOGIN
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterLogin;