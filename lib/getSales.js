export default async  function getSales(){
    const token = '72dbf14411791344bbd2044ff82473c2e58e72b5';
    const result = await fetch('https://rpos.pythonanywhere.com/api/v1/sales/', {
        method: 'GET',
        headers: { 'Authorization': 'token ' + token }
    })
    return result.json();
}