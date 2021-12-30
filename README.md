Node.js - jsonfile
================

Writing `JSON.stringify()` and then `fs.writeFile()` and `JSON.parse()` with `fs.readFile()`.



Installation
------------
    install node.js
    npm install --save jsonfile
    npm install --save express mysql body-parser hbs
    
  ps: if node.js cannot work try to add node.js path to environtment
**Run:**
    node app.js



API
---

* ['Read File']
* ['Create File']
* ['Update File']
* ['Delete File']
* ['Search']

----

### Read File

```js
app.get('/film', (req, res) => {
        readFile(data => {
            var datafilm = data;
            res.render('product_view', {
                results: datafilm
            });
        }, true);
    });
 ```
    
### Create File

```js
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
```

### Update File

```js
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
```

### Delete File

```js
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
```

### Search

```js
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
```

**Data Film JSON file:**

[
  {
    "film_id": 1640841047106,
    "film_title": "Spiderman",
    "film_genre": "Action",
    "film_duration": "120"
  },
  {
    "film_id": 1640841067583,
    "film_title": "Pink Panther",
    "film_genre": "Comedy",
    "film_duration": "40"
  },
  {
    "film_id": 1640841086662,
    "film_title": "Insidious",
    "film_genre": "Horror",
    "film_duration": "100"
  }
]
  
