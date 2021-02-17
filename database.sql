create TABLE person(
    id Serial PRIMARY KEY,
    login VARCHAR(255),
    password VARCHAR(255)
);

    create TABLE post(
        id Serial PRIMARY KEY,
        title VARCHAR(255),
        content VARCHAR(255),
        date_post DATE ,
        user_id INTEGER,
        FOREIGN KEY (user_id) REFERENCES person (id)
    );
create TABLE comments(
    id Serial PRIMARY KEY ,
    text_comments VARCHAR (255),
    post_id INTEGER ,
    FOREIGN KEY (post_id) REFERENCES post (id),
    user_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES person (id)
);