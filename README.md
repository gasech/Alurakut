# ![Alurakut Logo](https://alurakut.vercel.app/logo.svg)
#### This project is made based on "Imersão Alura" **(7/12/2021 - 7/17/2021)**

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
