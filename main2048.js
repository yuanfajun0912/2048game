//小格子对应的数字
var board = new Array();
var score = 0;
//jquery中的主函数
$(document).ready(function(){
    newgame();
});
//重新开始游戏
function newgame(){
    //初始化棋盘
    init();
    //在2个空白格子上随机生成数字
    generateOneNumber();
    generateOneNumber();
}
function init(){
    for(var i = 0;i < 4;i++){
        for(var j = 0;j < 4;j++){
            var gridCell = $("#grid-cell-"+i+"-"+j);
            gridCell.css("top",getPosTop(i,j));
            gridCell.css("left",getPosLeft(i,j));
        }
    }
    //将board变成二维数组，更好的描述小格子上的数字
    for(var i = 0;i < 4;i++){
        board[i] = new Array();
        for(var j = 0;j < 4;j++){
            board[i][j] = 0;
        }
    }
    //通过board的值使小格子上的遮盖层number-cell元素发生变化
    updateBoardView();
    score = 0;
}
function updateBoardView(){
    //重新启动要将原来的小格子上的number-cell删掉
    $(".number-cell").remove();
    for(var i = 0;i < 4;i++){
        for(var j = 0;j < 4;j++){
            //在每个小格子上添加number-cell
            $("#grid-container").append("<div class ='number-cell' id='number-cell-"+i+"-"+j+"'></div>");
            var theNumberCell = $("#number-cell-"+i+"-"+j);
            if(board[i][j] == 0){
                theNumberCell.css("width","0px");
                theNumberCell.css("height","0px");
                theNumberCell.css("top",getPosTop(i,j) + 50);
                theNumberCell.css("left",getPosLeft(i,j) + 50);
            }else{
                theNumberCell.css("width","100px");
                theNumberCell.css("height","100px");
                theNumberCell.css("top",getPosTop(i,j));
                theNumberCell.css("left",getPosLeft(i,j));
                theNumberCell.css("background-color",getNumberBackgroundColor(board[i][j]));
                theNumberCell.css("color",getNumberTextColor(board[i][j]));
                theNumberCell.text(board[i][j]);
            }
        }
        
    }
    
}
//一个空白格子上随机生成一个数字（2或4）
function generateOneNumber(){
    //如果没有空白位置就不生成数字了
    if(nospace(board)){
        return false;
    }
    //随机找个位置
    //坐标要的是绝对的整数，不能有小数点的存在
    var randx = parseInt(Math.floor(Math.random() * 4));
    var randy = parseInt(Math.floor(Math.random() * 4));
    //找到空白位置就行，找不到就继续找
    while(true){
        if(board[randx][randy] == 0){
            break;
        }
        randx = parseInt(Math.floor(Math.random() * 4));
        randy = parseInt(Math.floor(Math.random() * 4));
    }

    //随机取个数字
    var randNumber = Math.random() < 0.5 ? 2 : 4;

    //将随机数字显示到随机位置上
    board[randx][randy] = randNumber;
    showNumberWithAnimation(randx,randy,randNumber);
    return true;
}

//键盘点击进行移动操作
$(document).keydown(function(event){
    switch(event.keyCode){
        case 37:    //left
            //若是所有元素都在左边则不能向左移动，所以在moveLeft()函数中应该有个判断
            //返回ture之后还会在空白地方添加个数字，再判断游戏是否结束
            if(moveLeft()){
                setTimeout("generateOneNumber()",50);
                isGameOver();
            }
            break;
        case 38:    //Up
            if(moveUp()){
                setTimeout("generateOneNumber()",50);
                isGameOver();
            }
            break;
        case 39:    //right
            if(moveRight()){
                setTimeout("generateOneNumber()",50);
                isGameOver();
            }
            break;
        case 40:    //down
            if(moveDown()){
                setTimeout("generateOneNumber()",50);
                isGameOver();
            }
            break;
        default:
            break;
    }
});


//判断游戏是否结束
function isGameOver(){
    //没有空位置了并且不能移动了（相邻的小格子数字不相同）
    if(nospace(board) && nomove(board)){
        gameover();
    }
}

function gameover(){
    console.log("Game Over!");
}

function moveLeft(){
    //判断是否可以向左移动
    if(!canMoveLeft(board)){
        return false;
    }
    //进行移动操作
    //能移动需要满足2点，1.目的地为0并且两者之间没有格挡（数字不为0）  2.目的地和所在地数字相等且没有格挡 
    for(var i = 0;i < 4;i++){
        for(var j = 1;j < 4;j++){
            if(board[i][j] != 0){
                
                for(var k = 0;k < j;k++){
                    //满足的第一点
                    //定义一个判断是否格挡的函数
                    if(board[i][k] == 0 && noBlockHorizontal(i,k,j,board)){
                        //移动动画
                        showMoveAnimation(i,j,i,k);
                        //移动后两格子的数字
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;    //只结束本次循环
                    //满足的第二点
                    }else if(board[i][k] == board[i][j] && noBlockHorizontal(i,k,j,board)){
                        //移动
                        showMoveAnimation(i,j,i,k);
                        //数字*2
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        //加分
                        score += board[i][k];
                        //将分数反应到页面上
                        updateScore(score);
                        continue;
                    }
                }
                
                
            }
            
        }
        
    }
    //前面操作的都是board这个数据，所以还要应用这个函数反应到number-cell上
    setTimeout("updateBoardView()",200);
    return true;     
}

function moveRight(){
    if( !canMoveRight( board ) )
        return false;

    //moveRight
    for( var i = 0 ; i < 4 ; i ++ )
        for( var j = 2 ; j >= 0 ; j -- ){
            if( board[i][j] != 0 ){
                for( var k = 3 ; k > j ; k -- ){

                    if( board[i][k] == 0 && noBlockHorizontal( i , j , k , board ) ){
                        //move
                        showMoveAnimation( i , j , i , k );
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if( board[i][k] == board[i][j] && noBlockHorizontal( i , j , k , board ) ){
                        //move
                        showMoveAnimation( i , j , i , k);
                        //add
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        //add score
                        score += board[i][k];
                        updateScore( score );

                        continue;
                    }
                }
            }
        }

    setTimeout("updateBoardView()",200);
    return true;
}

function moveUp(){

    if( !canMoveUp( board ) )
        return false;

    //moveUp
    for( var j = 0 ; j < 4 ; j ++ )
        for( var i = 1 ; i < 4 ; i ++ ){
            if( board[i][j] != 0 ){
                for( var k = 0 ; k < i ; k ++ ){

                    if( board[k][j] == 0 && noBlockVertical( j , k , i , board ) ){
                        //move
                        showMoveAnimation( i , j , k , j );
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if( board[k][j] == board[i][j] && noBlockVertical( j , k , i , board ) ){
                        //move
                        showMoveAnimation( i , j , k , j );
                        //add
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        //add score
                        score += board[k][j];
                        updateScore( score );

                        continue;
                    }
                }
            }
        }

    setTimeout("updateBoardView()",200);
    return true;
}

function moveDown(){
    if( !canMoveDown( board ) )
        return false;

    //moveDown
    for( var j = 0 ; j < 4 ; j ++ )
        for( var i = 2 ; i >= 0 ; i -- ){
            if( board[i][j] != 0 ){
                for( var k = 3 ; k > i ; k -- ){

                    if( board[k][j] == 0 && noBlockVertical( j , i , k , board ) ){
                        //move
                        showMoveAnimation( i , j , k , j );
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if( board[k][j] == board[i][j] && noBlockVertical( j , i , k , board ) ){
                        //move
                        showMoveAnimation( i , j , k , j );
                        //add
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        //add score
                        score += board[k][j];
                        updateScore( score );

                        continue;
                    }
                }
            }
        }

    setTimeout("updateBoardView()",200);
    return true;
}