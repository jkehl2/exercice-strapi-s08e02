# Strapi application

Exercie about implement Strapi on Onews postgresql Database with : 
 - Article table
 - User table
 - Category

MCD : 

![MCD](https://github.com/O-clock-Lyra-JS/strapi-s08e02-jkehl2/blob/main/docs/MCD.svg)

    AUTEURS: id_auteur
    ECRIT, 1N AUTEURS, 01 ARTICLES
    ARTICLES: id_article
    CONTIENT, 1N ARTICLES, 1N CATEGORIES
    CATEGORIES: id_categories
