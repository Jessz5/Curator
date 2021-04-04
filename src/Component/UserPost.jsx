import React from "react";
import { Link } from "react-router-dom";
import "../UserPost.css";
import Navbar from "./Navbar.jsx";
export default class UserPost extends React.Component {
  render() {
    return (
      <div className="PostGrid">
    <div class="NavContainer">
      <Navbar/>
    </div>
  <div class="Right-offset"></div>
  <div class="Left-Offset"></div>
  <div class="Post1"></div>
  <div class="Post2"></div>
  <div class="Post3"></div>
  <div class="Post4"></div>
  <div class="Post5"></div>
  <div class="Post6"></div>
    </div>
    );
  }
}
