const input = document.getElementById("getIpAddress")
const btn = document.getElementById("getUserIpAddress")
const holding = document.getElementById('year')
const apiKey = 'at_3yp5uYn8gkTQOxht3TLRaw97yak6E'
function isValid(ip) {
    const ipRegex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
    return ipRegex.test(ip)
}
async function getInfo(e) {
    e.preventDefault()
    const getUserAddress = input.value.trim()
       holding.innerHTML = "<i>Loading.... Calm down</i>"
    if(!getUserAddress || !isValid(getUserAddress)){
   holding.innerHTML = "<i>Word not Found </i>"
   return
    }else{
        try{
            const response = await fetch(`https://geo.ipify.org/api/v2/country?apiKey=${apiKey}&ipAddress=${getUserAddress}`)
            const result = await response.json()
         if (!result || !result.location) {
              holding.innerHTML = "<i>Word not Found </i>"
         } else{
            const htmlTemplate = `<div class="main-context" id="year">
            <div class="main-context-1">
              <p>IP Address</p>
              <p>${getUserAddress}</p>
            </div>
            <div class="main-context-2">
              <p>Location</p>
              <p>${result.location.country}, ${result.location.region}</p>
            </div>
            <div class="main-context-3">
              <p>Timezone</p>
              <p>${result.location.timezone}</p>
            </div>
            <div class="main-context-4">
              <p>ISP</p>
              <p>${result.isp}</p>
            </div>
          </div>`
          holding.innerHTML = htmlTemplate
         }  
        }catch(error){
        holding.innerHTML = "<i> Failed to fetch data u can always try later"
        console.log(error)
        }
        
    }
}
btn.addEventListener('click', getInfo)