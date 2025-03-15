export const getRandBG = () =>{
    const colors = [
        '#f6b100',
        // '#025cca',
        // '#0000ff',
        '#02ca3a',
        // '#cc00cc',
        // '#3366ff',
    ];
    const color = colors[Math.floor(Math.random()*colors.length)];
    return "bg-["+color+"]";
}

export const getBgColor = ()=>{
    const bg = ['#b73e3e','#5b45b0','#7f167f','#735f32','#1d2569','#285430'];
    const rnd = bg[Math.floor(Math.random()*bg.length)];
    return rnd;
}