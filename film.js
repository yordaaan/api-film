const userRoutes = (app, fs) => {
    //...unchanged ^^^
    const dataPath = './data/film.json';

    // refactored helper methods
    const readFile = (
        callback,
        returnJson = false,
        filePath = dataPath,
        encoding = 'utf8'
    ) => {
        fs.readFile(filePath, encoding, (err, data) => {
            if (err) {
                throw err;
            }

            callback(returnJson ? JSON.parse(data) : data);
        });
    };

    const writeFile = (
        fileData,
        callback,
        filePath = dataPath,
        encoding = 'utf8'
    ) => {
        fs.writeFile(filePath, fileData, encoding, err => {
            if (err) {
                throw err;
            }

            callback();
        });
    };

    // READ
    app.get('/film', (req, res) => {
        readFile(data => {
            var datafilm = data;
            res.render('product_view', {
                results: datafilm
            });
        }, true);
    });

    // CREATE
    app.post('/save', (req, res) => {
        readFile(data => {
            // add the new user
            var id_film = Date.now();
            var filmbaru = {
                "film_id": id_film,
                "film_title": req.body.film_title,
                "film_genre": req.body.film_genre,
                "film_duration": req.body.film_duration
            }
            let newdata = (data).length;
            //append user variable to list
            data[newdata] = filmbaru;
            console.log(data);

            writeFile(JSON.stringify(data, null, 2), () => {
                res.redirect('/film');
            });
        }, true);
    });

    // UPDATE
    app.post('/update', (req, res) => {
        readFile(data => {
            // add the new user
            const filmId = req.body.film_id;
            function findId(data, idToLookFor) {
                var categoryArray = data;
                for (var i = 0; i < categoryArray.length; i++) {
                    if (categoryArray[i].film_id == idToLookFor) {
                        return (i);
                    }
                }
            }
            datafilm = findId(data, filmId);
            var update = {
                "film_id": req.body.film_id,
                "film_title": req.body.film_title,
                "film_genre": req.body.film_genre,
                "film_duration": req.body.film_duration
            }
            data[datafilm] = update;

            writeFile(JSON.stringify(data, null, 2), () => {
                res.redirect('/film');;
            });
        }, true);
    });

    // DELETE
    app.post('/delete', (req, res) => {
        readFile(data => {
            const filmId = req.body.film_id;
            function findId(data, idToLookFor) {
                var categoryArray = data;
                for (var i = 0; i < categoryArray.length; i++) {
                    if (categoryArray[i].film_id == idToLookFor) {
                        return (i);
                    }
                }
            }
            datafilm = findId(data, filmId);
            data.splice(datafilm, 1);

            writeFile(JSON.stringify(data, null, 2), () => {
                res.redirect('/film');
            });
        }, true);
    });

    // SEARCH
    app.post('/searchFilm', (req, res) => {
        readFile(data => {
            var datafilm = req.body.searchBar;
            const li = data.filter((character) => {
                return (
                    character.film_title.toUpperCase().includes(datafilm.toUpperCase()) ||
                    character.film_genre.toUpperCase().includes(datafilm.toUpperCase()) ||
                    character.film_duration.includes(datafilm)
                );
            });
            res.render('product_view', {
                results: li
            });
        }, true);
    });

};

module.exports = userRoutes;