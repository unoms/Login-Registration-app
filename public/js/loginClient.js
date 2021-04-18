document.querySelector('button[type=submit]')
    .addEventListener('click', fetchReguest)

function fetchReguest(e){
    e.preventDefault()
    //Read form fields
    var form = document.getElementsByTagName('form')[0]
    var email = form.elements['email'].value
    var password = form.elements['password'].value
    //Here should be validation
    if(email && password){
        fetch(baseUrl + 'login',{
            method: 'POST',
            body: JSON.stringify( {email: email, password: password} ),
            headers: {
                'Content-type': 'application/json'
            }
        })
        .then((response) => response.json())
        .then(data => {
            console.log(data)
            if(data.errors) output.innerHTML = template({alerts: data.errors})
            if(data.success){
                output.innerHTML = template({success: true})
                //Clear the input fields
                form.elements['email'].value =''
                form.elements['password'].value =''
                //Relocation to the protected root
                window.location.href ='/protected'
            }})
        .catch(e => console.error(e))
    }else{
        output.innerHTML = template({alerts: [{ msg: "Please, fill all the fields"}]})
    }
}