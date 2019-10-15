function getPosTop(i,j){
    return 20 + i * 120;
}
function getPosLeft(i,j){
    return 20 + j * 120;
}
function getNumberBackgroundColor(number){
    switch(number){
        case 2:
            return "#f0fff0";
            break;
        case 4:
            return "#7cfc00";
            break;
        case 8:
            return "#99e64d";
            break;
        case 16:
            return "#16982b";
            break;
        case 32:
            return "#1e90ff";
            break;
        case 64:
            return "#2a52be";
            break;
        case 128:
            return "#00080";
            break;
        case 256:
            return "#8a2be2";
            break;
        case 512:
            return "#ffd700";
            break;
        case 1024:
            return "#ff7300";
            break;
        case 2048:
            return "#ff6374";
            break;
        case 4096:
            return "#e32636";
            break;                           
    }
    return "black";
}
function getNumberTextColor(number){
    if(number <= 4){
        return "black";
    }else{
        return "white";
    }
}
function nospace(board){
    for(var i = 0;i < 4;i++){
        for(var j = 0;j < 4;j++){
            if(board[i][j] == 0){
                return false;
            }else{
                return true;
            }
        }
    }
    
}

function nomove(board){
    //如果能够向上下左右任何一个方向移动就返回false
    if(canMoveLeft(board) ||
       canMoveLeft(board) ||
       canMoveLeft(board) ||
       canMoveLeft(board)){
           return false;
       }
    return true;
}

function canMoveLeft(board){
    for(var i = 0;i < 4;i++){
        for(var j = 1;j < 4;j++){
            //board不为零时才能移动嘛
            if(board[i][j] != 0){
                //两种情况，左边的一个格子为零，左边的格子的数和当前格子的数相等
                //第一种情况，当前数移到左边一个格子上还会继续判断现在位置的左边一个格子是否为零，所以满足逻辑
                if(board[i][j-1] == 0 || board[i][j-1] == board[i][j]){
                    return true;
                }
            }       
        }
    }
    return false;
}
//判断一行中的两列直接是否有格挡

function canMoveUp( board ){

    for( var j = 0 ; j < 4 ; j ++ )
        for( var i = 1 ; i < 4 ; i ++ )
            if( board[i][j] != 0 )
                if( board[i-1][j] == 0 || board[i-1][j] == board[i][j] )
                    return true;

    return false;
}
function canMoveRight( board ){

    for( var i = 0 ; i < 4 ; i ++ )
        for( var j = 2; j >= 0 ; j -- )
            if( board[i][j] != 0 )
                if( board[i][j+1] == 0 || board[i][j+1] == board[i][j] )
                    return true;

    return false;
}


function canMoveDown( board ){

    for( var j = 0 ; j < 4 ; j ++ )
        for( var i = 2 ; i >= 0 ; i -- )
            if( board[i][j] != 0 )
                if( board[i+1][j] == 0 || board[i+1][j] == board[i][j] )
                    return true;

    return false;
}


function noBlockHorizontal(row,col1,col2,board){
    for(var i = col1 + 1;i < col2;i++){
        if(board[row][i] != 0){
            return false;
        }
    }
    return true;
}
function noBlockVertical( col , row1 , row2 , board ){
    for( var i = row1 + 1 ; i < row2 ; i ++ )
        if( board[i][col] != 0 )
            return false;
    return true;
}
