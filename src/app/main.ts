import "@/assets/styles/styles.scss";
import main from "@/app/main.html";
// import axios from "axios";
import * as firebase from "firebase";
import "firebase/firestore";

// console.log(__STATE__);

const config = {
  apiKey: "AIzaSyAy7cyBEXz_EsUWK4OwNQ6b-RrFzjL0EfA",
  authDomain: "south-africa-business-net.firebaseapp.com",
  databaseURL: "https://south-africa-business-net.firebaseio.com",
  projectId: "south-africa-business-net",
  storageBucket: "south-africa-business-net.appspot.com",
  messagingSenderId: "197766701210"
};

firebase.initializeApp(config);
const requestApiKey = "";
const Store = firebase.firestore();
const UserDb = "earlyAdopters";

class MainApp {
  captcha: any;
  submitButton;
  captchaResult;

  constructor() {
    const el = document.getElementById("root");
    el.outerHTML = main;
    document
      .getElementById("js-coming-soon-form")
      .addEventListener("submit", this.formSubmit.bind(this));
    this.submitButton = document.getElementById(
      "js-cn-sabbn-coming-soon-form-submit-button"
    );
    this.submitButton.disabled;
    this.captcha = new firebase.auth.RecaptchaVerifier("captcha-container", {
      callback: (captchaResult => {
        this.submitButton.disabled = false;
        this.captchaResult = captchaResult;
      }).bind(this)
    });
    this.captcha.render();
  }

  resetCaptcha() {
    this.captcha.reset();
  }

  formSubmit(e) {
    e.preventDefault();
    const keys = [
      "name",
      "email",
      "telephone",
      "status",
      "networking",
      "learning",
      "mentoring",
      "collaboration"
    ];
    const data = {};
    const form = new FormData(e.target);
    keys.forEach(field => (data[field] = form.get(field)));

    // console.log("data:", data);
    if (this.captchaResult) {
      data["captchaResult"] = this.captchaResult;
      Store.collection(UserDb)
        .add(data)
        .then(response => {
          keys.map(key => (e.target[key].value = ""));
          document.getElementById("js-coming-soon-form").classList.add("hide");
          document
            .getElementById("js-cn-sabbn-coming-soon-form-result")
            .classList.remove("hide");
          this.resetCaptcha();
          console.log("Document written with ID: ", response.id);
        })
        .catch(error => console.error("Error adding document: ", error));
    }
  }
}

const ctrl = new MainApp();
