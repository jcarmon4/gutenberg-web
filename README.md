# Gutenberg Information Retrieval Web
##### Universidad EAFIT
##### Alejandro Sanchez - dsibalejandrosanchez@gmail.com
##### Alejandro Carmona Ramirez - alejocram@gmail.com
***

## Table of contents
  * [Apache Pig.](#ApachePig)
    * [Pig Latin](##PigLatin)

Gutenberg Information Retrieval is the final project for Big Data in Hadoop subject of EAFIT University.
The project has an [lambda architecture] that consists with a batch layer over hadoop to build the inverted index for the spanish Gutenberg dataset, and a speed layer with a web application to retrieval the information.
[The Spanish Gutenberg] has 461 free eBooks to download or read them online. It contains the world's great literature, especially older works for which copyright has expired.

The batch layer of project that build the inveted index is in the repository [Text Analysis Processing], while in here can see the layer application with front-end and consumes the indexes in Redis Cache database. 

# Features

  - Retrievals the top 10 books, where it can find the search terms that you had typed in the search field.
  - When select and specific books from the result list, the application presents the 10 most similar books.

# Tech
The project uses some open source projects to work:

* [Twitter Bootstrap] - great UI boilerplate for modern web apps
* [node.js] - evented I/O for the backend
* [Express] - fast node.js network app framework [@tjholowaychuk]
* [Gulp] - the streaming build system
* [GitHub] - open source reposotory.
* [Redis] - in-memory data structure store.

# Develoment

### Database
The application requires an specific structure in Redis, 5 sets in namespaces.

* It consists in the document list by word. 
```sh
LSET word:agua "10293.txt"
LSET word:agua "44918-8.txt"
...
```

* It has the idf by each word.
```sh
SET idf:agua "0.5"
```

* It consists in the tfidf by word in a document. 
```sh
SET tfidf:10293-8.txt;;agua "0.5"
```

* It consists in the magnitude of the document. 
```sh
SET magnitude:10293.txt "0.5"
```

* It consists in a hash map with the similarity between two documents.
```sh
HMSET similarity:10293.txt 44918-8.txt "0.9"
HMSET similarity:10293.txt 43400-8.txt "0.7"
...
```

### Feature implementation  
Search feature receives a query.
* Filters the query for spanish and english stop words, then the query is normalizate with NFD, and finally replaces the special characters. 
* Then for each word retrieves the documents where the word is finded.
* The query can be manage as a document, in order to the TFIDF is calculated over it.
* Finally, it requieres to calculate the cosine similarity between the query and each document.

# Installation
Gutenberg IR requires [Redis] to retrieval the information that has been feeded by the batch layer. 
##### Environment variables
Set the environment variables.
```sh
nano ~/.bash_profile
export AZURE_REDIS_URL_HOST=
export AZURE_REDIS_PORT=
export AZURE_REDIS_URL_PASSWORD= 
...
```

Install [Node.js](https://nodejs.org/) v6+ to run the web application.

Install the dependencies and start the server.

```sh
$ cd gutenberg-web
$ npm install
$ npm start
```

### Deploy
For production release:

```sh
127.0.0.1:300
```

License
----

MIT

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)


   [dill]: <https://github.com/joemccann/dillinger>
   [git-repo-url]: <https://github.com/joemccann/dillinger.git>
   [john gruber]: <http://daringfireball.net>
   [df1]: <http://daringfireball.net/projects/markdown/>
   [markdown-it]: <https://github.com/markdown-it/markdown-it>
   [Ace Editor]: <http://ace.ajax.org>
   [node.js]: <http://nodejs.org>
   [Twitter Bootstrap]: <http://twitter.github.com/bootstrap/>
   [jQuery]: <http://jquery.com>
   [@tjholowaychuk]: <http://twitter.com/tjholowaychuk>
   [express]: <http://expressjs.com>
   [AngularJS]: <http://angularjs.org>
   [Gulp]: <http://gulpjs.com>
   [Text Analysis Processing]: <https://github.com/ibalejandro/pc_labs_text_analysis_processing>
   

   [PlDb]: <https://github.com/joemccann/dillinger/tree/master/plugins/dropbox/README.md>
   [PlGh]: <https://github.com/joemccann/dillinger/tree/master/plugins/github/README.md>
   [PlGd]: <https://github.com/joemccann/dillinger/tree/master/plugins/googledrive/README.md>
   [PlOd]: <https://github.com/joemccann/dillinger/tree/master/plugins/onedrive/README.md>
   [PlMe]: <https://github.com/joemccann/dillinger/tree/master/plugins/medium/README.md>
   [PlGa]: <https://github.com/RahulHP/dillinger/blob/master/plugins/googleanalytics/README.md>
