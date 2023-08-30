export const updateSpreadSheet = (data) => {
    fetch(`https://script.google.com/macros/s/AKfycbx1SF3M1Nwrgy9CjbwCvyiz4-Ka_m3IXbpn0lqW2x9Fwsbyf7vLSA9nCsMYkNT0kSJR/exec`, {
      method: 'POST',
      body: data,
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      }
    }).then(response => {
        return ("success:", response);
    }).catch(err => {
       return ("Error:" + err);
    });
}
