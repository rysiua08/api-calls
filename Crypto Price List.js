// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// always-run-in-app: true; icon-color: deep-brown;
// icon-glyph: grin-stars;
let coin = ["BTC","ETH","FIL","DOGE","UNI","LINK","ZRX","MATIC","AMP","YFI","ZEC","BAT"]
let endpt = "https://api.coinbase.com/v2/exchange-rates?currency="

class transact {
    constructor() {
        this.qty_ = 0.0;
        this.price_ = 0.0;
    }
    addTo(qty, price) {
        var t = this.cost();
        var tqty = this.qty_ + qty;
        this.qty_ = qty;
        this.price_ = price;
        var ncost = this.cost();
        this.price_ = (ncost + t) / tqty;
        this.qty_ = tqty;
    }
    price() {
        return this.price_;
    }
    cost() {
        return this.qty_ * this.price_;     
    }
    pl(spot) {
        return (spot - this.price_) * this.qty_
    }
}
// -----------------------------------------
// hate these hard coded bits -----------------------------------------
// bitcoin -----------------------------------------

var btc = new transact();
btc.addTo(0.003, 44485.0);
btc.addTo(0.003, 44000.0);

// ethereum -----------------------------------------
var eth = new transact();
eth.addTo(0.05, 2980);
eth.addTo(.05,2985);
eth.addTo(0.1,2980);

// uniswap (uni) -----------------------------------------
// var uni = new transact();
// uni.addTo(-10, 26.32);
// uni.addTo( -3, 29.60);
// uni.addTo(-10, 21.22);
// uni.addTo(-10, 21.22);




// polygon (matic) -----------------------------------------
var matic = new transact();
matic.addTo(100, 1.32);
matic.addTo(-170,1.36);
matic.addTo(-100,1.46);
matic.addTo(100,1.34);
matic.addTo(80,1.02);
matic.addTo(90, 1.07);
matic.addTo(100, 1.08);
matic.addTo(200, 1.10);

var space = "\t\t"
var i = 0
var msg = ""
tpl=0;
while(i < coin.length)  
{
    var url = endpt + coin[i]
    var r = new Request(url)
    var json = await r.loadJSON()
    var pl = 0
    if( i == 0 )
    {
        var pl = btc.pl(json.data.rates.USD);
tpl += pl;
    }
    else if(i == 1)
    {
        var pl = eth.pl(json.data.rates.USD);
tpl += pl;
    }
    else if(i == 4)
    {
//         var pl = uni.pl(json.data.rates.USD);
tpl += pl;
    }
    
    else if(i == 7)
    {
        var pl = matic.pl(json.data.rates.USD);
tpl += pl;
    }
    if (coin[i].length < 4)
    coin[i] += "  "
    msg += " " + coin[i++] + space + json.data.rates.USD + space +"$" + Math.floor(pl) + "\n\n"
}

QuickLook.present(msg + "$" + Math.floor(tpl))
Script.complete()

// class cCoin
// {
//     constructor(spot,name)
//     {
//         this.spot_ = spot;
//         this.name_ = name;
//     }   
//     spot()
//     {
//         return this.spot_;
//     }
//     name()
//     {
//         return this.name_
//     }
// } 

