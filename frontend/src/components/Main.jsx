import React, { useState } from "react";
import axios from "axios";

export const Main = () => {
  const [prediction, setPrediction] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8000/predict", { message: message })
      .then((response) => {
        console.log(response.data);
        setPrediction(response?.data?.prediction);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleInputChange = (e) => {
    setMessage(e?.target?.value);
  };
  return (
    <div className="container mx-auto mt-20 text-white">
      <div className="mb-6 ">
        <form action="" onSubmit={handleSubmit}>
          <label
            for="large-input"
            className="block mb-2     text-3xl font-medium  dark:text-white "
          >
            Enter the tweet
          </label>
          <textarea
            type="text"
            onChange={handleInputChange}
            value={message}
            id="large-input"
            className="block w-full p-4  border border-blue-400 rounded-lg text-blue-500 font-medium text-xl mt-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <button
            type="submit"
            className=" my-5 text-white bg-gradient-to-r from-sky-500 to-blue-500 hover:bg-blue-700  font-medium rounded-lg w-full sm:w-auto px-5 py-2.5 text-center "
          >
            Submit
          </button>
        </form>
      </div>
      <div>
        {prediction == "Positive" ? (
          <button className="bg-[conic-gradient(at_right,_var(--tw-gradient-stops))] from-green-200 via-green-400 to-green-500 px-10 py-4 font-semibold">
            {prediction} Tweet
          </button>
        ) : (
          <button className="bg-[conic-gradient(at_left,_var(--tw-gradient-stops))] from-red-500 to-red-800 px-10 py-4 font-semibold">
            {prediction} Tweet
          </button>
        )}
      </div>
    </div>
  );
};
