function showNumberWithAnimation(i,j,randNumber){
    //这个#让我找了4个小时！！！！！！！
    var numberCell = $("#number-cell-"+i+"-"+j);
    numberCell.css("background-color",getNumberBackgroundColor(randNumber));
    numberCell.css("color",getNumberTextColor(randNumber));
    numberCell.text(randNumber);
    //jquery动画
    numberCell.animate({
        width : "100px",
        height : "100px",
        top : getPosTop(i,j),
        left : getPosLeft(i,j)
    },50);
    
}

function showMoveAnimation(fromx,fromy,tox,toy){
    var numberCell = $("#number-cell-"+fromx+"-"+fromy);

    numberCell.animate({
        top : getPosTop(tox,toy),
        left : getPosLeft(tox,toy)
    },200);

    
}

function updateScore(score){
    $("#score").text(score);
}