let divArray = ["table1", "table2", "table3"]

function hideAllShowSelected(currentDiv, divArray)
{
document.getElementById(currentDiv).style.display = "inline";
for(let i = 0; i < divArray.length; i++){
if(divArray[i] != currentDiv) document.getElementById(divArray[i]).style.display = "none";
}
}

function btnClick1()
{
hideAllShowSelected("table1", divArray)
}
function btnClick2()
{
hideAllShowSelected("table2", divArray)
}
function btnClick3()
{
hideAllShowSelected("table3", divArray)
}