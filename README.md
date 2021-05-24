# BookHub

[Click here to visit Bookhub](https://a-book-hub.herokuapp.com/)

## Table of contents

- [General Info](general-info)
- [Setup](#setup)
- [Technologies](#technologies)
- [Known Issues](#known-issues)
- [Process Work](#process-work)
- [Default Routes](#default-routes)
- [Status](#status)
- [Future Considerations](#future-considerations)

### General Info

This project was my first attempt at creating a fullstack application. The intention of BookHub was to create an app where book lovers could search books, consolidate their favorite to a Bookshelf and interact with other users.

_Screenshot of a users Bookshelf_

![bookshelf](/public/assets/bookshelf-screenshot.png)

### Setup

1. _`Fork`_ and _`Clone`_ this respository to your local machine
2. Open the directory in your text editor of choice to view or edit the code
3. Install dependencies and set up your database to work in your local port

### Technologies

This project was created using:

- EJS
- EJS Layouts
- CSS Bootstrap
- NodeJS
- Axios
- Express
- Sequelize
- Postgres
- Bcrypt
- Passport
- Sessions

### Known Issues

1. Sequelize has question marks reserved as special characters so at the moment the post titles cannot have question marks included with causing an error in the code.

2. When fetching data from the API my code required the return of cover images that, on some occasionas, kept shutting down my server. When I inspected the data on a search I realized that some books did not have cover image data which was creating an error in the return. I resolved this by creating an 'if' statement in the forEach function to render a dummy image to the page if no image was attached to the search.

```javascript
 <% bookData.forEach(book => { %>
        <div class="bookReturn col-12 my-2">
            <div class="row my-3">
                <div class="col-4 text-center">
                    <% if (book.imageLinks){%>
                        <img src="<%= book.imageLinks.thumbnail %>" alt="Front Cover of <%=book.title%>">
                        <% }else { %>
                            <h1>no image available</h1>
                        <% } %>
                </div>
                <div class="col">
                    <p class="fs-4 mb-0"><%=book.title%></p>
                    <p class="fs-5 fst-italic"><%=book.subtitle%></p>
                    <p>by : <%=book.authors%></p>
                    <p>Publication Date: <%=book.publishedDate%></p>
                </div>
            </div>
            <div class="col m-3">
                <p class="fs-5"><%=book.description%></p>
            </div>
            <form method="POST" action="/addtofavorites">
                <input type="hidden" name="userId" value="<%= user.id%>">
                <input hidden type="text" name="title" value="<%=book.title%>">
                <input hidden type="text" name="subtitle" value="<%=book.subtitle%>">
                <input hidden type="text" name="authors" value="<%=book.authors%>">
                <% if (book.imageLinks){%>
                <input hidden type="text" name="bookCover" value="<%=book.imageLinks.thumbnail %>">
                <% }else { %>
                    <input hidden type="text" name="bookCover" value="null">
                <% } %>
                <div class="col float-end mb-2 mx-2">
                    <button type="submit" class="btn btn-secondary fs-5">Add to Favorites</button>
                </div>
            </form>
        </div>
        <% }) %>
```

## Process Work

1. Created a user model and added authentication using passport, bcrypt and flash for user security.
2. Built ERD for database organization and created wireframes for each page to determine views files.
3. Built post, comment & book models to add data to database.
4. Built GET routes to all views files and seeded the database.
5. Utilized the Google Books API to search books by title, author or category and rendered search results to the page.
6. Built forms that create, update, and/or delete elements in the database.

## Default Routes

| Method | Path | Location | Purpose

| --- |:-------------:| ---------:| ------------:

| GET | / | server.js | App Main page

| GET | /auth/login | auth.js | Login form

| GET | /auth/signup | auth.js | Signup form

| GET | /home | server.js | Home page

| GET | /new | server.js | Create A Post Page

| GET | /home/:title | server.js | Individual Post Page

| POST | /comments | server.js | Add Comment to a post

| PUT | /edit | server.js | Edit a Comment

| GET | /search | server.js | Search Page

| GET | /books/:title | server.js | Results Page

| GET | /profile | server.js | User Bookshelf Page

| POST | /articles | server.js | Post New Article

| POST | /addtofavorites | server.js | Add a Book to Bookshelf

| DELETE | /remove | server.js | Remove a book from favorites

## Status

🎊 Complete 🎊

## FUTURE CONSIDERATIONS

1. Add models so users can add 'mustRead' books to their Bookshelf
2. Create bookclubs that users can join to have live chats and private posts.
