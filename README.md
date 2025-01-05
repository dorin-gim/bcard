# BCard - Create, Connect, and Showcase Your Business in One Place

This project demonstrates the functionality and features of the BCard platform, enabling professionals to design, connect, and showcase their business cards online.

## Table of Contents

- [Project Description](#project-description)
- [Technologies](#technologies)
- [Installation](#installation)
  - [Prerequisites](#prerequisites)
  - [Installation Steps](#installation-steps)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)
- [Acknowledgments](#acknowledgments)

## Project Description

**BCard** aims to modernize the way professionals and businesses connect. With this app, users can design personalized digital business cards, explore a professional directory, and share their identity effortlessly. Whether you're an entrepreneur, freelancer, or part of a large company, BCard is the perfect tool to stand out and make a lasting impression.

### Key Features:

- **Customizable Designs**: Create unique business cards that reflect your brand identity.
- **Networking Made Simple**: Share your card instantly and discover new connections through a searchable directory.
- **Eco-Friendly & Convenient**: Reduce paper waste with digital cards available at your fingertips.
- **Accessible Anytime, Anywhere**: Your business card is always online, ready to be shared or updated.
- **Expand Your Reach**: Join a community of professionals to build connections and grow your network.


## Technologies

- **Frontend**: React, React Router, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **API Integration**: RESTful APIs

## Installation

To get a local copy up and running, follow these simple steps.

### Prerequisites

Ensure you have the following installed on your local machine:

- [Node.js](https://nodejs.org/) (v14 or later)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [MongoDB](https://www.mongodb.com/)

### Installation Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/dorin-gim/bcard.git
   cd bcard

2.Install dependencies:
  
    npm install

3.Set up environment variables:
Create a .env file in the root directory and add the following:

    REACT_APP_API_URL=http://localhost:5000
    REACT_APP_SECRET_KEY=your_secret_key
    MONGO_URI=your_mongodb_connection_string

4.Start the development server:

    npm start

The app should now be running on http://localhost:3000.

Usage
Sign Up: Create an account to get started.
Design Your Card: Use our intuitive editor to customize your digital business card.
Share and Connect: Share your card with others and explore connections via the directory.