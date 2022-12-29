status1 = "";
img = "";
objects = []; 
function preload()
{
   img =  loadImage("dog_cat.jpg");
}
function setup()
{
    canvas = createCanvas(400, 400);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(400, 400);
    video.hide();
}
function draw()
{
    image(video, 0, 0,400, 400 )
    
    if(status1 != "")
    {
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video, gotResult);
        for ( i=0; i < objects.length; i++)
        {
           document.getElementById("button1").innerHTML = "Status = Objects Detected ";
         document.getElementById("number_of_objects" + objects.length);

            fill(r, g, b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y+ 15);
            noFill();
            stroke(r, g, b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height)
        }
    }
}
function modelLoaded()
{
    console.log("Model loaded");
    status1 = true;
    objectDetector.detect(video, gotResult);
}
function gotResult(error, results)
{
    if(error)
    {
        console.error(error);
    }
    console.log(results);
    objects = results;
}
function start()
{
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("button1").innerHTML = "status : Detecting Objects ";
}