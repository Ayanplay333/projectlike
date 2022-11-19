https://teachablemachine.withgoogle.com/models/3uah8f92b/

var prediction1 = "" ;
var prediction2 = "" ;
Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:90
});
camera = document.getElementById("camera");
Webcam.attach(camera);

function take_snapshot()
{
Webcam.snap(function(data_uri){
    document.getElementById("result").innerHTML = "<img id='selfie_image' src="+data_uri+">";
});
}
console.log("ml5 version:",ml5.version);
classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/3uah8f92b/model.json",modelLoaded);
function modelLoaded()
{
    console.log("model Loaded");
}
function speak()
{
    var synth = window.speechSynthesis;
    var speakdata1 = "first prediction is " + prediction1;
    var speakdata2 = " and second prediction is " + prediction2;
    var utterthis = new SpeechSynthesisUtterance(speakdata1 + speakdata2);
    synth.speak(utterthis);

}
function identify()
{
var img = document.getElementById("selfie_image");
classifier.classify(img,gotResult);
}
function gotResult(error,results)
{
if(error)
{
    console.error(error);
}
else{

console.log(results);
document.getElementById("result_emotion_name").innerHTML = results[0].label;
document.getElementById("result_emotion_name1").innerHTML = results[1].label;
var prediction1 = results[0].label;
var prediction2 = results[1].label;
speak();
if(results[0].label == "happy"){
    document.getElementById('update_emoji').innerHTML = "&#128512;";
}
if(results[0].label == "sad"){
    document.getElementById('update_emoji').innerHTML = "&#128546;";
}
if(results[0].label == "angry"){
    document.getElementById('update_emoji').innerHTML = "&#128548;";
}
}
}