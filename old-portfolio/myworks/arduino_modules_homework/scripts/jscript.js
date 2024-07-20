async function enter (gde)
{
    gde.style="padding: 1%;";
    var x=9;
    //alert(gde.style.padding);
    while(gde.style.padding != "0%")
    {
        i="0."+x+"%;";
        //alert(x);
        gde.style="padding:" + i + ";";
        await sleep(10);
        x -= 1; 
        //alert(gde.style.padding);
    }
    //alert(gde.style.padding);
    gde.style="padding: 0%;";
    return;
}

async function leave(gde)
{
        var x=1;
        gde.style="padding: 0%;";
        //alert(gde.style.padding);
        while(gde.style.padding != "0.9%")
        {
            i="0."+x+"%;";
            //alert(x);
            gde.style="padding:" + i + ";";
            await sleep(10);
            x += 1; 
            //alert(gde.style.padding);
        }        
        gde.style="padding: 1%;";
    return;
}







function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  /*
  async function delayedGreeting() {
    console.log("Hello");
    await sleep(2000);
    console.log("World!");
    await sleep(2000);
    console.log("Goodbye!");
  }*/
  