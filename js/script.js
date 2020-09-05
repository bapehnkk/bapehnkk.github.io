var date = new Date(); // получаем текущую дату
var time = date.getHours(); // получаем текущее время в часах
if(time <= 12 && time >= 5) // поздароваться
    {
        alert('Доброе утро!\nСейчас '+time+' часов.'); 
    }
        else if(time <= 12 && time >= 17) 
    {
        alert('Добрый день!\nСейчас '+time+' часов.'); 
    }
    else if(time >= 17 && time <= 24)
    {
        alert('Добрый вечер!\nСейчас '+time+' часов.');
    }
    else if(time >= 0 && time <= 5)
    { 
        alert('Ночка светлая!\nСейчас '+time+' часов.');
    }

function btnClick()
{
    var articleDiv = document.querySelector("div.header");
    // создаем элемент
    var elem = document.createElement("h2");
    // создаем для него текст
    var elemText = document.createTextNode("Привет мир");
    // добавляем текст в элемент в качестве дочернего элемента
    elem.appendChild(elemText);
    // получаем первый элемент, перед которым будет идти добавление
    var firstElem = articleDiv.firstChild.nextSibling;
    // добавляем элемент в блок div перед первым узлом
    articleDiv.insertBefore(elem, firstElem);
}