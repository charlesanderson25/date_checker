// const axios = require("axios");
// const cheerio = require("cheerio");

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

import axios from "axios";
import cheerio from "cheerio";

const url = "https://www.w3schools.com/";

async function fetchData() {
  console.log("Iniciando requisição...");
  axios
    .get(url)
    .then((response) => {
      console.log("Requisição bem-sucedida! Processando dados...");
      const $ = cheerio.load(response.data);
      const components = [{}];

      const componentElements = $(".w3-col.l6.w3-center");

      componentElements.each((index, element) => {
        const name = $(element).find(".w3-text-dark-grey").text().trim();

        components.push({ name });
      });
      saveNames(components);
    })
    .catch((error) => {
      console.error("Erro ao tentar localizar os dados", error);
    });
}

function saveNames(components) {
  console.log("Nomes encontrados:");
  components.forEach((component, index) => {
    console.log(`${index + 1}. ${component.name}`);
  });
}

fetchData();
