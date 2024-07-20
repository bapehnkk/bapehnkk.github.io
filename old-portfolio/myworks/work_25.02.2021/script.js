function gameReset(){
	N=9;sVar=Array("X","O");S=sVar[0];steps=0;pole=Array();
    document.getElementById("whoWin").style.zIndex = "-1";
    document.getElementById("whoWin").style.visibility = "hidden";
	for(i=0;i<N;i++)
		document.getElementById("t"+(i+1)).innerHTML="";
}
function testIt(kletka){
	textTest=kletka.innerHTML;
	if(textTest=="" && document.getElementById("whoWin").style.visibility == "hidden"){
		kletka.innerHTML=S;
		steps++;
		for(i=0;i<N;i++)
            pole[i]=document.getElementById("t"+(i+1)).innerHTML;
		vinTest=false;
		if(pole[0]==pole[1] && pole[2]==pole[1] && pole[0]!=""){vinTest=true;}
		if(pole[3]==pole[4] && pole[4]==pole[5] && pole[3]!=""){vinTest=true;}
		if(pole[6]==pole[7] && pole[7]==pole[8] && pole[6]!=""){vinTest=true;}
		if(pole[0]==pole[3] && pole[3]==pole[6] && pole[0]!=""){vinTest=true;}
		if(pole[1]==pole[4] && pole[4]==pole[7] && pole[1]!=""){vinTest=true;}
		if(pole[2]==pole[5] && pole[5]==pole[8] && pole[2]!=""){vinTest=true;}
		if(pole[0]==pole[4] && pole[4]==pole[8] && pole[0]!=""){vinTest=true;}
		if(pole[2]==pole[4] && pole[4]==pole[6] && pole[2]!=""){vinTest=true;}
		if(vinTest==false){
			if(steps==9)
            {                
                document.getElementById("whoWin").style.zIndex = "1";
                document.getElementById("whoWin").style.visibility = "inherit";
                document.getElementById("whoWin").innerHTML="Ничья";
            }
			S=sVar[1-sVar.indexOf(S)];
		}
        else
        {
            document.getElementById("whoWin").style.zIndex = "1";
            document.getElementById("whoWin").style.visibility = "inherit";
            document.getElementById("whoWin").innerHTML=S+" победил";
        }
	}}