document.querySelector('button[type=submit]')
    .addEventListener('click', fetchReguest)

function fetchReguest(e){
    e.preventDefault()
    //Read form fields
    var form = document.getElementsByTagName('form')[0]
    var email = form.elements['email'].value
    var password = form.elements['password'].value
    var repeatPassword = form.elements['repeat-password'].value
    if( password === repeatPassword){
        //Here should be validation
        if(email && password){
            fetch(baseUrl + 'registration',{
                method: 'POST',
                body: JSON.stringify( {email: email, password: password} ),
                headers: {
                    'Content-type': 'application/json'
                }
            })
            .then((response) => response.json())
            .then(data => {
                console.log('data', data)
                if(data.errors) output.innerHTML = template({alerts: data.errors})
                if(data.success){
                    output.innerHTML = template({success: true})
                    //Clear the input fields
                    form.elements['email'].value =''
                    form.elements['password'].value =''
                    form.elements['repeat-password'].value =''
                }})
            .catch(e => console.error(e))
        }else{
            output.innerHTML = template({alerts: [{ msg: "Please, fill all the fields"}]})
        }
    }else{
        output.innerHTML = template({alerts: [{ msg: "Passwords don't match"}]})
    }

}