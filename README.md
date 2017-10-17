# Secret Handshake

A good old-fashioned hack that repurposes existing technology in an interesting way.

Secret Handshake allows users to upload images and text via our web app to our secure server, which uses OTP encryption to post their hashed files on a designated subreddit for storage until needed. Each file is identified by a unique key provided by the user, so users can access their files anywhere and from any device with internet connection as long as they remember their key.

This repository is for the front end which was built in ReactJS and can be found at 

  https://luis-gzz.github.io/SecretHandshake/

The backend for the project was written using Golang and can be found at 

  https://github.com/luis-gzz/SecretHandshakeServer
  


The code for both the front and backend is very sloppy and includes many errors as it was written for a 36hr hackathon.

WARNING: Image uploading and downloading only tested with small files
