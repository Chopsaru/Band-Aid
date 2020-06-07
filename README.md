PROMPT
BandAid
Musician Finder: Find that musician, be it a drummer/guitarist/singer, 
to fill the missing piece in your band. (Can have various filter criteria 
such as skill, location, etc.) Customer: Raghuram
---



# Overview

Band Aid is a matchmaker service that allows for musicians to find other musicians with complementary skills and facilitate contact between the two parties. Users may create an account, edit their profile, search for other musicians, invite musicians to join their band, and respond to invitations from other musicians.

# Hosting Instructions

To host the site locally, run main.js using node from your web server of choice. By default, hosting will start on port 5000. Alternatively, you can visit the site at this local IP: [http://3.80.207.19:5000/](http://3.80.207.19:5000/)

# File Structure

   Root - contains node.js routing files separated by page, startup file, sql files, and dbcon
    

-   Images - contains sample image files
    
-   Public - contains content files to be sent to client
    

-   Css - style files
    
-   Images - background, logo, and placeholder files
    
-   Js - supplemental js functions to be loaded after html is delivered
    

-   Views - contains all handlebars html body blocks
    

-   Layouts - contains body wrapper templates
    

  

Quality Attributes

-   Usability
    
-   Compatibility
    
-   Efficiency
    

# Design Patterns

Each page of  Band Aid’s site functionality adheres to a facade design pattern by abstracting a sequence of SQL queries to a MySQL database - fetching user info, musician info, and messages- to achieve a seamless user interface. For example, the UML sequence diagram for loading a user profile page would look like this:
**
![](https://lh6.googleusercontent.com/kSBd6Iqlw70y6icgs6h0ijm08DK6HtbVKkeSfOAoq_Kj96fUA0caHqa2DQIforCNZ04rc5ED51KKwiaGB35uNWz-7legiRRDZQttCpgeFDzaXonqHUw10hkEnspzzdfaKyAQktS5)*
In this example, the User Profile UI is the facade interface for all functions that populate the html details. Each other page has similar patterns.

  

# Architecture / Design

Band Aid operates on a three-tier monolithic software architecture comprising an authorization layer, presentation layer, and application integration layer labeled below in the figure below as “EC2 Instance”. This refers to a AWS EC2 instance running Ubuntu 18.04 LTS that is acting as our web server, and application server. This EC2 is running Node as its hosting environment and we are leveraging express as the framework.

Users and administrators can access Band Aid via their web browsers of choice. Our team has taken special care to support firefox and chrome, and therefore are the recommended option.

Finally, our RDBMS needs are supported by an AWS RDS instance running a single mySQL server. Here all user info, messages, musician info, etc, are stored.
**![](https://lh6.googleusercontent.com/jKZwP3jMBaFTqh1heb1ofRRb2VQTlNgvYjEfVnMzRbojf8SMgjsGAo-KgYyH6j69wK17Auj_Fw9JzIitFs06-AKsT9kH7H6HHHFsLEGJGxiELt23KU3E8sEOBvbXFnVnkxOOnNDD)**


**Handlebars** is being used for html templating and as an input object. **Bootstrap** is being for style and is imported via the main template file directly from the bootstrap stackpath url. **Bcrypt** is being leveraged for password encryption, **Google Maps** for its geocoding api, **body-parser** to parse JSON’s and url line strings, and, **node-cache** to integrate with our user sessions service. Lastly, **node-MySQL** is being used to  to build and execute SQL queries to the external database,

The Band Aid services are largely separated by webpage with few exceptions. All services are listed here:

-   **Login Authentication** ties directly into user sessions and is the service that enables multiple users to use Band Aid at once.
    
-   The **User Sessions** service ensures that no user can be logged into more profiles at once and that private user info is not accessible by other users or non-users.
    
-   The **Search Engine** located at Service .../Search/:user_id enables users to filter the user base to their specifications and contains the origin point for our Messaging service.
    
-   The **Messaging Service** can be surmised at .../:user_id under the inbox tab. Messages sent from the search service can be viewed and responded to here.
    
-   **Geocoding** is used to convert the zip code inputs from our users into latitude and longitude coordinates and identify a radius for the Search Engine.
    
-   Lastly, the **Signup Service** enables to create user accounts and access the rest of the services. Moreover, this service is responsible for encrypting passwords.
**![](https://lh3.googleusercontent.com/As4KDdHxcdLSx3JMbIAn-tUsFd30oMHIkR1q3XqZRuzkYa35Ih6UaEuKqA3P0sUTYwswGuD0_XGe2Iix2CFHOrDQnJG5V9Qvg60Jln5jl-uFFroseoSaXwy2ZwAwmsp9vFaNOFYR)**
A use case for a new user combines all of these services in a concise manner. Below is a sequence diagram depicting a brand new user to the site looking for a specific musician in a given area. Messages between the entities with bolded text imply that the user’s direct input.
**![](https://lh3.googleusercontent.com/nDmz5lJUQtwIDq8YddB_gE9RjLhzVA1Z6shQ-lobn0ly2pSV9w19p6vrBxINeYNfx0rKfm9uIkPf1XAD_4hIguhRjvvm-ikCzT6Z312s-XYKCBhrIMl7PzdRSKV98xf7ZkrBOqdv)**
In plain English:
New User browses to Band Aid’s home page, where they are greeted with a login screen. As of yet, New User is unfamiliar with the services Band Aid can offer and therefore navigates to the “About” Page. Satisfied with the information here, New User decides to create an account. New User navigates back to the login page to create an account. Selecting the corresponding button navigates them to the “Signup” web page where they enter their user information and click the create account button. Band Aid then automatically encrypts their password and redirects them back to the sign in page. Signing in triggers Band Aid’s password authentication service where it compares their input to the encrypted password it has in the database. If these variables do not match it alerts New User with an error. If the variables match, Band Aid triggers its user session service and flags their browser instance as being part of the active profile. New User is then directed to their user profile where the information they populated in the sign up form displays here. New User then navigates to the “Search” page; loading this page makes a check to User Sessions again to confirm that the user is still logged in, then prompts the user for a new search. Initializing a new search redirects New User to a series of questions aimed to filter their results based on their preferences. After answering the last question, Band aid checks if there are any results. If there are none, New User is prompted to start another search. If at least one result is returned, then that musician is displayed here. New User may then select any number of musicians returned this way and send them a message. Doing so redirects them back to the user profile page where their message is displayed in the sent tab of their inbox. From here New User may sign out, concluding the sequence diagram.

  

# Current State

It it's current state, Band Aid is a fully functional product prototype that meets all functional and non-functional requirements given by our client.

Outstanding Bugs/Issues:

 - No notification when attempting to log in with invalid credentials.
 - User Profile tab needs to be moved to better align with the relevant information.

Remaining Product Backlog:

 - BA008 As a PRODUCER, I want to SHOW EXAMPLES OF MY WORK so that BANDS WHO LIKE MY STYLE CAN REACH OUT TO COLLABORATE (Out of scope)
 - BA006 As a MUSICIAN LOOKING FOR A BAND/WORK, I want to see information of any band that is interested in me so that I have can make an informed decision to accept or decline their invitation. (Out of scope)


# Future Contributors

If you are interested in contributing to Band Aid, please reach out to Nathan Johnson at johnsna7@oregonstate.edu or submit a pull request to [github.com/Chopsaru/Band-Aid](https://github.com/Chopsaru/Band-Aid).

Future features include: Band profile support, embedded demo audio, alternate-type account support, and multiple instrument proficiency support.
