import React, { useEffect, useState } from "react";
import "./App.css";
import {
  Routes,
  Route,
  useNavigate,
  useParams,
  Navigate,
} from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import InfoIcon from "@mui/icons-material/Info";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Paper from "@mui/material/Paper";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { API } from "./global";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

// const INTIAL_MOVIE_LIST = [
//   {
//     name: "RRR",
//     poster:
//       "https://englishtribuneimages.blob.core.windows.net/gallary-content/2021/6/Desk/2021_6$largeimg_977224513.JPG",
//     rating: 8.8,
//     summary:
//       "RRR is an upcoming Indian Telugu-language period action drama film directed by S. S. Rajamouli, and produced by D. V. V. Danayya of DVV Entertainments.",
//     trailer: "https://www.youtube.com/embed/f_vbAtFSEc0",
//   },
//   {
//     name: "Iron man 2",
//     poster:
//       "https://m.media-amazon.com/images/M/MV5BMTM0MDgwNjMyMl5BMl5BanBnXkFtZTcwNTg3NzAzMw@@._V1_FMjpg_UX1000_.jpg",
//     rating: 7,
//     summary:
//       "With the world now aware that he is Iron Man, billionaire inventor Tony Stark (Robert Downey Jr.) faces pressure from all sides to share his technology with the military. He is reluctant to divulge the secrets of his armored suit, fearing the information will fall into the wrong hands. With Pepper Potts (Gwyneth Paltrow) and Rhodes (Don Cheadle) by his side, Tony must forge new alliances and confront a powerful new enemy.",
//     trailer: "https://www.youtube.com/embed/wKtcmiifycU",
//   },
//   {
//     name: "No Country for Old Men",
//     poster:
//       "https://upload.wikimedia.org/wikipedia/en/8/8b/No_Country_for_Old_Men_poster.jpg",
//     rating: 8.1,
//     summary:
//       "A hunter's life takes a drastic turn when he discovers two million dollars while strolling through the aftermath of a drug deal. He is then pursued by a psychopathic killer who wants the money.",
//     trailer: "https://www.youtube.com/embed/38A__WT3-o0",
//   },
//   {
//     name: "Jai Bhim",
//     poster:
//       "https://m.media-amazon.com/images/M/MV5BY2Y5ZWMwZDgtZDQxYy00Mjk0LThhY2YtMmU1MTRmMjVhMjRiXkEyXkFqcGdeQXVyMTI1NDEyNTM5._V1_FMjpg_UX1000_.jpg",
//     summary:
//       "A tribal woman and a righteous lawyer battle in court to unravel the mystery around the disappearance of her husband, who was picked up the police on a false case",
//     rating: 8.8,
//     trailer: "https://www.youtube.com/embed/nnXpbTFrqXA",
//   },
//   {
//     name: "The Avengers",
//     rating: 8,
//     summary:
//       "Marvel's The Avengers (classified under the name Marvel Avengers\n Assemble in the United Kingdom and Ireland), or simply The Avengers, is\n a 2012 American superhero film based on the Marvel Comics superhero team\n of the same name.",
//     poster:
//       "https://terrigen-cdn-dev.marvel.com/content/prod/1x/avengersendgame_lob_crd_05.jpg",
//     trailer: "https://www.youtube.com/embed/eOrNdBpGMv8",
//   },
//   {
//     name: "Interstellar",
//     poster: "https://m.media-amazon.com/images/I/A1JVqNMI7UL._SL1500_.jpg",
//     rating: 8.6,
//     summary:
//       "When Earth becomes uninhabitable in the future, a farmer and ex-NASA\n pilot, Joseph Cooper, is tasked to pilot a spacecraft, along with a team\n of researchers, to find a new planet for humans.",
//     trailer: "https://www.youtube.com/embed/zSWdZVtXT7E",
//   },
//   {
//     name: "Baahubali",
//     poster: "https://flxt.tmsimg.com/assets/p11546593_p_v10_af.jpg",
//     rating: 8,
//     summary:
//       "In the kingdom of Mahishmati, Shivudu falls in love with a young warrior woman. While trying to woo her, he learns about the conflict-ridden past of his family and his true legacy.",
//     trailer: "https://www.youtube.com/embed/sOEg_YZQsTI",
//   },
//   {
//     name: "Ratatouille",
//     poster:
//       "https://resizing.flixster.com/gL_JpWcD7sNHNYSwI1ff069Yyug=/ems.ZW1zLXByZC1hc3NldHMvbW92aWVzLzc4ZmJhZjZiLTEzNWMtNDIwOC1hYzU1LTgwZjE3ZjQzNTdiNy5qcGc=",
//     rating: 8,
//     summary:
//       "Remy, a rat, aspires to become a renowned French chef. However, he fails to realise that people despise rodents and will never enjoy a meal cooked by him.",
//     trailer: "https://www.youtube.com/embed/NgsQ8mVkN8w",
//   },
// ];

function App() {
  const navigate = useNavigate();
  const [mode, setMode] = useState("light");

  const Theme = createTheme({
    palette: {
      mode: mode,
    },
  });

  return (
    <ThemeProvider theme={Theme}>
      <Paper elevation={3} style={{ minHeight: "100vh" }}>
        <div className="App">
          <AppBar position="static" color="primary" className="navbar">
            <Toolbar>
              <IconButton>
                <Button onClick={() => navigate("/")} color="inherit">
                  home
                </Button>
                <Button onClick={() => navigate("/movies")} color="inherit">
                  movies
                </Button>
                <Button onClick={() => navigate("/movies/add")} color="inherit">
                  addmovies
                </Button>
                <Button
                  startIcon={
                    mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />
                  }
                  onClick={() => setMode(mode === "light" ? "dark" : "light")}
                  color="inherit"
                >
                  {mode === "light" ? "dark" : "light"} mode
                </Button>
              </IconButton>
            </Toolbar>
          </AppBar>
          {/* <nav>
       <ul> 
        <li> <Link to = "/">home</Link></li>
        <li> <Link to = "/movies"> movies</Link></li>
        <li> <Link to = "/movies/add">addmovies</Link></li>
         
       </ul> 

      </nav> */}
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/movies" element={<Movielist />}></Route>
            <Route path="/movies/add" element={<Addmovie />}></Route>
            <Route path="/movies/:id" element={<Moviedetail />}></Route>
            <Route path="/movies/edit/:id" element={<Editmovies />}></Route>
            <Route path="/404" element={<Notfound />}></Route>
            <Route path="*" element={<Navigate replace to="/404" />}></Route>
          </Routes>
        </div>
      </Paper>
    </ThemeProvider>
  );
}
function Editmovies() {
  const [movie, setMovie] = useState(null);
  const { id } = useParams();
  // const movie = movielist[id];

  useEffect(() => {
    fetch(`${API}/movies/${id}`)
      .then((data) => data.json())
      .then((movies) => setMovie(movies));
  }, [id]);
  return <div>{movie ? <Editmovieform movie={movie} /> : "loading......"}</div>;
}
function Editmovieform({ movie }) {
  const [name, setName] = useState(movie.name);
  const [poster, setPoster] = useState(movie.poster);
  const [rating, setRating] = useState(movie.rating);
  const [summary, setSummary] = useState(movie.summary);
  const [trailer, setTrailer] = useState(movie.trailer);
  const navigate = useNavigate();
  const editMovie = () => {
    const updatedMovie = {
      name,
      poster,
      rating,
      summary,
      trailer,
    };
    // setMovielist([...movielist, Newmovie]);
    console.log(updatedMovie);
    fetch(`${API}/movies/${movie.id}`, {
      method: "PUT",
      body: JSON.stringify(updatedMovie),
      Headers: { "Content-type": "application/json" },
    }).then(() => navigate("/movies"));
  };

  return (
    <div>
      <div className="add-movie-form">
        <TextField
          onChange={(event) => setName(event.target.value)}
          label="Name"
          variant="outlined"
          value={name}
        />
        <TextField
          onChange={(event) => setPoster(event.target.value)}
          label="poster"
          variant="outlined"
          value={poster}
        />
        <TextField
          onChange={(event) => setRating(event.target.value)}
          label="rating"
          variant="outlined"
          value={rating}
        />
        <TextField
          onChange={(event) => setSummary(event.target.value)}
          label="summary"
          variant="outlined"
          value={summary}
        />
        <TextField
          onChange={(event) => setTrailer(event.target.value)}
          label="Trailer"
          variant="outlined"
          value={trailer}
        />
        <Button
          color="success"
          onClick={editMovie}
          // setMovielist([...movielist, Newmovie]);

          variant="outlined"
        >
          save
        </Button>
      </div>
    </div>
  );
}
function Home() {
  return (
    <div>
      <h1> WELCOME TO MOVIE CLOWN APP ❤️💕</h1>
      <h5> subscribe cost 500</h5>
    </div>
  );
}
function Notfound() {
  return (
    <div className="notfound">
      <img
        src="https://cdn.dribbble.com/users/1175431/screenshots/6188233/404-error-dribbble-800x600.gif"
        alt="404 error"
      />
    </div>
  );
}
function Moviedetail() {
  const { id } = useParams();
  // const movie = movielist[id];
  const [movie, setMovie] = useState({});
  useEffect(() => {
    fetch(`${API}/movies/${id}`)
      .then((data) => data.json())
      .then((movies) => setMovie(movies));
  }, [id]);
  const navigate = useNavigate();
  return (
    <div className="movie-det">
      <iframe
        width="100%"
        height="570"
        src={movie.trailer}
        title="Jai Bhim - Official Tamil Trailer | Suriya | New Tamil Movie 2021 | Amazon Prime Video"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
      <div className="movie-detail-specs">
        <div className="movie-specs">
          <h2 className="movie-name">{movie.name}</h2>
          <p className="movie-rating"> ⭐ {movie.rating}</p>
        </div>
        <p className="movie-summary">{movie.summary}</p>
        <Button onClick={() => navigate(-1)} variant="outlined">
          Back
        </Button>
      </div>
    </div>
  );
}
function Addmovie() {
  const [name, setName] = useState("");
  const [poster, setPoster] = useState("");
  const [rating, setRating] = useState("");
  const [summary, setSummary] = useState("");
  const [trailer, setTrailer] = useState("");
  const navigate = useNavigate();
  const addMovie = () => {
    const Newmovie = {
      name,
      poster,
      rating,
      summary,
      trailer,
    };
    // setMovielist([...movielist, Newmovie]);
    console.log(Newmovie);
    fetch(`${API}/movies`, {
      method: "POST",
      body: JSON.stringify(Newmovie),
      Headers: { "Content-type": "application/json" },
    }).then(() => navigate("/movies"));
  };

  return (
    <div>
      <div className="add-movie-form">
        <TextField
          onChange={(event) => setName(event.target.value)}
          label="Name"
          variant="outlined"
        />
        <TextField
          onChange={(event) => setPoster(event.target.value)}
          label="poster"
          variant="outlined"
        />
        <TextField
          onChange={(event) => setRating(event.target.value)}
          label="rating"
          variant="outlined"
        />
        <TextField
          onChange={(event) => setSummary(event.target.value)}
          label="summary"
          variant="outlined"
        />
        <TextField
          onChange={(event) => setTrailer(event.target.value)}
          label="Trailer"
          variant="outlined"
        />
        <Button
          onClick={addMovie}
          // setMovielist([...movielist, Newmovie]);

          variant="outlined"
        >
          Addmovie
        </Button>
      </div>
    </div>
  );
}
function Movielist() {
  // const movielist = INTIAL_MOVIE_LIST;
  const [movielist, setMovielist] = useState([]);

  const getMovies = () => {
    fetch(`${API}/movies`, { method: "GET" })
      .then((data) => data.json())
      .then((movies) => setMovielist(movies));
  };
  useEffect(() => getMovies(), []);

  const deleteMovies = (id) => {
    fetch(`${API}/movies/${id}`, { method: "DELETE" }).then(() => getMovies());
  };
  const navigate = useNavigate();
  return (
    <div className="movielist">
      {movielist.map((mvs) => (
        <Movie
          movie={mvs}
          key={mvs.id}
          id={mvs.id}
          deleteButton={
            <IconButton
              aria-label="delete"
              color="success"
              onClick={() => deleteMovies(mvs.id)}
              style={{ marginLeft: "auto" }}
            >
              <DeleteIcon />
            </IconButton>
          }
          editButton={
            <IconButton
              aria-label="edit"
              color="primary"
              onClick={() => navigate(`/movies/edit/${mvs.id}`)}
            >
              <EditIcon />
            </IconButton>
            // <button onClick={() => navigate(`/movies/edit/${mvs.id}`)}>
            //   edit
            // </button>
          }
        />
      ))}
    </div>
  );
}
function Movie({ movie, id, deleteButton, editButton }) {
  const [show, setShow] = useState("true");
  const navigate = useNavigate();
  // const styles1 ={
  //   display : show ? "block":"none"
  // }
  const styles = {
    color: movie.rating > 8 ? "blue" : "orange",
  };
  return (
    // <Paper elevation={3} className="paper">
    <Card className="movie-container">
      <img src={movie.poster} alt={movie.name} className="movie-poster" />
      <CardContent>
        <div className="movie-specs">
          <h2 className="movie-name">
            {movie.name}
            <IconButton
              color="success"
              onClick={() => navigate("/movies/" + id)}
              aria-label="info"
            >
              <InfoIcon />
            </IconButton>
            <IconButton onClick={() => setShow(!show)} aria-label="toggle">
              {show ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </h2>
          <p style={styles} className="movie-rating">
            {" "}
            ⭐ {movie.rating}
          </p>
        </div>
        {/* <button onClick={()=>navigate("/movies/" + id)}>info</button> */}

        {/* <button onClick={()=>setShow(!show)}>toggle</button> */}

        {show ? <p className="movie-summary">{movie.summary}</p> : ""}
      </CardContent>
      <CardActions>
        <Like /> {deleteButton} {editButton}
      </CardActions>
    </Card>
    //  </Paper>
  );
}
function Like() {
  const [like, setLike] = useState(0);
  const [dislike, setDislike] = useState(0);
  return (
    <div className="like">
      {/* <button > 👍🏾{like} </button> */}
      <IconButton
        className="inc"
        onClick={() => setLike(like + 1)}
        color="primary"
        aria-label="like"
      >
        <Badge badgeContent={like} color="primary">
          👍🏾
        </Badge>
      </IconButton>
      {/* <button > 👎{dislike} </button> */}
      <IconButton
        className="dec"
        onClick={() => setDislike(dislike + 1)}
        color="secondary"
        aria-label="dislike"
      >
        <Badge badgeContent={dislike} color="error">
          👎
        </Badge>
      </IconButton>
    </div>
  );
}

export default App;
