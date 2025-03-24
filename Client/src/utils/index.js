export const getBgColor = ()=>{
    const bg = ['#b73e3e','#5b45b0','#7f167f','#735f32','#1d2569','#285430','#f6b100','#025cca','#0000ff','#02ca3a',];
    const rnd = bg[Math.floor(Math.random()*bg.length)];
    return rnd;
}

export const getIntials = (name) =>{
    if(!name) return "";
    return name.split(" ").map(word=>word[0]).join("").toUpperCase();
}

export const formatDate= (date) =>{
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sept','Oct','Nov','Dec'];
    return `${months[date.getMonth()]} ${String(date.getDate()).padStart(2,'0')},${date.getFullYear()}`; 
}

export const formatTime = (date) =>{
    return `${String(date.getHours()).padStart(2,"0")}:${String(date.getMinutes()).padStart(2,"0")}:${String(date.getSeconds()).padStart(2,"0")}`;
}
