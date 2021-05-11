//import geniusApi from 'genius-lyrics-api';
//const { getLyrics }=require('genius-lyrics-api');
const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const music = require('musicmatch')({apikey:"1a892abafa252a28aa97a81759f3f394"});
app.use(bodyParser.urlencoded({extended:true}));
app.use("*/css",express.static(__dirname+"/public/css"));
app.use("*/js",express.static(__dirname+"/public/js"));
app.set('view engine','ejs');
const options = {
	apiKey: '1a892abafa252a28aa97a81759f3f394',
	title: 'Blinding Lights',
	artist: 'The Weeknd',
	optimizeQuery: true
};
// get lyrics link page using song.
/*
music.trackSearch({q:"Chet Faker - Gold", page:1, page_size:3})
	.then(function(data){
		console.log(data.message.body.track_list[0].track);
	}).catch(function(err){
		console.log(err);
}) ;
*/
var song_name;
var lyrics;
app.post("/", function(req,res){
	 song_name=req.body.song_name;
	 const artist_name=req.body.artist_name;
	music.matcherLyrics({q_track:song_name, q_artist:artist_name})
		.then(function(data){
			lyrics=data.message.body.lyrics.lyrics_body;
			console.log(lyrics);
			//const lyrics=data.message.body.lyrics.lyrics_body
			res.redirect("/generated_music");
		}).catch(function(err){
			console.log(err);
			})
})

app.get("/generated_music",function(req,res){
	res.render('lyric',{song_name:song_name,lyrics:lyrics});
})

/*music.trackSearch({q:"ChainSmokers", page:1, page_size:3})
	.then(function(data){
		console.log(data.message.body);
	}).catch(function(err){
		console.log(err);
}) */
/*
music.matcherTrack({q_artist:"eminem", q_track:"lose yourself"})
	.then(function(data){
		console.log(data.message.body);
	}).catch(function(err){
		console.log(err);
}) */
// Give song name and artist as input and get getLyrics
/*
music.matcherLyrics({q_track:"lungi dance", q_artist:"Yo Yo honey singh"})
	.then(function(data){
		console.log(data.message.body);
	}).catch(function(err){
		console.log(err);
})
*/
/*
music.artistSearch({q_artist:"Arijit Singh", page_size:5})
	.then(function(data){
		console.log(data.message.body.artist_list);
	}).catch(function(err){
		console.log(err);
}) */
//geniusApi.getLyrics(options).then((lyrics) => console.log(lyrics));
/*
geniusLyric.getSong(options).then((song) =>
	console.log(`
	${song.id}
	${song.url}
	${song.albumArt}
	${song.lyrics}`)
);
*/
app.listen(3000,function(){
  console.log("app is listening at port 3000");
});

app.get("/",function(req,res){
//  res.sendFile(__dirname+"/index.html");
   res.render('index.ejs');
});
