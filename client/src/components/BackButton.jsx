import React from 'react';
import { MdArrowCircleLeft } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

function BackButton() {
  const navigate = useNavigate();
  return (
    <div
      className="bg-inherit px-3 pt-3"
    >
      <button
        type="button"
        className="text-3xl cursor-pointer"
        onClick={() => navigate(-1)}
      >
        <MdArrowCircleLeft />
      </button>
    </div>
  );
}

export default BackButton;
