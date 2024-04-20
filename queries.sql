
SELECT 
   table_name, 
   column_name, 
   data_type 
FROM 
   information_schema.columns
WHERE 
   table_name = 'movies';

INSERT INTO movies (title, poster_image_url, release_date, genre, director_id, scriptwriter_id, rating)
      VALUES ('Alice Through the Looking Glass', 'https://lumiere-a.akamaihd.net/v1/images/p_alicethroughthelookingglass_19873_4762a631.jpeg', TO_DATE('2016-12-28', 'YYYY-MM-DD'), 'fantasy', 'afe50300-136e-4fd7-a85a-90d95a16ce1d', 'd5ddf69b-e51e-4892-bcde-f31282a449ae', '7')
      RETURNING id;


//MOVIE
//- id 
//- title
//- poster
//- release date
//- genres -> movie-genres

//MOVE-GENRES
//id
//movie-id
//genre

//MOVIE-ROLE
//- id
//- movie-id
//- role
//- person-id

//Person
//- id
//- first name
//- last name
//- photo-url
//- proffessions -> person-proffesion

//Person-Proffesion
//- id
//- person-id
//- proffesion

---------------------------------------------------------
--create movies
---------------------------------------------------------


CREATE TABLE Movie (
    id uuid PRIMARY KEY,
    title varchar(255) NOT NULL,
    poster_url varchar(255) NOT NULL,
    rating int NOT NULL,
    release_date TIMESTAMP NOT NULL
);

CREATE TABLE Movie_Genre (
    id uuid PRIMARY KEY,
    movie_id uuid NOT NULL,
    genre varchar(255) NOT NULL,
    CONSTRAINT fk_movie FOREIGN KEY(movie_id) REFERENCES movie(id)
);

CREATE TABLE Movie_Role (
    id uuid PRIMARY KEY,
    movie_id uuid NOT NULL,
    role varchar(255) NOT NULL,
    person_id uuid NOT NULL,
    CONSTRAINT fk_movie FOREIGN KEY(movie_id) REFERENCES movie(id),
    CONSTRAINT fk_person FOREIGN KEY(person_id) REFERENCES person(id)
);

CREATE TABLE Person (
    id uuid PRIMARY KEY,
    first_name varchar(255) NOT NULL,
    last_name varchar(255) NOT NULL,
    photo_url varchar(255) NOT NULL
);

CREATE TABLE Person_Profession (
    id uuid PRIMARY KEY,
    person_id uuid NOT NULL,
    proffesion varchar(255) NOT NULL,
    CONSTRAINT fk_person FOREIGN KEY(person_id) REFERENCES person(id)
);

--schema check
select column_name, data_type, character_maximum_length, column_default, is_nullable
from INFORMATION_SCHEMA.COLUMNS where table_name = 'movie';

