import {desk} from "@shared/desk";
import {wrap} from "@shared/surface";
const names=["Ari","Bo","Cam"];
type S={counts:number[];away:boolean[];last:number;inspect:number};
function next(s:S){const order=[1,2,3].map(n=>(s.last+n)%3).filter(i=>!s.away[i]);return order.reduce((best,i)=>best<0||s.counts[i]<s.counts[best]?i:best,-1);}
desk<S>({name:"Desk Relay",accent:"#ED8B86",motion:{"motif":"ticket","color":"#ED8B86","shine":"#FFF0DB"},initial:()=>({counts:[0,0,0],away:[false,false,false],last:2,inspect:-1}),
 configure:(_,v)=>names.forEach((_,i)=>names[i]=String(v["person"+i]||names[i])),
 render:s=>{const n=next(s),i=s.inspect<0?n:s.inspect;return {title:s.inspect<0?"Next shift":"Team member",value:i<0?"All away":names[i],
 lines:[n<0?"Nobody available":"Next: "+names[n],i<0?"Wheel to select":names[i]+" / "+s.counts[i]+" done",i>=0&&s.away[i]?"Marked away":"Available",
 "Click: complete suggestion","Start: toggle selected away","Wheel: inspect / hold OK: next"]};},
 action:(s,k)=>{const n=next(s),i=s.inspect<0?n:s.inspect;if(k==="ok"&&n>=0){s.counts[n]++;s.last=n;s.inspect=-1;}
 if(k==="start"&&i>=0)s.away[i]=!s.away[i];
 if(k==="up"||k==="down")s.inspect=wrap((i<0?0:i)+(k==="up"?1:-1),3);if(k==="hold-ok")s.inspect=-1;}});
