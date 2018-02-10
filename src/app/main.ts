import "@/assets/styles/styles.scss";
import main from "@/app/main.html";
import axios from "axios";

console.log(__STATE__);

class ViewController {
  demo = "test";

  constructor() {
    const el = document.getElementById('root');
    el.outerHTML = main;
    document.getElementById("js-coming-soon-form").addEventListener("submit", this.formSubmit);
  }

  formSubmit(e) {
    e.preventDefault();
    const keys = ["name", "email", "telephone", "status", "networking", "learning", "mentoring", "collaboration"];
    const data = {}
    const form = new FormData(e.target);
    keys.forEach( (field) => data[field] = form.get(field));
    console.log("data:", data);
    axios({
      data: data,
      method: "post",
      url: "http://localhost:5000/form"
    }).then((response) => {
      keys.map((key) => e.target[key].value = "");
      document.getElementById("js-coming-soon-form").classList.add("hide");
      document.getElementById("js-cn-sabbn-coming-soon-form-result").classList.remove("hide");
    })
  }
}

const ctrl = new ViewController()
