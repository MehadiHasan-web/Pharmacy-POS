export default  function getExpenses(){
    const token = '72dbf14411791344bbd2044ff82473c2e58e72b5';
    const result =  fetch('https://rpos.pythonanywhere.com/api/v1/expenses/', {
        method: 'GET',
        headers: { 'Authorization': 'token ' + token }
    })
    return result.json();
}