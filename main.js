var canvas=null;
var video=null;
var poseNet=null;
var clownNoseImg=null;
var clownNoseXNum=null;
var clownNoseYNum=null;

function preload(){
    clownNoseImg=loadImage('https://i.postimg.cc/Gt4WFPS7/clown-nose.png');
}

function setup(){
    canvas=createCanvas(300, 300);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(300, 300);
    video.hide();
    poseNet=ml5.poseNet(video, onModelLoaded);
    poseNet.on('pose', gotPoses);
}

function onModelLoaded(){
    console.log('PoseNet is Initialized!');
}

function gotPoses(results){
    if(results.length>0){
        console.log(results);
        clownNoseXNum=results[0].pose.nose.x-15;
        clownNoseYNum=results[0].pose.nose.y-15;
        console.log('Nose X: '+clownNoseXNum);
        console.log('Nose Y: '+clownNoseYNum);
    }
}

function draw(){
    image(video, 0, 0, 300, 300);
    image(clownNoseImg, clownNoseXNum, clownNoseYNum, 30, 30);
}

function takeSnapshot(){
    save(prompt('Please enter a name for your image: ')+'.png')
}