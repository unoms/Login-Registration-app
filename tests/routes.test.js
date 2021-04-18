const request = require('supertest');
const app = require('../app')
const mongoose = require('mongoose')

afterAll(async () => {
    await mongoose.connection.close();
});

describe('Test the routes', ()=>{
    test('Test the root route. Return code 200 and content-type: text/html', async ()=>{
            await request(app).get('/')
            .expect('Content-Type', /text/)
            .expect(200)
    })

    test('Test redirect from the protected route. Return code 302', async ()=>{
        await request(app).get('/protected')
        .expect(302)
    })

    test('Test redirect from the users route. Return code 302', async ()=>{
        await request(app).get('/users')
        .expect(302)
    })

})

describe('Test login request', ()=>{
    const mockUser = {email: "email", password: '12345678'}
    test('POST request to /login with incorrect email and password', async ()=>{
            await request(app)
                .post('/login')
                .send({email: mockUser.email, password: mockUser.password})
                .expect('Content-Type', /json/)
                .expect((res)=> {
                    expect((res.body.errors[0].msg).replace(/\s/g, ''))
                        .toEqual("Email format is wrong. Please, enter a correct email".replace(/\s/g, '')                           
                    )  
                })
                .expect(200)
        })

        test('POST request to /login with correct email and wrong password', async ()=>{
                await request(app)
                    .post('/login')
                    .send({email: 'admin@admin.com', password: "123456789"})
                    .expect('Content-Type', /json/)
                    .expect((res)=> {
                        expect((res.body.errors[0].msg).replace(/\s/g, ''))
                            .toEqual("Wrong password".replace(/\s/g, '')                           
                        )  
                    })
                    .expect(200)
            })

    test('POST request to /login with correct email and password', async ()=>{
                await request(app)
                    .post('/login')
                    .send({email: 'admin@admin.com', password: '12345678'})
                    .expect('Content-Type', /json/)
                    .expect((res)=> {
                        expect((res.body.success.msg).replace(/\s/g, ''))
                            .toEqual("Successful Login".replace(/\s/g, '')                           
                        )  
                    })
                    .expect(200)
            })
})

describe('register route', ()=>{
    test('Trying to register a new user with occupied email', async ()=>{
                await request(app)
                    .post('/registration')
                    .send({email: 'admin@admin.com', password: '1234567890'})
                    .expect('Content-Type', /json/)
                    .expect((res)=> {
                        expect((res.body.errors[0].msg).replace(/\s/g, ''))
                            .toEqual("The email is occupied".replace(/\s/g, '')                           
                        )  
                    })
                    .expect(200)
    })
})