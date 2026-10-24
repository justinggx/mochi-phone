import{applyTheatreOutput}from'./theatre-output.mjs?v=20261024-theatre-reader-132';
self.onmessage=event=>{try{const{text,profile}=event.data;self.postMessage(applyTheatreOutput(text,profile));}catch{self.postMessage({error:'regex'});}};
