import React from "react";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <>
      <div className="sticky-footer">
        <div className="link">
          <a href="https://twitter.com/Anand786akm" className="twitter lg">
            <FaTwitter />
          </a>

          <a
            href="https://www.instagram.com/akm_16.10/"
            className="instagram lg"
          >
            <FaInstagram />
          </a>
          <a
            href="https://www.linkedin.com/in/anand-kr-maurya-akm16?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
            className="linkedin lg"
          >
            <FaLinkedin />
          </a>
          <a href="https://github.com/anand123AKM" className="github lg">
            <FaGithub />
          </a>
        </div>
        <h6>©2025. AKM</h6>
      </div>
    </>
  );
}

export default Footer;
