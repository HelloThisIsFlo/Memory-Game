import _ from "lodash";
import {doSum} from './sum';

function component() {
  const element = document.createElement("div");

  const result = doSum(3, 4);
  element.innerHTML = _.join(["Sum:", result], " ")

  return element;
}

document.body.appendChild(component());