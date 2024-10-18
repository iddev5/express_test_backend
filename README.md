# Checklist

## Backend
- [x] Basic routes
- [x] Static files
- [x] Session based auth using express-session
- [x] Multiple routers
- [x] Authorized rouets
- [x] Database (drizzle integration) 
- [x] Routes using database
- [ ] Routes with parameters
- [ ] Creating custom cookies
- [ ] Use redis for session store
- [ ] Downloads
- [ ] Sending emails
- [ ] Using ejs templates
- [ ] Creating error pages
- [ ] Markdown template engine
- [ ] MVC-style controllers
- [ ] Tracking online user activity
- [ ] Improve auth services
- [ ] API Service
- [ ] User bans & invalidating sessions

## Database
- [x] Basic MySQL using dizzle
- [ ] Redis
- [ ] MongoDB

## API
- [ ] Twilio
- [ ] Stripe

## Scraping
- To Do

## AI/ML
- [ ] OpenAI GPT API integration

# How to run?

1) Setup a MySQL server locally or use a managed service.   
Windows users use XAMPP. There are plenty of videos/resources available online on installing and setting up of MySQL

2) Clone the repository
```sh-session
git clone https://github.com/iddev5/express_test_backend
cd express_test_backend
```

3) Install all the dependencies from NPM
```sh-session
npm i
```

4) Create a database and put the URL of the database in a .env file  
i. Login to MySQL and run the following command to create a database
```sql
create database express_test;
```
Exit the MySQL command prompt.  
ii. Forge the URL:
```
mysql://<username>:<password>@localhost:3306/<database_name>
```
Fill <username> and <password> as necessary (without the < and > characters)  
<database_name> is express_test, unless you have changed it.    
iii. Create a new file called .env in the directory where the respository is clone and put the above formed URL in it:
```env
DATABASE_URL=<above url>
```

5) Run database migration. This step will create the necessary tables:  
```sh-session
npx drizzle-kit migrate
```

6) Run the command to start the backend
```
npm run dev
```

7) Finally, open Postman to test the APIs. Refer to source code on what APIs are available and what arguments are expected.  