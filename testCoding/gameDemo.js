var ballSize = 35;          //设置球的大小
var ballX;                  //定义球的横坐标
var ballY;                  //定义球的纵坐标
var ballColor;              //定义球的颜色的变量
var ballSpeedVert= 0;       //设置球的垂直速度
var gravity= 0.4;           //设置重力参数
var ballSpeedHorizon= 5;    //设置球的水平速度
var airfriction= 0.005;     //设置空气阻力参数
var friction = 0.003;       //设置碰撞阻力参数
var surface;                //设置球的表面的变量
var racketColor;            //定义球拍的颜色变量
var racketWidth;            //定义球拍的宽度的变量
var racketHeight;           //定义球拍的高度的变量
var haddle;                 //定义球拍把手的变量
var score = 0;              //定义得分变量并设置初值
var bestScore = 0;          //定义最高分变量，设置初值为0
var gameScreen = 0;         //定义游戏界面的参数，设置初值为0

var boards = [];            //定义板子的数组
var boardSpeed = 2;         //定义和设置板子向下移动的速度
var boardInterval = 5000;   //定义和设置前后两个板子之间间隔的时间
var lastAddTime = 0;        //定义记录上次增加板子时间的变量，并且设置初值为0
var minGapWidth = 200;      //定义板子间隙最小值的变量
var maxGapWidth = 300;      //定义板子间隙最大值的变量
var boardHeight = 30;       //定义板子高度的变量
var boardColor;            //定义板子颜色的变量

  

function setup() {
  
   createCanvas(700, windowHeight);        //设置画布的长宽
   ballColor = color(250, 180, 80);//设置球的颜色
   racketColor =color(180, 0, 0);  //设置球拍的颜色
   boardColor = color(23, 20, 11); //设置板子的颜色
   ballX=width/4;                  //设置球的初始位置的横坐标
   ballY=height/5;                 //设置球的初始位置的纵坐标
   smooth();                       //设置曲线平滑 
   racketWidth =200;                //设置球拍的宽度
   racketHeight=15;                 //设置球拍的高度
   haddle=50;                       //设置球拍把手的位置
   frameRate(60);                   //设置帧率为60          
  
}

function draw() {
  
   //判断当前界面状态，进入不同界面
   if (gameScreen == 0) {         //如果当前是游戏准备开始界面状态
    
    initScreen(); //调用游戏准备方法，进入游戏准备界面
   } else if (gameScreen == 1) {  //如果当前是游戏界面状态 
    gameplayScreen(); //调用开始游戏方法，进入游戏界面
   }else if (gameScreen == 2) {  //如果当前是游戏结束界面状态
  
    gameOverScreen();            //调用游戏结束方法，进入游戏结束界面
   } 
 } 

function initScreen() {             //游戏准备方法
    background(236, 240, 241);        //设置背景色
   textAlign(CENTER);                //设置文本对齐方式为居中对齐
   fill(52, 73, 94);                 //设置文本颜色
   textSize(100);                     //设置字体大小
   text("PING PONG", width/2, height/2); //输出文字，并设置文字的位置

   fill(92,167,182);                  //填充长方形按钮的颜色
   noStroke();                         //设置长方形的外边框为无
   rectMode(CENTER);                   //设置画长方形的模式为正中心
   rect(width/2, height-40, 200,60,5); //设置长方形的长宽和位置，圆角的大小
   fill(236,240,241);                  //设置文本颜色
   textSize(30);                       //设置字体大小
   text("START", width/2, height-30);   //输出文字，并设置文字的位置
 } 

 function gameplayScreen() {    //游戏界面
  
  background(236, 240, 241);   
   drawBall();                  //调用画球的方法，画出球
   drawRacket();                //调用画球拍的方法，画出球拍
   watchRacketBounce();         //调用球拍反弹球的方法，来击球            
   applyGravity();              //调用产生重力的方法，使球有重力加速度
   applyHorizontalSpeed();      //调用使球产生水平速度的方法
   keepInScreen();              //调用使球保持在画布中的方法
   printScore();                //调用打印出分数的方法，打印出分数
   boardAdder();                //调用增加板子的方法，来增加板子
   boardHandler();              //调用控制板子的方法，来控制板子
 } 
  
  
   function gameOverScreen() {     //游戏结束界面
   background(236, 240, 241);    //设置背景颜色
   textAlign(CENTER);            //设置文本对齐方式为居中对齐
    
   if(bestScore<score){          //比较最高分和得分并得出当前最高分
    bestScore = score;
   }
   fill(23, 50, 7);                         //设置文本颜色
   textSize(40);                            //设置字体大小
   text("HIGHTEST SCORE", width/2, height/15);     //输出文字并设置文字的位置
   textSize(40);                            //设置字体大小
   text(bestScore, width/2, height/7);      //输出文字并设置文字的位置
   fill(217, 116, 43);                      //设置文本颜色
   textSize(40);                            //设置字体大小
   text("SCORE", width/2, height/2-150);  //输出文字，并设置文字的位置
  
   fill(230, 180, 80);                      //设置文本颜色
   textSize(150);                           //设置字体大小
   text(score, width/2, height/2+50);       //输出文字并设置文字的位置

   fill(92,167,182);                        //填充长方形按钮颜色
   rectMode(CENTER);                        //设置画长方形的模式为正中心
   noStroke();                              //设置长方形的外边框为无
   rect(width/2, height-40, 200,60,5);      //设置长方形的长宽和位置，圆角的大小
   fill(236,240,241);                       //设置文本颜色
   textSize(30);                            //设置字体大小
   text("RESTART", width/2, height-30);     //输出文字并设置文字的位置
    
 } 


 function mousePressed() {    //如果按下鼠标就调用此函数
   
  if (gameScreen==0) {    //按下鼠标时,如果当前界面是游戏准备开始界面
    startGame();          //调用游戏开始方法
   } 
  if (gameScreen==2) {    //按下鼠标时,如果当前界面是游戏结束界面
    restart();            //调用游戏重新开始函数
   } 
} 



function startGame() {    //游戏开始函数
  gameScreen=1;           //设置当前界面状态为游戏界面
  } 


function gameOver() {   //游戏结束界面
   gameScreen=2;         //设置当前界面状态为游戏结束界面
 } 

 function restart() {     //游戏重新开始的方法
   ballSpeedHorizon= 10;  //使球的水平速度为初始速度
   ballSpeedVert= 0;      //使球的垂直速度为初始速度
   score = 0;             //使得分为初始值
   ballX=width/4;         //使球的横坐标为初始值
   ballY=height/5;        //使球的纵坐标为初始值
   racketWidth =200;      //使球拍的宽度恢复初始值
   gameScreen = 1;        //使当前界面为游戏界面
   lastAddTime = 0;       //重置增加板子的时间
   boards = [];           //初始化板子的数组，将原来存储的数据清空
 } 

function drawBall(){                               //定义画乒乓球的函数
      fill(ballColor);                             //填充球的颜色
      ellipse(ballX, ballY, ballSize, ballSize);   //画一个圆

}

function drawRacket() {            //定义画球拍的方法
  fill(racketColor);               //填充球拍的颜色  
  rectMode(CENTER);                //设置画长方形的模式为正中心
if (score > 30) {                 //如果得分大于600
     racketWidth=80;               //球拍宽度变为80
  } else if (score > 5) {        //否则,得分小于600，大于300
    racketWidth=120;               //球拍宽度变为120
  } else {                         //否则,得分小于300
    racketWidth=racketWidth;       //球拍宽度为初始值
  } 
  rect(mouseX, mouseY-haddle, racketWidth,racketHeight,5);     //画一个圆角的矩形
}



function keepInScreen() {          //定义使球保持在画布的方法
  // 第一种情况，球撞击到地面
 if (ballY+(ballSize/2) > height) {     //如果球的下表面的纵坐标超过画布的最下边
    gameOver();                         //调用游戏结束方法
  }
  // 第二种情况，球撞击到天花板
  if (ballY-(ballSize/2) < 0) {         //如果球的上表面的纵坐标超过画布的最上边
    makeBounceTop(0);                   //调用上边反弹方法，并将画布最上边的纵坐标传回去
  }
  // 第三种情况球撞击到左边的墙
 if (ballX-(ballSize/2) < 0) {          //如果球的左表面的纵坐标超过画布的最左边
    makeBounceLeft(0);                  //调用左边反弹方法，并将画布最左边的横坐标传回去
  }
  // 第四种情况球撞击到右边的墙           
  if (ballX+(ballSize/2) > width) {     //如果球的右表面的纵坐标超过画布的最右边
    makeBounceRight(width);             //调用右边反弹方法，并将画布最右边的横坐标传回去
  }
}

function applyGravity() {          //定义产生重力的方法
  ballSpeedVert += gravity;        //在球的垂直速度上加上重力加速度
  ballSpeedVert -= (ballSpeedVert * airfriction);   //在球的垂直速度上减去空气阻力的加速度
  ballY += ballSpeedVert;          //使球产生垂直位移
}
function applyHorizontalSpeed() {       //定义使球产生水平速度的方法
  ballSpeedHorizon -= (ballSpeedHorizon * airfriction); //使球的水平速度减去空气阻力造成的加速度
  ballX += ballSpeedHorizon;                            //使球产生水平位移
} 

function makeBounceBottom(surface) {      //定义下边反弹方法， 并获取球的下表面的纵坐标   
  ballY = surface-(ballSize/2);           //设置球的中心位置
  ballSpeedVert*=-1;                      //使球的垂直速度方向翻转
  ballSpeedVert -= (ballSpeedVert * friction); //在球的垂直速度上减去碰撞产生的减速
}
function makeBounceTop(surface) {         //定义上边反弹方法并获取球的上表面的纵坐标  
  ballY = surface+(ballSize/2);           //设置球的中心位置
  ballSpeedVert*=-1;                      //使球的垂直速度方向翻转
  ballSpeedVert -= (ballSpeedVert * friction); //在球的垂直速度上减去碰撞产生的减速
} 
function makeBounceLeft(surface) {        //定义左边反弹方法并获取球的左表面的纵坐标
  ballX = surface+(ballSize/2);           //设置球的中心位置
  ballSpeedHorizon*=-1;                   //使球的水平速度方向翻转
  ballSpeedHorizon -= (ballSpeedHorizon * friction); //在球的水平速度上减去碰撞产生的减速
}
function makeBounceRight(surface) {       //定义右边反弹方法并获取球的右表面的纵坐标
  ballX = surface-(ballSize/2);           //设置球的中心位置
  ballSpeedHorizon*=-1;                   //使球的水平速度方向翻转
  ballSpeedHorizon -= (ballSpeedHorizon * friction); //在球的水平速度上减去碰撞产生的减速
}

function watchRacketBounce() {            //定义球拍反弹球的方法
  var  overhead = mouseY - pmouseY;       //定义和设置球拍运动的速度

  //如果球的横坐标位于球拍横坐标范围内
  if ((ballX+(ballSize/2) > mouseX-(racketWidth/2)) && (ballX-(ballSize/2) < mouseX+(racketWidth/2))) {
    //并且球中心的纵坐标与球拍中心的纵坐标小于球的半径加上球拍厚度的一半再加上球拍移动的距离
    if (dist(ballX, ballY, ballX, mouseY-haddle)<=(ballSize/2)+abs(overhead)+(racketHeight/2)) {
        makeBounceBottom(mouseY-haddle-(racketHeight/2));    //调用下边反弹方法并将球拍上表面的纵坐标传回去，使球向上反弹

        ballSpeedHorizon = ballSpeedHorizon + (ballX - mouseX)/10;  //使球的水平速度改变,使方向翻转并且越靠球拍边缘反弹速度越大
        addScore();                    //每次用球拍击球，得分加一
      if (overhead<0) {                //如果球拍是向上运动的
        ballY+=overhead;               //改变球的位置
        ballSpeedVert+=overhead/2;     //使球的垂直速度加上球拍运动的速度     
      }       
    }
  }
}

function boardAdder() {           //定义添加板子的方法
  if (millis()-lastAddTime > boardInterval) {                          //如果当前时间与上次添加板子的时间，相差一个间隔，就增加一个新的板子
    var randWidth = round(random(minGapWidth, maxGapWidth));           //定义板子空隙的宽度的变量，设置为一个随机数，范围是从最小值到最大值
    var randX = round(random(0, width-randWidth));                     //定义左边板子的宽度的变量，设置为一个随机数，范围是从0到画布的宽度减去间隙的宽度
             // [左边板子的横坐标, 左边板子的纵坐标, 板子间隙的宽度, 板子间隙的高度, 通过板子的得分情况]
    var randBoard = [randX/2, -boardHeight/2, randWidth, boardHeight, 0];  //定义一个记录这个新的板子参数的数组，并设置数组的值
    boards.push(randBoard);                                            //将这个新的板子的参数添加到板子数组中，板子数组中存储着所有没有被删除的板子
    lastAddTime = millis();                                            //设置上次添加板子的时间为当前的时间
  }
}


function boardDrawer(index) {    //定义绘制板子的方法          
  var board = boards[index];     //定义一个数组，并将板子数组中的一个板子取出来，把它的参数赋值给该数组
  
  var boardLeftX = board[0];          //定义左边板子的横坐标，并把板子的横坐标赋值给它
  var boardLeftY = board[1];          //定义左边板子的纵坐标，并把板子的纵坐标赋值给它
  var gapBoardWidth = board[2];       //定义板子间隙的宽度，并给板子间隙的宽度赋值给它
  var gapBoardHeight = board[3];
  var boardLeftWidth = 2*boardLeftX;      //定义左边板子的宽度，并给它赋值
  var boardRightX = width-(width-(boardLeftWidth+gapBoardWidth))/2; //定义右边板子的横坐标，并给它赋值
  var boardRightY = boardLeftY;                                     //定义右边板子的纵坐标，并给它赋值
  var boardRightWidth =width-(boardLeftWidth+gapBoardWidth) ;       //定义右边板子的宽度，并给它赋值
  
 // rectMode(CORNER);            //设置矩形的模式为居中模式，前两个参数为中心的坐标，后两个参数是矩形的长宽
  rectMode(CENTER);              //设置矩形的模式为居中模式，前两个参数为矩形中心的坐标，后两个参数是矩形的长宽
  fill(boardColor);              //填充板子的颜色
  rect(boardLeftX, boardLeftY, boardLeftWidth, boardHeight, 0, 15, 15, 0);   //绘制左边的板子，并设置它的右上角和右下角为圆角，圆角的半径为15
  rect(boardRightX, boardRightY,boardRightWidth, boardHeight, 15, 0, 0, 15); //绘制右边的板子，并设置它的左上角和左下角为圆角，圆角的半径为15
}

function boardMover(index) {     //定义板子移动的方法
  var board = boards[index];     //定义一个数组，并将板子数组中的一个板子取出来，把它的参数赋值给该数组
  board[1]+= boardSpeed;         //使这个数组的第二个元素，即板子的纵坐标，加上板子的速度，这样就可以使板子向下移动
}
function boardRemover(index) {           //定义板子删除的方法
  var board = boards[index];             //定义一个数组，并将板子数组中的一个板子取出来，把它的参数赋值给该数组
  if (board[1]> height+boardHeight/2) {  //如果板子向下移动是，它的纵坐标超过了画布的高度，即画布的最下边
    boards.splice(index,1);              //使用删除数组元素的方法，将这个板子从板子数组中删除
  }
}
function watchBoardCollision(index) {    //定义板子碰撞的方法
  var board = boards[index];             //定义一个数组，并将板子数组中的一个板子取出来，把它的参数赋值给该数组
  // get gap wall settings  
  var boardLeftX = board[0];             //定义左边板子的横坐标，并把板子的横坐标赋值给它
  var boardLeftY= board[1];              //定义左边板子的纵坐标，并把板子的纵坐标赋值给它
  var gapBoardWidth = board[2];          //定义板子间隙的宽度，并给板子的宽度赋值给它
  var gapBoardHeight = board[3];
  var boardScored = board[4];            //定义通过板子的得分情况，得分为1，未得分为0
  var boardLeftWidth = 2*boardLeftX;     //定义左边板子的宽度，并给它赋值  
  var boardRightX = width-(width-(boardLeftWidth+gapBoardWidth))/2; //定义右边板子的横坐标，并给它赋值
  var boardRightY = boardLeftY;                                     //定义右边板子的纵坐标，并给它赋值
  var boardRightWidth =width-(boardLeftWidth+gapBoardWidth) ;       //定义右边板子的宽度，并给它赋值
  var gapBoardY = boardLeftY;                                       //定义板子间隙的纵坐标，并给它赋值
  var boardMoveDistance = boardSpeed;                               //定义板子在两个帧之间移动的距离
  
   //左边板子向下反弹球    
    if (
      (ballY>boardLeftY)&&                                      //如果球在板子的下方
      (ballX-(ballSize/2)<boardLeftX+boardLeftWidth/2) &&       //并且球没有超出板子的右边缘
      (ballX+(ballSize/2)>boardLeftX-boardLeftWidth/2)          //并且球没有超出板子的左边缘
      ){
        if(dist(ballX, ballY, ballX, boardLeftY)<=(ballSize/2+boardMoveDistance+boardHeight/2)){  //继续判断，如果球与板子相接触
         
           makeBounceTop(boardLeftY+boardHeight/2);             //调用上边反弹方法并将板子下表面的纵坐标传回去，使球向下反弹
           ballY+=boardMoveDistance;                            //设置球的位置，使球增加一段向下的移动距离
           ballSpeedVert+= boardSpeed;                          //设置球的垂直速度，使球在垂直速度上增加板子的移动速度
       }
    }
   //右边板子向下反弹球
  if ( 
     (ballY> boardRightY)&&                                     //如果球在板子的下方
      (ballX-(ballSize/2)<boardRightX+boardRightWidth/2) &&     //并且球没有超出板子的右边缘
      (ballX+(ballSize/2)>boardRightX-boardRightWidth/2)        //并且球没有超出板子的左边缘
      ){
        if(dist(ballX, ballY, ballX, boardRightY)<=(ballSize/2+boardMoveDistance+boardHeight/2)){  //继续判断，如果球与板子相接触

           makeBounceTop(boardRightY+boardHeight/2);           //调用上边反弹方法并将板子下表面的纵坐标传回去，使球向下反弹  
           ballY+=boardMoveDistance;                           //设置球的位置，使球增加一段向下的移动距离
           ballSpeedVert+= boardSpeed;                         //设置球的垂直速度，使球在垂直速度上增加板子的移动速度
        }
   }
  //左边板子向上反弹球
   if (
      (ballY<boardLeftY)&&                                     //如果球在板子的上方
      (ballX-(ballSize/2)<boardLeftX+boardLeftWidth/2) &&      //并且球没有超出板子的右边缘
      (ballX+(ballSize/2)>boardLeftX-boardLeftWidth/2)         //并且球没有超出板子的左边缘
      ){
        if(dist(ballX, ballY, ballX, boardLeftY)<=(ballSize/2-boardMoveDistance+boardHeight/2)){  //继续判断，如果球与板子相接触
          
           makeBounceBottom(boardRightY-boardHeight/2);        //调用下边反弹方法并将板子上表面的纵坐标传回去，使球向上反弹
           ballY-=boardMoveDistance;                           //设置球的位置，使球减少一段向下的移动距离
       }
   }
  //右边板子向上反弹球
  
  if (
    (ballY< boardRightY)&&                                    //如果球在板子的上方
      (ballX-(ballSize/2)<boardRightX+boardRightWidth/2) &&   //并且球没有超出板子的右边缘
      (ballX+(ballSize/2)>boardRightX-boardRightWidth/2)      //并且球没有超出板子的左边缘
      ){
        if(dist(ballX, ballY, ballX, boardRightY)<=(ballSize/2-boardMoveDistance+boardHeight/2)){  //继续判断，如果球与板子相接触
          
           makeBounceBottom(boardRightY-boardHeight/2);       //调用下边反弹方法并将板子上表面的纵坐标传回去，使球向上反弹
           ballY-=boardMoveDistance;                          //设置球的位置，使球减少一段向下的移动距离
       }
   }
  
if (ballY < gapBoardY-(boardHeight/2) && boardScored==0) {  //如果球通过了板子，并且是第一次通过，则得分                                         
    board[4]=1;                                             //设置通过板子得分的情况为1，表示已经通过了，这样再一次通过将不再得分
    score+=10;                                              //通过一个板子，加10分
   }   
}

function boardHandler() {                     //定义控制板子的方法
  for (var i = 0; i < boards.length; i++) {   //使用for循环，将数组的里每个板子都进行控制
    boardRemover(i);                          //调用移动板子的方法，将板子从数组中删除
    boardMover(i);                            //调用清除板子的方法，使板子可以向下移动
    boardDrawer(i);                           //调用绘制板子的方法，将板子在画布中显示出来
    watchBoardCollision(i);                   //调用板子碰撞的方法，来控制球的运动与得分
  }
}

 function addScore() {             //定义游戏得分的方法
   score++;                        //得分加一
 } 
 function printScore() {           //打印得分方法
   textAlign(CENTER);              //设置文本对齐方式为居中对齐
   fill(0);                        //设置文本颜色为黑色
   textSize(30);                   //设置字体大小
   text(score, width/2, height/20); //输出得分，设置文本的位置
 } 