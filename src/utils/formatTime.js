export function formatTime(seconds) {
    const mins=Math.floor(seconds/60);  // converting seconds into minutes
    const secs=seconds%60;  // getting the remaining seconds

    return `${mins}:${secs<10 ? "0" : ""}${secs}`  // adding the leading zero
} 