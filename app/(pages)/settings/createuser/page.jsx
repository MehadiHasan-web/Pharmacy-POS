'use client'
import React from 'react';
import { axios } from 'axios';


const CreateUser = () => {

  const userSettingsData = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const username = form.username.value;
    const user_type = form.user_type.value;
    const password = form.password.value;
    const userDetails = {email, username, user_type, password};

    // axios.post('https://rpos.pythonanywhere.com/api/v1/register/', userDetails)
    // .then(function (response) {
    //   console.log(response);
    //   form.reset()
    // })
    // .catch(function (error) {
    //   console.log(error);
    // });

  }

  return (
    <div className="container mx-auto p-3 sm:p-10 md:p-15 lg:p-20">
      <div className="card shrink-0 w-full  shadow-2xl bg-base-100">
      <form onSubmit={userSettingsData} className="card-body">
        {/* email */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" placeholder="enter your email" className="input input-bordered" name="email" />
        </div>
        {/* email */}
        {/* username */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">User Name</span>
          </label>
          <input type="text" placeholder="enter your user name" className="input input-bordered" name="username" />
        </div>
        {/* username */}
        {/* user type */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">User Type</span>
          </label>
          <select name="user_type" className="select select-bordered w-full">
            <option disabled selected value="admin">Admin</option>
            <option value="manager">Manager</option>
            <option value="manager">Seller</option>
          </select>
        </div>
        {/* user type */}
        {/* password */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" placeholder="enter your password" className="input input-bordered" name="password" />
        </div>
        {/* password */}
        <div className="form-control mt-6">
          <button type='submit' className="btn btn-primary">Submit</button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default CreateUser;