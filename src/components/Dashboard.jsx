import React from "react";
import { GoogleLogout } from "react-google-login";
import { useNavigate } from "react-router-dom";
import { useAPI } from "../context/Context";
import { useForm } from "react-hook-form";

const Dashboard = () => {
  const { postFiles, getFiles, files, downloadFiles } = useAPI();
  const myClientId = "336704564784-rseegpft0pqol5ijssnq8uupp6i6tk84.apps.googleusercontent.com";
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onLogOut = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload(true);
    console.log(`LogOut Sucess`);
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("file", data.file[0]);
    postFiles(formData);
    getFiles();
  };

  const handleDownload = async (name) => {
    await downloadFiles(name);
  };

  return (
    <div className="container">
    <div className="user">
    <img src={localStorage.getItem("image")} alt="Profile"/>
    <div className="name">{localStorage.getItem("name")}</div>
    <GoogleLogout className="g-signout" clientId={myClientId} buttonText="Logout" onLogoutSuccess={onLogOut}/>
    </div>
    <div className="main">
    <h1>Upload Your Files Here</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="file" className="custom-file-input" {...register("file")} />
        <input type="submit" />
      </form>
      <div className="data">
        {files.map((each, i) => {
          return (
            <div className="item" key={i} onClick={() => handleDownload(each.name)}><p>{each.name}</p></div>
          );
        })}
      </div>
      </div>
    </div>
  );
};

export default Dashboard;
