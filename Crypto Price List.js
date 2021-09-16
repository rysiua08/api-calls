// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// always-run-in-app: true; icon-color: deep-brown;
// icon-glyph: grin-stars;
const w = new ListWidget()
w.backgroundColor=new Color("#211111")

let coin = ["BTC","ETH","XTZ","ALGO",
"FIL"];

let endpt = "https://api.coinbase.com/v2/exchange-rates?currency="

class transact {
    constructor(id) {
        this.qty_ = 0.0;
        this.price_ = 0.0;
        this.id_ = id;
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
        return (spot - this.price_) * this.qty_;
    }
    qty() {
        return this.qty_;
    }
    id() {
        return this.id_;
    }
}

var tpl=0;
const sz = 18;

for(let i in coin)
{
    var url = endpt + coin[i];
    var r = new Request(url);
    var json = await r.loadJSON();
    var data = json.data.rates.USD;
    var spotc = Math.floor(data*1000)/1000;
    
    var d = setData(coin[i]);
    var pl = d.pl(data);
    var qty = d.qty();
    var price = d.price();
    tpl += pl;
    var fid = d.id();
    
// ---- row space
    const stack = w.addStack();
    stack.centerAlignContent();
//     stack.setPadding(0, 10, 0, 5)
//     
    
// ---- coin id
    var cid = stack.addText(fid);
    cid.textColor = Color.white();
    cid.font = Font.blackMonospacedSystemFont(sz);    
//     console.log(fid.length)
if (fid.length > 4) {
        stack.addSpacer(20)
    }
    else {
    stack.addSpacer();
    }
    // ---- spot price data
    const spd = stack.addText(spotc.toFixed(2).toString());
    spd.textColor = Color.white();
    spd.font = Font.blackMonospacedSystemFont(sz-2); 
    if (fid.length > 4) {
        stack.addSpacer(24)
    }
    else {
    stack.addSpacer();
    }
// ---- profit/loss
    const tw = stack.addText(pl.toFixed(3).toString());
    tw.font = Font.blackMonospacedSystemFont(sz);
  tw.textColor = pl < 0 ? Color.red() : Color.green();// 
// if (fid.length == 5) {
//         stack.addSpacer(25)
//     }
//     else {
    stack.addSpacer();
//     }

// ---- qty or cost
    const sqty = stack.addText("(" + qty.toFixed(4).toString() + ")" );
    sqty.textColor = Color.white();
    sqty.font = Font.blackMonospacedSystemFont(sz-6); 
tw.textColor = pl < 0 ? Color.red() : Color.green();


   
//     stack.addSpacer()


}

const stack1 = w.addStack()    
stack1.centerAlignContent();
stack1.addText("");
const stack = w.addStack();
stack.centerAlignContent();
const tplstr = stack.addText("Total Profit/Loss");
    tplstr.textColor = Color.gray();
    tplstr.font = Font.blackRoundedSystemFont(sz);
    stack.addSpacer(15);
    
const tplw = stack.addText(tpl.toFixed(2));
tplw.font = Font.blackRoundedSystemFont(24)

tplw.textColor = tpl < 0 ? Color.red() : Color.green();

Script.setWidget(w);
Script.complete();
w.presentLarge();



function setData(s){
    var t = new transact(s); 
//     console.log(s)
    if( s == "BTC"){
        t.addTo(0.002, 47650);
        t.addTo(0.004, 45900);
        t.addTo(0.01, 46000);
        t.addTo(0.05, 45400);
        t.addTo(0.009, 45270);
        t.addTo(0.008, 46347)
        t.addTo(.0032, 46900);
        t.addTo(0.003, 48400);
        t.addTo(0.005, 46900);
        t.addTo(0.008, 47800);
        t.addTo(0.005, 48500);
        t.addTo(0.003, 49200);
        t.addTo(0.003, 44485);
        t.addTo(0.003, 44000);
        console.log(t.price())
        }
else if ( s == "ETH" ) {  
//         t.addTo(0.092222, 3390)
//         t.addTo(0.05, 3752);
//         t.addTo(0.05, 3900);
//         t.addTo(.025, 3916);
//         t.addTo(0.1, 3813);
        }
//     else if ( s == "MATIC" ) {  
//         t.addTo(75, 1.40);
//         }
    else if ( s == "XTZ" ) {  
        t.addTo(15.86, 7.89);
        }
//     else if ( s == "ATOM" ) {  
//         t.addTo(6, 24.6);
//         }
    else if ( s == "ALGO" ) {  
        t.addTo(57, 2.135);
        }
//     else if ( s == "ADA" ) {  
//         t.addTo(100, 2.603);
//         t.addTo(100, 2.608);
//         t.addTo(59, 2.596);
//         t.addTo(100, 2.584);
//         t.addTo(50, 2.58);
//         }
//     else if ( s == "DOGE" ) {  
//         var h=2007.0639*.2422+10.93;
//         var f=h/2007.0639;
//         t.addTo(2007.0639, f);
//         console.log(f)
//         }
//     else if ( s == "YFI" ) {  
//         var h=0.015051*39689.71+10.41;
//         var f=h/0.015051;
//         t.addTo(0.015051, f);
//         }
//     else if ( s == "LINK" ) {  
//         t.addTo(5, 28.15);
//         t.addTo(5, 28.50);
//         t.addTo(10.72, 23.17);
//         }
    else if ( s == "FIL" ) {  
//         t.addTo(1.04, 77.09);
        t.addTo(4, 50.90);
        t.addTo(3, 49.75);
        t.addTo(4, 48.97);
        
    }
//     else if ( s == "CGLD" ) {  
//         t.addTo(10.66, (200-168.03) / 10.66);
//         
//     }
    return t;
}

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
