import React from 'react';
import { Link } from 'react-router-dom';

function LoginAlert() {
  return (
    <div className="flex flex-col w-screen h-screen bg-slate-50 justify-center items-center">
      <div className="">
        <img className="object-contain  h-[250px]" src="https://cdn.pixabay.com/photo/2017/01/26/15/47/bank-2010880_640.png" alt="solo-hotels" />
      </div>
      <h1 className="font-bold text-base my-3">
        Login in to view your shortlisted hotels
      </h1>
      <Link className="bg-blue-500 rounded-md p-3 text-white hover:bg-blue-600 text-center" to="/">
        Log in or create an account
      </Link>
    </div>
  );
}

export default LoginAlert;
