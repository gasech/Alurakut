# ![Alurakut Logo](https://alurakut.vercel.app/logo.svg)
#### This project is made based on "Imersão Alura" **(7/12/2021 - 7/17/2021)**

## Programming language and Tools used
<p align="left"> <a href="https://www.w3.org/html/" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg" alt="html5" width="40" height="40"/> </a> <a href="https://www.w3schools.com/css/" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original-wordmark.svg" alt="css3" width="40" height="40"/> </a> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="40" height="40"/> </a> <a href="https://nodejs.org" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" width="40" height="40"/> </a> <a href="https://reactjs.org/" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" alt="react" width="40" height="40"/> </a> <a href="https://nextjs.org/" target="_blank"> <img src="https://cdn.worldvectorlogo.com/logos/nextjs-3.svg" alt="nextjs" width="40" height="40"/> </a> </p>

## How to use
This directory is currently **(7/20/21)** [deployed in Vercel](https://alurakut-five-nu.vercel.app/login), if you want to test using your Github Login name.

## How to develop

**Requirements:**
* Node.js
* Any IDE (e.g. VSCode)

Clone the directory using ```git clone https://github.com/gasech/Alurakut.git```

This project is using [DatoCMS](https://www.datocms.com/) data, so an account is needed to proceed. 

Create a project and enter the dashboard, create a new model called `Community` and add the following Text Fields `Title` (title) `Image URL` (image_url) and `Creator` (creator_name).

Add a file named `next.config.js` in the root of the directory and add the following code inside the file:

```
module.exports = {
  env: {
    FULLACCESSTOKEN:'YOUR-FULL-ACCESS-TOKEN',
    READONLYTOKEN:'YOUR-READ-ONLY-TOKEN',
    COMMUNITYTABLE:'YOUR-COMMUNITY-TABLE-ID'
  }
}
```
First two tokens are located in DatoCMS. (Both tokens will look something like this `12a34bc456defc234257cfvcv3d351xyz`) 

You can fill the  `COMMUNITYTABLE` with the id atached to your model (the Model ID will look like this `123456`)

**Getting started**

Open Node.js command prompt or you can use the command prompt inside your IDE if desirable.

Go to your directory using `cd C:\Users\youruser\Documents\Alurakut`

Type `npm run dev`, this should start the server. You can locally see the changes in `http://localhost:3000`.
